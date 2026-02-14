import { useState } from "react";
import { Order, CreateOrderPayload } from "@/types/order-types";
import { toast } from "sonner";

export const useOrder = () => {
  // 1. State lưu đơn hàng đơn lẻ (dùng cho trang chi tiết hoặc trang cảm ơn)
  const [order, setOrder] = useState<Order | null>(null);

  // 2. State lưu danh sách đơn hàng (dùng cho trang lịch sử mua hàng)
  const [orders, setOrders] = useState<Order[]>([]);

  // 3. State loading & error (để UI biết mà hiện thông báo)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // --- HÀM 1: TẠO ĐƠN HÀNG MỚI (Dùng ở trang Checkout) ---
  const createOrder = async (payload: CreateOrderPayload) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        // Lấy message từ backend trả về (nếu có) thay vì câu chung chung
        throw new Error(data.message || data.error || "Lỗi khi tạo đơn hàng");
      }

      setOrder(data); // Lưu vào state để dùng nếu cần
      return data; // Trả về để component điều hướng
    } catch (err: any) {
      setError(err.message);
      toast.error(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // --- HÀM 2: LẤY CHI TIẾT 1 ĐƠN HÀNG (Dùng cho trang Tracking) ---
  const getOrderDetail = async (id: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/order/${id}`);
      if (!res.ok) throw new Error("Không tìm thấy đơn hàng");

      const data = await res.json();
      setOrder(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // --- HÀM 3: LẤY LỊCH SỬ ĐƠN HÀNG CỦA USER ---
  const getMyOrders = async (userId: string) => {
    if (!userId) return; // Chưa đăng nhập thì thôi

    setLoading(true);
    try {
      // Giả sử API lấy danh sách là /api/order/user/[userId] hoặc /api/order/me
      const res = await fetch(`/api/order/user/${userId}`);
      const data = await res.json();

      if (Array.isArray(data)) {
        setOrders(data);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Return tất cả ra để component xài
  return {
    order, // Đơn hàng lẻ
    orders, // Danh sách đơn hàng
    loading, // Trạng thái đang tải
    error, // Lỗi nếu có
    createOrder,
    getOrderDetail,
    getMyOrders,
  };
};
