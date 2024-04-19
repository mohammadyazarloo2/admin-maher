import { connectMongoDB } from "@/lib/mongodb";
import Task from "@/models/task";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  const { _id } =await req.json();
  console.log("find Request for ID:", _id);
  try {
    await connectMongoDB();
    const task = await Task.findById(_id);
    // res.setHeader('Access-Control-Allow-Methods', 'DELETE');
    return NextResponse.json({ message: task }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error });
  }
}
export const dynamic = 'force-dynamic'