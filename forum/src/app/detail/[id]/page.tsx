import Post from "@/model/post";
import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import Link from "next/link";

async function PostDetailPage(props: { params: { id: number } }) {
  let db = (await connectDB).db("forum");
  let collection = db.collection<Post>("post");
  let result = await collection.findOne({
    _id: new ObjectId(props.params.id),
  });

  return (
    <div>
      <Link href={"/list"}>
        <button className="btn btn-blue">목록으로</button>
      </Link>
      <h4>상세페이지</h4>
      <h4>{result?.title}</h4>
      <p>{result?.content}</p>
    </div>
  );
}

export default PostDetailPage;
