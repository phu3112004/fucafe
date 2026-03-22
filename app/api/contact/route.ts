import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Contact from "@/lib/models/Contact";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await connectDB();
    const newContact = await Contact.create(body);
    return NextResponse.json(newContact, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Lỗi gửi liên hệ" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const contacts = await Contact.find().sort({ createdAt: -1 });
    return NextResponse.json(contacts);
  } catch (error) {
    return NextResponse.json(
      { message: "Lỗi lấy danh sách liên hệ" },
      { status: 500 },
    );
  }
}
