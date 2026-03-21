"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useOrder } from "@/hooks/useOrder";
import {
  Table,
  Card,
  Tag,
  Spin,
  Descriptions,
  Button,
  Divider,
  Result,
} from "antd";
import {
  ArrowLeftOutlined,
  ShoppingOutlined,
  CarOutlined,
  CreditCardOutlined,
} from "@ant-design/icons";
import { status } from "@/const/order-const";

// Map trạng thái sang tiếng Việt và màu sắc
const OrderDetailPage = () => {
  const { orderId } = useParams(); // Lấy ID an toàn từ URL
  const router = useRouter();
  const { getOrderDetail, order, loading, error } = useOrder();

  // Gọi API lấy chi tiết khi có ID
  useEffect(() => {
    console.log("🔍 ID từ URL:", orderId);
    if (orderId) {
      getOrderDetail(orderId as string);
    }
  }, [orderId]);

  // 1. Màn hình Loading
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  // 2. Màn hình Lỗi hoặc Không tìm thấy
  if (error || !order) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Result
          status="404"
          title="Không tìm thấy đơn hàng"
          subTitle="Đơn hàng này không tồn tại hoặc bạn không có quyền truy cập."
          extra={
            <Button
              type="primary"
              onClick={() => router.push("/profile/orders")}
            >
              Quay lại danh sách
            </Button>
          }
        />
      </div>
    );
  }

  // 3. Cấu hình cột cho bảng sản phẩm
  const columns = [
    {
      title: "Sản phẩm",
      dataIndex: "image",
      key: "image",
      render: (image: string, record: any) => (
        <div className="flex items-center gap-3">
          <img
            src={image || "/placeholder-coffee.jpg"}
            alt={record.name}
            className="w-16 h-16 object-cover rounded-md border"
          />
          <span className="font-semibold">{record.name}</span>
        </div>
      ),
    },
    {
      title: "Đơn giá",
      dataIndex: "price",
      key: "price",
      render: (price: number) =>
        new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(price),
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      align: "center" as const,
    },
    {
      title: "Thành tiền",
      key: "total",
      render: (_: any, record: any) => (
        <span className="font-bold text-primary">
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(record.price * record.quantity)}
        </span>
      ),
    },
  ];

  const currentStatus = status.find((s) => s.value === order.status) || {
    label: order.status,
    color: "default",
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 space-y-6">
      {/* NÚT QUAY LẠI */}
      <Button
        icon={<ArrowLeftOutlined />}
        onClick={() => router.back()}
        className="mb-4 border-none shadow-none hover:bg-gray-100"
      >
        Quay lại danh sách
      </Button>

      {/* HEADER: MÃ ĐƠN & TRẠNG THÁI */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-6 rounded-lg shadow-sm border">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Đơn hàng #{order._id.slice(-6).toUpperCase()}
          </h1>
          <p className="text-gray-500">
            Ngày đặt: {new Date(order.createdAt).toLocaleString("vi-VN")}
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Tag color={currentStatus.color} className="text-lg px-4 py-1">
            {currentStatus.label.toUpperCase()}
          </Tag>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* CỘT TRÁI: THÔNG TIN GIAO HÀNG (Chiếm 2 phần) */}
        <div className="md:col-span-2 space-y-6">
          {/* DANH SÁCH MÓN ĂN */}
          <Card
            title={
              <>
                <ShoppingOutlined /> Danh sách sản phẩm
              </>
            }
            className="shadow-sm"
          >
            <Table
              rowKey={"_id"}
              dataSource={order.items}
              columns={columns}
              pagination={false}
            />
          </Card>
        </div>

        {/* CỘT PHẢI: THÔNG TIN THANH TOÁN & NGƯỜI NHẬN (Chiếm 1 phần) */}
        <div className="space-y-6 gap-6 flex flex-col">
          {/* THÔNG TIN NGƯỜI NHẬN */}
          <Card
            title={
              <>
                <CarOutlined /> Thông tin nhận hàng
              </>
            }
            className="shadow-sm"
          >
            <Descriptions column={1} layout="vertical">
              <Descriptions.Item label="Người nhận">
                <span className="font-medium">
                  {order.shippingAddress?.fullName}
                </span>
              </Descriptions.Item>
              <Descriptions.Item label="Số điện thoại">
                {order.shippingAddress?.phone}
              </Descriptions.Item>
              <Descriptions.Item label="Hình thức giao">
                {order.deliveryMethod === "PICKUP" ? (
                  <Tag color="cyan">Đến lấy tại quán</Tag>
                ) : (
                  <Tag color="blue">Giao hàng tận nơi</Tag>
                )}
              </Descriptions.Item>
              {order.deliveryMethod === "DELIVERY" && (
                <Descriptions.Item label="Địa chỉ">
                  {order.shippingAddress?.address}
                </Descriptions.Item>
              )}
              {order.note && (
                <Descriptions.Item label="Ghi chú">
                  <span className="text-gray-500 italic">"{order.note}"</span>
                </Descriptions.Item>
              )}
            </Descriptions>
          </Card>

          {/* THÔNG TIN THANH TOÁN */}
          <Card
            title={
              <>
                <CreditCardOutlined /> Thanh toán
              </>
            }
            className="shadow-sm"
          >
            <Descriptions column={1}>
              <Descriptions.Item label="Phương thức">
                {order.paymentMethod === "COD"
                  ? "Tiền mặt (COD)"
                  : "Chuyển khoản (Banking)"}
              </Descriptions.Item>
              <Descriptions.Item label="Trạng thái">
                {/* Giả sử bạn có trường paymentStatus, nếu chưa có thì tạm để pending */}
                <Tag
                  color={order.paymentMethod === "BANKING" ? "gold" : "default"}
                >
                  {order.paymentMethod === "BANKING"
                    ? "Chờ đối soát"
                    : "Thanh toán khi nhận"}
                </Tag>
              </Descriptions.Item>
            </Descriptions>

            <Divider />

            <div className="flex justify-between items-center">
              <span className="font-bold text-gray-600">Tổng thanh toán</span>
              <span className="text-2xl font-bold text-primary">
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(order.totalAmount)}
              </span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;
