"use client";
import { signIn } from "next-auth/react";

export default function LoginBtn() {
  return (
    <button
      className="btn btn-blue"
      onClick={() => {
        signIn();
      }}
    >
      로그인
    </button>
  );
}
