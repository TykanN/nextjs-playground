"use client";
import { signOut } from "next-auth/react";

export default function LogoutBtn({ name }: { name?: string | null }) {
  return (
    <div className="space-x-4">
      <span>{name}</span>
      <button
        className="btn btn-blue"
        onClick={() => {
          signOut();
        }}
      >
        로그아웃
      </button>
    </div>
  );
}
