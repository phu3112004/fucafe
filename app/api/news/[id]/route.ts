import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import News from "@/lib/models/News";

// Xóa Banner theo ID
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    await connectDB();
    await News.findByIdAndDelete(id);
    return NextResponse.json({ message: "Đã xóa banner" });
  } catch (error) {
    return NextResponse.json({ message: "Lỗi xóa" }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await req.json();
    await connectDB();
    const updatedNews = await News.findByIdAndUpdate(id, body, { new: true });
    return NextResponse.json({ data: updatedNews });
  } catch (error) {
    return NextResponse.json({ message: "Lỗi cập nhật" }, { status: 500 });
  }
}
