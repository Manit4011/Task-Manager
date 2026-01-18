import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const token = request.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { user: null, message: "Not authenticated" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_KEY);

    // Return only what the client needs
    return NextResponse.json({
      user: {
        id: decoded._id,
        email: decoded.email,
        name: decoded.name,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { user: null, message: "Invalid or expired token" },
      { status: 401 }
    );
  }
}
