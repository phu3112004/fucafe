import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Order from "@/lib/models/Order";

// 1. Định nghĩa Props chuẩn Next.js 15
type Props = {
  params: Promise<{ id: string }>;
};

export async function GET(request: Request, props: Props) {
  try {
    await connectDB();

    const params = await props.params;
    const orderId = params.id;

    const order = await Order.findById(orderId);

    if (!order) {
      return NextResponse.json(
        { message: "Không tìm thấy đơn hàng" },
        { status: 404 },
      );
    }

    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    console.error("Lỗi lấy chi tiết đơn hàng:", error);
    return NextResponse.json({ message: "Lỗi Server" }, { status: 500 });
  }
}

export async function PATCH(request: Request, props: Props) {
  try {
    await connectDB();
    const params = await props.params;
    const orderId = params.id;
    const { status } = await request.json();

    const order = await Order.findById(orderId);

    if (!order) {
      return NextResponse.json(
        { message: "Không tìm thấy đơn hàng" },
        { status: 404 },
      );
    } else {
      order.status = status;
      await order.save();
      return NextResponse.json(
        { message: "Cập nhật trạng thái thành công" },
        { status: 200 },
      );
    }
  } catch (error) {
    console.error("Lỗi cập nhật trạng thái đơn hàng:", error);
    return NextResponse.json({ message: "Lỗi Server" }, { status: 500 });
  }
}
