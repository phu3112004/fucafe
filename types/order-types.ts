// 1. Định nghĩa các kiểu dữ liệu liên quan đến Đơn Hàng (Order)
interface OrderItem {
  productId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}
// 2. Định nghĩa thông tin giao hàng
interface ShippingAddress {
  fullName: string;
  phone: string;
  address?: string; // Có thể null nếu khách chọn tự đến lấy (PICKUP)
  city?: string;
}

// 3. Interface chính của Đơn Hàng (Dùng để hiển thị)
interface Order {
  _id: string; // ID của MongoDB tự tạo

  // User có thể là string (ID) hoặc object (nếu bạn populate dữ liệu user ra)
  user: string | { _id: string; name: string; email: string };

  items: OrderItem[];
  totalAmount: number; // Tổng tiền đơn hàng

  // Dùng Union Type để gợi ý code cho chuẩn, tránh gõ sai chính tả
  deliveryMethod: "DELIVERY" | "PICKUP";
  shippingAddress: ShippingAddress | null; // Nếu là PICKUP thì có thể null
  paymentMethod: "COD" | "BANKING";
  status:
    | "PENDING"
    | "CONFIRMED"
    | "PREPARING"
    | "SHIPPING"
    | "COMPLETED"
    | "CANCELLED";

  note?: string; // Ghi chú (ít đường, nhiều đá...)

  createdAt: string; // Ngày tạo (MongoDB trả về chuỗi ISO)
  updatedAt: string; // Ngày cập nhật
}

// 4. Interface dùng cho lúc TẠO đơn hàng (Payload gửi từ Frontend lên)
// Lúc tạo thì chưa có _id, createdAt, status...
interface CreateOrderPayload {
  user: string; // ID của user đang login
  items: OrderItem[];
  totalAmount: number;
  shippingAddress: ShippingAddress;
  deliveryMethod: "DELIVERY" | "PICKUP";
  paymentMethod: "COD" | "BANKING";
  note?: string;
}

export type { Order, OrderItem, CreateOrderPayload, ShippingAddress };
