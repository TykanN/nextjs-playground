"use client";

import Post from "@/model/post";
import { Console } from "console";
import Link from "next/link";
import DetailLink from "./DetailLink";

export default function ListItem({ posts }: { posts: string }) {
  let postList: Post[] = JSON.parse(posts);

  return (
    <div>
      {postList.map((post, i) => (
        <div
          className="list-item px-10 py-10 opacity-100 transition-opacity duration-1000"
          key={i}
        >
          <Link href={`detail/${post._id}`}>
            <h4 className="font-bold text-2xl text-red-500">{post.title}</h4>
          </Link>
          <p>{post.content}</p>
          <DetailLink postId={post._id!.toString()} />
          <button
            className="btn btn-blue mx-2 "
            onClick={(e) => {
              fetch(`/api/edit/${post._id!.toString()}`, {
                method: "DELETE",
              })
                .then((r) => {
                  if (r.status == 200) {
                    return r.json();
                  } else {
                    //서버 에러코드
                    throw r.json();
                  }
                })
                .then((result) => {
                  // 성공시 실행코드
                  let element = (e.target as HTMLElement).parentElement!;

                  element.classList.remove("opacity-100");
                  element.classList.add("opacity-0");
                  setTimeout(() => {
                    element.classList.add("hidden");
                  }, 1000);
                })
                .catch((error) => {
                  if (error instanceof Promise) {
                    error.then((msg) => {
                      window.alert(msg);
                    });
                  }
                  console.log(error);
                });
            }}
          >
            🗑️ 삭제하기
          </button>
        </div>
      ))}
    </div>
  );
}
