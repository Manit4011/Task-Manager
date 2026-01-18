// this route is used to delete and edit a specific task by its taskid

import { ConnectDB } from "@/lib/db";
import { Task } from "@/lib/models/taskModel";
import { NextResponse } from "next/server";


const db = async () => {
    await ConnectDB()
}
db();
export async function DELETE(request, { params }) {
    try {
        const { taskid } = await params;
        await Task.findByIdAndDelete({
            _id: taskid
        })
        return NextResponse.json("task deleted successfully");
    } catch (error) {
        console.log("failed to delete the task", error);
    }
}

export async function PUT(request, { params }) {
    try {
        const { taskid } = await params;
        const { title, description, status } = await request.json();
        const updated_task = await Task.findByIdAndUpdate(taskid, {
            title: title,
            description: description,
            status: status
        })
        await updated_task.save();
        return NextResponse.json("task updated successfully")
    } catch (error) {
        console.log("failed to update the task", error);
    }
}

