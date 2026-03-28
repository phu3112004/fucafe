import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Product from "@/lib/models/Product";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    await connectDB();
    await Product.findByIdAndDelete(id);
    return NextResponse.json({ message: "Đã xóa product" });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
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
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { $set: body }, // Dùng $set để an toàn hơn
      { new: true, runValidators: true }, // runValidators để check định dạng (ví dụ: giá không được âm)
    );

    if (!updatedProduct) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 },
      );
    }
    return NextResponse.json(updatedProduct);
  } catch (error: any) {
    console.error("Update Error:", error);
    return NextResponse.json(
      { message: error.message || "Error updating product" },
      { status: 500 },
    );
  }
}
