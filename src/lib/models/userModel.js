import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:"String",
    email:{
        type: "String",
        unique:true,
        required:[true,"email is required"]
    },
    password:{
        type:"String",
        required:[true,"password is required"]
    }
})

export const User = mongoose.models.users || mongoose.model("users",userSchema);