import Link from "next/link";

export default function Home() {
  let name = "Tykan";

  return (
    <div>
      <h4 className="title" style={{ color: "red" }}>
        타이칸프레시
      </h4>
      <p className="title-sub">by {name}</p>
    </div>
  );
}
