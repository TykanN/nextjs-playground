import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import {
  MongoDBAdapter,
  MongoDBAdapterOptions,
} from "@next-auth/mongodb-adapter";
import { connectDB } from "@/util/database";

const mongoDBAdapterOption: MongoDBAdapterOptions = {
  databaseName: "forum",
};

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: "d183e841e475537c2e53",
      clientSecret: process.env.OAUTH_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.OAUTH_SECRET!,
  adapter: MongoDBAdapter(connectDB, mongoDBAdapterOption),
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
