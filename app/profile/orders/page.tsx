"use client";
import { Table } from "antd";
import { useOrder } from "@/hooks/useOrder";
import { useEffect } from "react";
import { status } from "@/const/order-const";
import { useAuthStore } from "@/store/useAuthStore";

const Orders = () => {
  const { orders, getMyOrders, loading } = useOrder();
  const { user } = useAuthStore();
  useEffect(() => {
    if (user) {
      getMyOrders(user.id);
    }
  }, [user]);
  const columns = [
    {
      title: "Mã đơn hàng",
      dataIndex: "_id",
    },
    {
      title: "Ngày đặt hàng",
      dataIndex: "createdAt",
      render: (text: any) => new Date(text).toLocaleDateString("vi-VN"),
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalAmount",
      render: (text: any) => `${text.toLocaleString("vi-VN")} đ`,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      render: (text: any) => {
        const statusItem = status.find((s) => s.value === text);
        return statusItem ? statusItem.label : text;
      },
    },
    {
      title: "Xem chi tiết",
      render: (text: any, record: any) => (
        <a href={`/profile/orders/${record._id}`}>Xem</a>
      ),
    },
  ];
  return (
    <div className="py-8 px-16">
      <h1 className="text-2xl font-bold mb-6 text-primary">Đơn hàng của tôi</h1>
      <Table
        dataSource={orders}
        loading={loading}
        rowKey="_id"
        columns={columns}
      />
    </div>
  );
};

export default Orders;
