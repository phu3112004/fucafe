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
        { message: "Invalid request data" },
        { status: 400 },
      );
    } else if (!body.items || body.items.length === 0) {
      return NextResponse.json(
        { message: "Order has no items" },
        { status: 400 },
      );
    } else if (!body.totalAmount || body.totalAmount <= 0) {
      return NextResponse.json(
        { message: "Invalid total amount" },
        { status: 400 },
      );
    } else if (!body.user) {
      return NextResponse.json({ message: "Invalid user" }, { status: 400 });
    } else if (!body.shippingAddress) {
      return NextResponse.json(
        { message: "Invalid shipping address" },
        { status: 400 },
      );
    } else if (!body.paymentMethod) {
      return NextResponse.json(
        { message: "Invalid payment method" },
        { status: 400 },
      );
    }
    await connectDB();
    const newOrder = await Order.create(body);
    return NextResponse.json(newOrder, { status: 201 });
  } catch (error: any) {
    console.log("Error creating order:", error);
    return NextResponse.json(
      { message: "Error creating order" },
      { status: 500 },
    );
  }
};
