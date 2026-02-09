import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Carousel from "@/lib/models/Carousel";

export async function GET() {
  try {
    await connectDB();
    const carousels = await Carousel.find({ active: true }).sort({
      createdAt: -1,
    });
    return NextResponse.json(carousels);
  } catch (error) {
    return NextResponse.json(
      { message: "Lỗi lấy danh sách banner" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    await connectDB();
    const newCarousel = await Carousel.create(body);
    return NextResponse.json(newCarousel, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Lỗi tạo banner" }, { status: 500 });
  }
}
