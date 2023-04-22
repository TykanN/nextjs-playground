import NextAuth, { Awaitable, NextAuthOptions, User } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import {
  MongoDBAdapter,
  MongoDBAdapterOptions,
} from "@next-auth/mongodb-adapter";
import { connectDB } from "@/util/database";
import bcrypt from "bcrypt";
import { UserCredit } from "../signup/route";

const mongoDBAdapterOption: MongoDBAdapterOptions = {
  databaseName: "forum",
};

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: "d183e841e475537c2e53",
      clientSecret: process.env.OAUTH_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      //1. 로그인페이지 폼 자동생성해주는 코드
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },

      //2. 로그인요청시 실행되는코드
      //직접 DB에서 아이디,비번 비교하고
      //아이디,비번 맞으면 return 결과, 틀리면 return null 해야함
      async authorize(credentials) {
        let db = (await connectDB).db("forum");
        let user = await db
          .collection<UserCredit>("user_cred")
          .findOne({ email: credentials!.email });
        if (!user) {
          console.log("해당 이메일은 없음");
          return null;
        }
        const pwcheck = await bcrypt.compare(
          credentials!.password,
          user.password
        );
        if (!pwcheck) {
          console.log("비번틀림");
          return null;
        }
        return user as any;
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, //30일
  },

  callbacks: {
    //4. jwt 만들 때 실행되는 코드
    //user변수는 DB의 유저정보담겨있고 token.user에 뭐 저장하면 jwt에 들어갑니다.
    jwt: async ({ token, user }) => {
      if (user) {
        token.user = {
          name: user.name,
          email: user.email,
        };
      }
      return token;
    },
    //5. 유저 세션이 조회될 때 마다 실행되는 코드
    session: async ({ session, token }) => {
      session.user = token.user as {
        name?: string | null;
        email?: string | null;
        image?: string | null;
      };
      return session;
    },
  },
  secret: process.env.OAUTH_SECRET!,
  adapter: MongoDBAdapter(connectDB, mongoDBAdapterOption),
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
