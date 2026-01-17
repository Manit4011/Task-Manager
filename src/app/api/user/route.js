import { ConnectDB } from "@/lib/db";
import { User } from "@/lib/models/userModel";
import { NextResponse } from "next/server";

const db = async () => {
    await ConnectDB();
};
db();

// function to get all users
export async function GET(request) {

    try {
        const users = await User.find();
        return NextResponse.json(users);
    } catch (error) {
        console.log("failed to fetch users",error)
    }
}

// to add a new user
export async function POST(request) {
    const { name, email, password } = await request.json();

    try {
        const newUser = new User({
            name: name,
            email: email,
            password: password
        })
        await newUser.save()
        return NextResponse.json({
            message: "new user added",
        });
    } catch (error) {
        console.log("failed to create user", error)
    }
}
