import Post from "@/model/post";
import { connectDB } from "@/util/database";

export default async function Home() {
  let db = (await connectDB).db("forum");
  let result = (await db.collection("post").find().toArray()) as Post[];

  return (
    <div className="min-h-screen sm bg-slate-50 text-slate-800 rounded-md ">
      <table className="min-w-full text-left text-lg">
        <tr>
          <th>제목</th>
          <th>내용</th>
        </tr>
        {result.map((e, i) => {
          return (
            <tr>
              <td>{e.title}</td>
              <td>{e.content}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}
