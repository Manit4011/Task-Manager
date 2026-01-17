import { ConnectDB } from "@/lib/db";
import { User } from "@/lib/models/userModel";
import { NextResponse } from "next/server"

const db = async () => {
    await ConnectDB();
};
db();

// to get a single user
export async function GET(request,{params}) {
    try {
        const {userid} = await params;
        const user_data = await User.findById({
            _id:userid
        })
        return NextResponse.json(user_data)
    } catch (error) {
        console.log("failed to  fetch user details",error)
    }

}


// function to  delete  a single user
export async function DELETE(request, { params }) {
    try {
        const { userid } = await params;
        await User.findByIdAndDelete({_id:userid})
        return NextResponse.json({ message: "a single user deleted" })
    } catch (error) {
        console.log("failed to delete user", error)
    }
}


// function to update a single user
export async function PUT(request, {params}) {
    try {
        const {userid} = await params;
        const {name,email} = await request.json();
        const updated_user = await User.findByIdAndUpdate(userid,{
            name:name,
            email:email
        })
        await updated_user.save();
        return NextResponse.json("user updated successfully")
    } catch (error) {
        console.log("failed to update user",error)
    }
}