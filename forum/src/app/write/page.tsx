export default function WritePage() {
  return (
    <div>
      <h4>글작성</h4>
      <form action="/api/post" method="POST">
        <p>제목</p>
        <input
          className="text-black my-2"
          name="title"
          type="text"
          placeholder="글 제목 넣으세요"
        ></input>
        <p>내용</p>
        <input
          className="text-black my-2"
          name="content"
          type="text"
          placeholder="글 내용 넣으세요"
        ></input>
        <br />
        <button type="submit" className="btn btn-blue my-4">
          저장
        </button>
      </form>
    </div>
  );
}
