import { ConnectDB } from "@/lib/db";
import { Task } from "@/lib/models/taskModel";
import { NextResponse } from "next/server";

const db = async()=>{
    await ConnectDB()
}
db();

// get all tasks of all users
export async function GET(request) {
    try {
        const tasks = await Task.find();
        return NextResponse.json(tasks);
    } catch (error) {
        console.log("failed to fetch all tasks",error)
    }
}

// add a new task
export async function POST(request){
    try {
        const {title,description,status,userid} = await request.json();
        const newTask = new Task({
            title:title,
            description:description,
            status:status,
            userid:userid
        })
        await newTask.save();
        return NextResponse.json("new task added successfully")
    } catch (error) {
        console.log("failed to add a new task",error)
    }
}