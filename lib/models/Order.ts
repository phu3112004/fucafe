import mongoose, { Schema, model, models } from "mongoose";

const orderSchema = new Schema(
  {
    // 1. Ai mua? (Liên kết với bảng User)
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // 2. Mua cái gì? (Lưu snapshot - chụp lại thông tin lúc mua)
    // Quan trọng: Phải lưu lại giá tại thời điểm mua.
    // Nếu sau này bạn tăng giá món, đơn hàng cũ không được thay đổi.
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        name: { type: String, required: true }, // Tên món (Bạc xỉu)
        image: { type: String }, // Ảnh món
        price: { type: Number, required: true }, // Giá lúc mua (25k)
        quantity: { type: Number, required: true }, // Số lượng (2)
      },
    ],

    // 3. Tổng tiền thanh toán
    totalAmount: { type: Number, required: true },

    // 4. Thông tin giao nhận
    shippingAddress: {
      fullName: { type: String, required: true }, // Tên người nhận
      phone: { type: String, required: true }, // Số điện thoại
      address: { type: String }, // Địa chỉ (nếu chọn ship)
      city: { type: String },
    },

    // 5. Phương thức giao hàng (Ship hay tự lấy)
    deliveryMethod: {
      type: String,
      default: "DELIVERY",
      enum: ["DELIVERY", "PICKUP"], // Ship tận nơi hoặc Đến quán lấy
    },

    // 6. Phương thức thanh toán
    paymentMethod: {
      type: String,
      default: "COD",
      enum: ["COD", "BANKING"], // Tiền mặt hoặc Chuyển khoản
    },

    // 7. Trạng thái đơn hàng (Quy trình xử lý)
    status: {
      type: String,
      default: "PENDING",
      enum: [
        "PENDING", // Chờ xác nhận (Vừa đặt xong)
        "CONFIRMED", // Đã xác nhận (Quán đã thấy đơn)
        "PREPARING", // Đang pha chế
        "SHIPPING", // Đang giao (Shipper đang đi)
        "COMPLETED", // Hoàn thành (Khách đã nhận & trả tiền)
        "CANCELLED", // Đã hủy
      ],
    },

    // 8. Ghi chú của khách (Ví dụ: Ít đường, nhiều đá)
    note: { type: String },
  },
  { timestamps: true }, // Tự động tạo createdAt, updatedAt
);

const Order = models.Order || model("Order", orderSchema);

export default Order;
