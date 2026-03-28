import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import News from "@/lib/models/News";
export async function POST(request: Request) {
  try {
    const body = await request.json();
    await connectDB();
    const newNews = await News.create(body);
    // Trả về đúng cấu trúc mà Hook mong đợi: { data: ... }
    return NextResponse.json({ data: newNews }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Error creating news" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const news = await News.find().sort({ createdAt: -1 });
    // Trả về { data: news } để đồng bộ với Hook
    return NextResponse.json({ data: news });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching news list" },
      { status: 500 },
    );
  }
}
