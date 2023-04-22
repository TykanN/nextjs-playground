import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import CommentModel from "@/model/comment";
import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: { postId: string };
  }
) {
  let { postId } = params;

  let db = (await connectDB).db("forum");
  let result = await db
    .collection<CommentModel>("comment")
    .find({ parent: new ObjectId(postId) })
    .toArray();

  return NextResponse.json(result);
}

export async function POST(
  req: NextRequest,

  {
    params,
  }: {
    params: { postId: string };
  }
) {
  let { postId } = params;

  let session = await getServerSession(authOptions);

  if (session == null) {
    return new Response(JSON.stringify({ message: "유저 없음" }), {
      status: 400,
    });
  }

  let json: { content: string } = await req.json();

  let comment: CommentModel = {
    parent: new ObjectId(postId),
    content: json.content,
    author: session.user?.email,
  };

  let db = (await connectDB).db("forum");
  let result = await db.collection<CommentModel>("comment").insertOne(comment);

  comment._id = result.insertedId;

  return NextResponse.json(comment);
}
