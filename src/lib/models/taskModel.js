import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title:{
        type:"String",
        required:[true,"task title is required"]
    },
    description:{
        type:"String",
        required:[true,"task description is required"]
    },
    status:{
        type:"String",
        enum:["pending","completed"],
        default:"pending"
    },
    userid:{
        type:mongoose.ObjectId,
        required:[true,"user id is must and required"]
    }
})

export const Task = mongoose.models.tasks || mongoose.model("tasks",taskSchema);