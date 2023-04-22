import { connectDB } from "@/util/database";

import bcyrpt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export interface UserCredit {
  id?: string | null;
  name: string;
  email: string;
  password: string;
}

export async function POST(req: NextRequest, res: NextResponse) {
  let reqBody: FormData = await req.formData();
  let json: any = {};
  reqBody.forEach((value, key) => (json[key] = value));
  let form = json as UserCredit;
  let hash = await bcyrpt.hash(form.password, 10);
  form.password = hash;

  let db = (await connectDB).db("forum");
  await db.collection("user_cred").insertOne(form);
  return NextResponse.json("가입 성공");
}
