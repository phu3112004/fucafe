import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Product from "@/lib/models/Product";

export const GET = async () => {
  await connectDB();
  const products = await Product.find().sort({ createdAt: -1 });
  return NextResponse.json(products);
};
export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    await connectDB();
    const newProduct = await Product.create(body);
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Lỗi tạo sản phẩm" }, { status: 500 });
  }
};
