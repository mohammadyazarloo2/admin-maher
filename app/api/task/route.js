import { connectMongoDB } from "@/lib/mongodb";
import Task from "@/models/task";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectMongoDB();
    const pro=await Task.find();
    return NextResponse.json({ message: "Tasks fetched",data:pro }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "an error accoured" });
  }
}
