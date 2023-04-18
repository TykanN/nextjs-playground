import Post from "@/model/post";
import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import Link from "next/link";

async function PostEditPage(props: { params: { id: string } }) {
  let db = (await connectDB).db("forum");
  let collection = db.collection<Post>("post");
  let result = await collection.findOne({
    _id: new ObjectId(props.params.id),
  });

  return (
    <div>
      <h4>글 수정</h4>
      <form action={`/api/edit/${result?._id.toString()}`} method="POST">
        <p>제목</p>
        <input
          className="text-black my-2"
          name="title"
          type="text"
          defaultValue={result?.title}
          placeholder="글 제목 넣으세요"
        ></input>
        <p>내용</p>
        <input
          className="text-black my-2"
          name="content"
          type="text"
          defaultValue={result?.content}
          placeholder="글 내용 넣으세요"
        ></input>
        <br />
        <button type="submit" className="btn btn-blue my-4">
          수정 완료
        </button>
      </form>
    </div>
  );
}

export default PostEditPage;
