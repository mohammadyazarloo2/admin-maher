import { connectMongoDB } from "@/lib/mongodb";
import Products from "@/models/products";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectMongoDB();
    const pro=await Products.find();
    return NextResponse.json({ message: "Product fetched",data:pro }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "an error accoured" });
  }
}
export const dynamic = 'force-dynamic'