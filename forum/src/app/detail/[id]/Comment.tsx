"use client";

import CommentModel from "@/model/comment";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

export default function Comment({ postId }: { postId: string }) {
  let [comment, setComment] = useState("");
  let [commentList, setCommentList] = useState<CommentModel[]>([]);

  let fetchData = useCallback(async () => {
    await new Promise((_) => setTimeout(_, 200));
    console.log("댓글 불러옴");
    let result = await fetch(`/api/post/${postId}/comments`);
    let list = await result.json();

    setCommentList(list);
  }, []);

  useEffect(() => {
    fetchData();
    return;
  }, []);

  return (
    <div>
      <div>
        {commentList.map((e, i) => {
          return (
            <div className="bg-slate-800 py-2 px-4 mx-2 my-4" key={i}>
              <div className="font-bold">{e.author}</div>
              <div className="text-sm">{e.content}</div>
            </div>
          );
        })}
      </div>
      <input
        type="text"
        className="text-black"
        value={comment}
        onChange={(e) => {
          setComment(e.target.value);
        }}
      />
      <button
        className="btn btn-blue"
        onClick={() => {
          fetch(`/api/post/${postId}/comments`, {
            method: "POST",
            body: JSON.stringify({ content: comment }),
          }).then((e) => {
            setComment("");
            fetchData();
          });
        }}
      >
        댓글 저장
      </button>
    </div>
  );
}
