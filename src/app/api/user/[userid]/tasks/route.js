// this route is to get tasks for a specific user by their userid

import { ConnectDB } from "@/lib/db";
import { Task } from "@/lib/models/taskModel";
import { NextResponse } from "next/server";

const db = async()=>{
    await ConnectDB()
}
db();

export async function GET(request, { params }) {
    try {
        const { userid } = await params;
        const tasks = await Task.find({
            userid: userid
        })
        return NextResponse.json(tasks);
    } catch (error) {
        console.log("failed to fetch tasks for this user", error);
    }
}