import Post from "@/model/post";
import { connectDB } from "@/util/database";
import Link from "next/link";
import DetailLink from "./DetailLink";

export default async function List() {
  let db = (await connectDB).db("forum");
  let collection = db.collection<Post>("post");
  let result = await collection.find().toArray();

  console.log(result);

  return (
    <div className="min-h-screen sm bg-slate-50 text-slate-800 rounded-md ">
      <Link href="/write">
        <button className="btn btn-blue">글 작성 </button>
      </Link>
      {result.map((e, i) => (
        <div className="list-item px-10 py-10" key={i}>
          <Link href={`detail/${e._id}`}>
            <h4 className="font-bold text-2xl text-red-500">{e.title}</h4>
          </Link>
          <p>{e.content}</p>
          <DetailLink postId={e._id.toString()} />
        </div>
      ))}
    </div>
  );
}
