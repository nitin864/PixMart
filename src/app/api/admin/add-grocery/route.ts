import uploadFileOnCloudinary from "@/app/lib/cloudinary";
import connectDb from "@/app/lib/db";
import Grocery from "@/app/models/grocery.model";
import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDb();

    // ── Auth check ──
    const session = await auth();
    if (session?.user?.role !== "admin") {
      return NextResponse.json(
        { message: "You are not an admin" },
        { status: 403 }
      );
    }

    // ── Parse form data ──
    const formData = await req.formData();
    const name     = formData.get("name")     as string;
    const category = formData.get("category") as string;
    const unit     = formData.get("unit")     as string;
    const price    = formData.get("price")    as string;
    const file     = formData.get("image")    as File | null;

    // ── Basic validation ──
    if (!name || !category || !unit || !price) {
      return NextResponse.json(
        { message: "All fields are required." },
        { status: 400 }
      );
    }

    // ── Upload to Cloudinary — pass File directly (it extends Blob) ──
    let imgUrl: string | null = null;
    if (file && file.size > 0) {
      imgUrl = await uploadFileOnCloudinary(file);
    }

    // ── Save to DB ──
    const grocery = await Grocery.create({
      name,
      category,
      unit,
      price: parseFloat(price),
      image: imgUrl,
    });

    return NextResponse.json(grocery, { status: 201 });

  } catch (error) {
    console.error("Add grocery error:", error);
    return NextResponse.json(
      { message: `Add grocery error: ${error}` },
      { status: 500 }
    );
  }
}