"use client";

import { useCartStore } from "@/store/useCartStore";
import { useAuthStore } from "@/store/useAuthStore";
import { Table, Radio, Input, Space, Card, Divider } from "antd";
import { useState } from "react";
import {
  UserOutlined,
  PhoneOutlined,
  ClockCircleOutlined,
  BankOutlined,
  WalletOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { useOrder } from "@/hooks/useOrder";
import { toast } from "sonner";
import { OrderItem } from "@/types/order-types";

const Checkout = () => {
  const { user } = useAuthStore();
  const { items, clearCart } = useCartStore();
  const { createOrder } = useOrder();

  // 1. STATE QUẢN LÝ LỰA CHỌN
  const [deliveryMethod, setDeliveryMethod] = useState<"PICKUP" | "DELIVERY">(
    "DELIVERY",
  );
  const [paymentMethod, setPaymentMethod] = useState<"COD" | "BANKING">("COD");

  // State lưu thông tin nhập liệu
  const [pickupTime, setPickupTime] = useState("");
  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    phone: "",
    address: "",
  });

  // Tính tổng tiền
  const totalAmount = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const columns = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      render: (_: any, __: any, index: number) => index + 1,
      width: 60,
    },
    {
      title: "Hình Ảnh",
      dataIndex: "image",
      key: "image",
      render: (image: string) => (
        <img src={image} alt="SP" className="w-16 h-16 object-cover rounded" />
      ),
    },
    { title: "Tên", dataIndex: "name", key: "name" },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (price: number) => price.toLocaleString("vi-VN") + " đ",
    },
    { title: "SL", dataIndex: "quantity", key: "quantity" },
  ];

  // Hàm xử lý khi bấm Thanh Toán
  const handleCheckout = () => {
    if (!user) {
      toast.error("Vui lòng đăng nhập để đặt hàng.");
      return;
    }
    if (items.length === 0) {
      toast.error("Giỏ hàng trống.");
      return;
    }
    if (deliveryMethod === "DELIVERY") {
      if (
        !shippingInfo.fullName ||
        !shippingInfo.phone ||
        !shippingInfo.address
      ) {
        toast.error("Vui lòng điền đầy đủ thông tin giao hàng.");
        return;
      }
    } else {
      if (!shippingInfo.fullName || !shippingInfo.phone || !pickupTime) {
        toast.error("Vui lòng điền đầy đủ thông tin nhận hàng.");
        return;
      }
    }

    const orderItems: OrderItem[] = items.map((item) => ({
      productId: item._id,
      name: item.name,
      image: item.image,
      price: item.price,
      quantity: item.quantity,
    }));
    // Gom dữ liệu để gửi lên API (Order Model)
    const orderData = {
      user: user.id,
      items: orderItems,
      totalAmount,
      deliveryMethod,
      // Nếu là PICKUP thì lấy giờ, DELIVERY thì lấy địa chỉ & phương thức thanh toán
      note: deliveryMethod === "PICKUP" ? `Giờ lấy: ${pickupTime}` : "",
      shippingAddress: shippingInfo,
      paymentMethod: deliveryMethod === "DELIVERY" ? paymentMethod : "COD", // Pickup mặc định trả sau
    };

    createOrder(orderData).then((newOrder) => {
      if (newOrder) {
        clearCart(); // Xóa giỏ hàng sau khi tạo đơn hàng thành công
      }
    });
  };

  return (
    <div className="px-4 md:px-16 py-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-[#6F4E37] text-center">
        Xác nhận đơn hàng
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* CỘT TRÁI: DANH SÁCH MÓN */}
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-bold mb-4">Danh sách món</h3>
            <Table
              columns={columns}
              dataSource={items}
              rowKey={(record) => record._id}
              pagination={false}
            />
          </div>
        </div>

        {/* CỘT PHẢI: THÔNG TIN GIAO HÀNG & THANH TOÁN */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-sm sticky top-24">
            {/* 1. CHỌN PHƯƠNG THỨC GIAO HÀNG */}
            <h3 className="text-lg font-bold mb-4">Phương thức nhận hàng</h3>
            <Radio.Group
              onChange={(e) => setDeliveryMethod(e.target.value)}
              value={deliveryMethod}
              className="w-full mb-4"
            >
              <Space orientation="vertical" className="w-full">
                <Radio
                  value="PICKUP"
                  className="border p-3 rounded w-full hover:border-[#6F4E37]"
                >
                  <span className="font-semibold">Đến cửa hàng nhận</span>
                </Radio>
                <Radio
                  value="DELIVERY"
                  className="border p-3 rounded w-full hover:border-[#6F4E37]"
                >
                  <span className="font-semibold">Giao hàng tận nơi</span>
                </Radio>
              </Space>
            </Radio.Group>

            <Divider />

            {/* Nhập địa chỉ */}
            <div>
              <h4 className="font-semibold mb-2">
                {deliveryMethod === "PICKUP"
                  ? "Thông tin nhận hàng"
                  : "Thông tin giao hàng"}
              </h4>
              <Space orientation="vertical" className="w-full">
                <Input
                  prefix={<UserOutlined />}
                  placeholder="Họ và tên người nhận"
                  onChange={(e) =>
                    setShippingInfo({
                      ...shippingInfo,
                      fullName: e.target.value,
                    })
                  }
                />
                <Input
                  prefix={<PhoneOutlined />}
                  placeholder="Số điện thoại"
                  onChange={(e) =>
                    setShippingInfo({
                      ...shippingInfo,
                      phone: e.target.value,
                    })
                  }
                />
                {deliveryMethod === "PICKUP" && (
                  <>
                    <Input
                      prefix={<ClockCircleOutlined />}
                      placeholder="Thời gian đến lấy (VD: 15:30)"
                      size="large"
                      value={pickupTime}
                      onChange={(e) => setPickupTime(e.target.value)}
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      * Địa chỉ quán: 123 Đường Cà Phê, Quận 1.
                    </p>
                  </>
                )}
                {deliveryMethod === "DELIVERY" && (
                  <>
                    <Input
                      prefix={<HomeOutlined />}
                      placeholder="Địa chỉ cụ thể (Số nhà, đường...)"
                      onChange={(e) =>
                        setShippingInfo({
                          ...shippingInfo,
                          address: e.target.value,
                        })
                      }
                    />
                  </>
                )}
              </Space>
            </div>
            {deliveryMethod === "DELIVERY" && (
              <div className="animate-fade-in space-y-4">
                <Divider />
                <div>
                  <h4 className="font-semibold mb-2">Thanh toán bằng:</h4>
                  <Radio.Group
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    value={paymentMethod}
                    className="w-full"
                  >
                    <Space orientation="vertical" className="w-full">
                      <Radio value="COD">
                        <Space>
                          <WalletOutlined /> Tiền mặt khi nhận hàng (COD)
                        </Space>
                      </Radio>
                      <Radio value="BANKING">
                        <Space>
                          <BankOutlined /> Chuyển khoản ngân hàng
                        </Space>
                      </Radio>
                    </Space>
                  </Radio.Group>
                </div>

                {/* Nếu chọn Banking thì hiện số tài khoản */}
                {paymentMethod === "BANKING" && (
                  <div className="bg-blue-50 p-3 rounded text-sm text-blue-800 border border-blue-200">
                    <p className="font-bold">Ngân hàng MB Bank</p>
                    <p>STK: 0999999999</p>
                    <p>Chủ TK: NGUYEN VAN A</p>
                    <p>Nội dung: SDT_TenKhachHang</p>
                  </div>
                )}
              </div>
            )}

            <Divider />

            {/* TỔNG TIỀN VÀ NÚT ĐẶT */}
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-bold">Tổng cộng:</span>
              <span className="text-2xl font-bold text-[#6F4E37]">
                {totalAmount.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </span>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-[#6F4E37] text-white py-3 rounded-lg font-bold text-lg hover:bg-[#5a3e2b] transition shadow-lg"
            >
              ĐẶT HÀNG NGAY
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
