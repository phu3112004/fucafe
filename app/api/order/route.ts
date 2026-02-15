import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Order from "@/lib/models/Order";

export const GET = async () => {
  await connectDB();
  const orders = await Order.find()
    .populate("user", "name email") // Lấy tên và email của user
    .sort({ createdAt: -1 });
  return NextResponse.json(orders);
};
export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    if (!body) {
      return NextResponse.json(
        { message: "Dữ liệu không hợp lệ" },
        { status: 400 },
      );
    } else if (!body.items || body.items.length === 0) {
      return NextResponse.json(
        { message: "Đơn hàng không có sản phẩm" },
        { status: 400 },
      );
    } else if (!body.totalAmount || body.totalAmount <= 0) {
      return NextResponse.json(
        { message: "Tổng giá trị đơn hàng không hợp lệ" },
        { status: 400 },
      );
    } else if (!body.user) {
      return NextResponse.json(
        { message: "Người dùng không hợp lệ" },
        { status: 400 },
      );
    } else if (!body.shippingAddress) {
      return NextResponse.json(
        { message: "Địa chỉ giao hàng không hợp lệ" },
        { status: 400 },
      );
    } else if (!body.paymentMethod) {
      return NextResponse.json(
        { message: "Phương thức thanh toán không hợp lệ" },
        { status: 400 },
      );
    }
    await connectDB();
    const newOrder = await Order.create(body);
    return NextResponse.json(newOrder, { status: 201 });
  } catch (error: any) {
    console.log("Lỗi tạo đơn hàng:", error);
    return NextResponse.json({ message: "Lỗi tạo đơn hàng" }, { status: 500 });
  }
};
