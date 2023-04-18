"use client";

import { useRouter } from "next/navigation";

export default function DetailLink(props: { postId: String }) {
  const router = useRouter();
  return (
    <button
      className="btn btn-blue"
      onClick={() => {
        router.push(`/detail/${props.postId}`);
      }}
    >
      📄 상세보기
    </button>
  );
}
