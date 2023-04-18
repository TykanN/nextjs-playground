import Post from "@/model/post";
import { connectDB } from "@/util/database";
import { ObjectId, OptionalId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let db = (await connectDB).db("forum");
  let collection = db.collection<Post>("post");

  if (req.method == "POST") {
    let title: string = req.body.title;
    let content: string = req.body.content;

    if (title == "" || content == "") {
      res.status(400).json("다 적으셈");
    }

    try {
      let result = await collection.insertOne({
        title: title,
        content: content,
      } as OptionalId<Post>);

      res.redirect(302, `/detail/${result.insertedId}`);
    } catch (e) {
      res.status(500);
    }
  }
}
