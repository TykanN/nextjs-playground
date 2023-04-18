import Link from "next/link";
import "./globals.css";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="navbar bg-sky-200 px-4 py-2 text-slate-900 space-x-4">
          <Link href="/" className=" font-black">
            TykanForum
          </Link>
          <Link href="/list" className="">
            List
          </Link>
        </div>
        {children}
      </body>
    </html>
  );
}
