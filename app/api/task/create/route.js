import { NextResponse } from "next/server";
import {createHash} from 'crypto';
import { connectMongoDB } from "@/lib/mongodb";
import Task from "@/models/task";


export async function POST(req){
    try{
        const {taskTitle,taskDescription,taskStatus}=await req.json();

        await connectMongoDB()
        await Task.create({taskTitle,taskDescription,taskStatus});

        return NextResponse.json({message:'note Created'},{status:201})
    }catch(error){
        return NextResponse.json({message:'an error accoured while creating the note'},{status:500})
    }
}