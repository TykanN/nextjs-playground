import Post from "@/model/post";
import { connectDB } from "@/util/database";
import Link from "next/link";
import { json } from "stream/consumers";
import DetailLink from "./DetailLink";
import ListItem from "./ListItem";

export default async function List() {
  let db = (await connectDB).db("forum");
  let collection = db.collection<Post>("post");
  let result = await collection.find().toArray();

  return (
    <div className="min-h-screen sm bg-slate-50 text-slate-800 rounded-md ">
      <Link href="/write">
        <button className="btn btn-blue">글 작성</button>
      </Link>
      <ListItem posts={JSON.stringify(result)} />
    </div>
  );
}
