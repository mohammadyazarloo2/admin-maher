import { connectMongoDB } from "@/lib/mongodb";
import NoteBook from "@/models/notebook";
import Task from "@/models/task";
import { NextResponse } from "next/server";

export async function PUT(req, res) {
  const { taskEditTitle,taskEditDiscription,taskEditStatus,status,_id } =await req.json();
  console.log("update Request for ID:", _id);
  try {
    await connectMongoDB();
    const task = await Task.updateOne({_id},{taskTitle:taskEditTitle,taskDescription:taskEditDiscription,taskStatus:taskEditStatus,status});
    // res.setHeader('Access-Control-Allow-Methods', 'DELETE');
    return NextResponse.json({ message: _id }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error });
  }
}
