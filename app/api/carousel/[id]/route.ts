import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Carousel from "@/lib/models/Carousel";

// Xóa Banner theo ID
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    await connectDB();
    await Carousel.findByIdAndDelete(id);
    return NextResponse.json({ message: "Đã xóa banner" });
  } catch (error) {
    return NextResponse.json({ message: "Lỗi xóa" }, { status: 500 });
  }
}
