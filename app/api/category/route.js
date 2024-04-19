import { connectMongoDB } from "@/lib/mongodb";
import Category from "@/models/category";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectMongoDB();
    const pro=await Category.find();
    return NextResponse.json({ message: "Category fetched",data:pro }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "an error accoured" });
  }
}
export const dynamic = 'force-dynamic'