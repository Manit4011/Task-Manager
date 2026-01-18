import { User } from "@/lib/models/userModel";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { ConnectDB } from "@/lib/db";
import jwt from "jsonwebtoken";

export async function POST(request) {
  try {
    await ConnectDB();

    const { email, password } = await request.json();

    const user_data = await User.findOne({ email });

    if (!user_data) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    const matched = await bcrypt.compare(password, user_data.password);

    if (!matched) {
      return NextResponse.json(
        { message: "Wrong password" },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      {
        _id: user_data._id,
        name: user_data.name,
        email: user_data.email,
      },
      process.env.JWT_KEY
    );

    const response = NextResponse.json({
        message:"login successfully"
    })
    response.cookies.set("token",token,{
        expiresIn:"1d",
        httpOnly:true
    })

    return response;

  } catch (error) {
    console.error("Failed to login:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
