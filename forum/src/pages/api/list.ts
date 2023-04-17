import Post from "@/model/post";
import { connectDB } from "@/util/database";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "GET") {
    let db = (await connectDB).db("forum");
    let collection = db.collection<Post>("post");
    let result = await collection.find().toArray();

    return res.status(200).json(result);
  }
  return;
}
