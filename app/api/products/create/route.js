import { connectMongoDB } from "@/lib/mongodb";
import Products from "@/models/products";
import { NextResponse } from "next/server";
import {createHash} from 'crypto';


export async function POST(req){
    try{
        const {name,title,description,category,price}=await req.json();

        await connectMongoDB()
        await Products.create({name,title,description,category,price});

        return NextResponse.json({message:'Product Created'},{status:201})
    }catch(error){
        return NextResponse.json({message:'an error accoured while creating the product'},{status:500})
    }
}