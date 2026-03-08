import connectDb from "@/app/lib/db";
import User from "@/app/models/user.model";
import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDb()
    const { role, phone } = await req.json()  
    const session = await auth()

    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    if (!role || !phone) {
      return NextResponse.json({ message: "Role and phone are required" }, { status: 400 })
    }

    const user = await User.findOneAndUpdate(
      { email: session.user.email },
      { role, mobile: phone },   
      { new: true }
    )

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 400 })
    }

    return NextResponse.json({ message: "Updated successfully" }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: `edit role and mobile error ${error}` }, { status: 500 })
  }
}