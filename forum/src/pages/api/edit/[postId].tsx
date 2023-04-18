import Post from "@/model/post";
import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let db = (await connectDB).db("forum");
  let collection = db.collection<Post>("post");

  let { postId }: { postId?: string } = req.query;

  if (req.method == "POST") {
    let title: string = req.body.title;
    let content: string = req.body.content;

    if (title == "" || content == "") {
      res.status(400).json("다 적으셈");
    }

    try {
      // let result = await collection.updateOne({ _id: id }, {
      //   title: title,
      //   content: content,
      // } as Partial<Post>);

      let result = await collection.updateOne(
        { _id: new ObjectId(postId) },
        {
          $set: { title: title, content: content },
        }
      );

      res.redirect(302, `/detail/${postId}`);
    } catch (e) {
      res.status(500);
    }
  }

  if (req.method == "DELETE") {
    try {
      await collection.deleteOne({ _id: new ObjectId(postId) });

      res.status(200).json("삭제 완료");
    } catch (e) {
      res.status(500);
    }
  }
}
