"use client";
import { Table, Tag, Select, message, Descriptions, Avatar, Card } from "antd";
import { useOrder } from "@/hooks/useOrder";
import { useEffect, useState } from "react";
import { status, PICKUP_FLOW, DELIVERY_FLOW } from "@/const/order-const";
import {
  UserOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { toast } from "sonner";
import { Order } from "@/types/order-types";

const AdminOrdersPage = () => {
  const { orders, loading, getAllOrders, updateOrderStatus, setOrders } =
    useOrder();
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    getAllOrders();
  }, []);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    setUpdatingId(orderId);
    // 1. Backup dữ liệu cũ (đề phòng lỗi)
    const oldOrders = [...orders];

    // 2. Cập nhật giao diện NGAY LẬP TỨC (Optimistic Update)
    // Map qua danh sách, tìm đúng thằng orderId đó và đổi status mới
    setOrders((prev) =>
      prev.map((o) =>
        o._id === orderId ? { ...o, status: newStatus as Order["status"] } : o,
      ),
    );

    try {
      await updateOrderStatus(orderId, newStatus);
      toast.success("Cập nhật trạng thái thành công");
    } catch (error) {
      setOrders(oldOrders);
      toast.error("Lỗi cập nhật, đã hoàn tác!");
    } finally {
      setUpdatingId(null);
    }
  };

  const columns = [
    {
      title: "Mã đơn",
      dataIndex: "_id",
      render: (id: string) => (
        <span className="font-mono text-gray-500">
          #{id.slice(-6).toUpperCase()}
        </span>
      ),
    },
    {
      title: "Khách hàng",
      render: (record: any) => (
        <div className="flex items-center gap-2">
          <Avatar
            icon={<UserOutlined />}
            src={record.user?.image}
            size="small"
          />
          <span className="font-medium">
            {record.shippingAddress?.fullName ||
              record.user?.name ||
              "Khách vãng lai"}
          </span>
        </div>
      ),
    },
    {
      title: "Loại đơn",
      dataIndex: "deliveryMethod",
      render: (method: string) => (
        <Tag color={method === "PICKUP" ? "cyan" : "blue"}>
          {method === "PICKUP" ? "ĐẾN LẤY" : "GIAO HÀNG"}
        </Tag>
      ),
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalAmount",
      render: (val: number) => (
        <span className="font-bold text-[#6F4E37]">
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(val)}
        </span>
      ),
    },
    {
      title: "Trạng thái (Flow chuẩn)",
      key: "status",
      width: 250,
      filters: status.map((s) => ({ text: s.label, value: s.value })),
      onFilter: (value: any, record: any) => record.status === value,
      render: (_: any, record: any) => {
        const currentFlow =
          record.deliveryMethod === "PICKUP" ? PICKUP_FLOW : DELIVERY_FLOW;
        const currentIndex = currentFlow.indexOf(record.status);

        return (
          <Select
            value={record.status}
            style={{ width: "100%" }}
            loading={updatingId === record._id}
            onChange={(val) => handleStatusChange(record._id, val)}
            disabled={
              record.status === "COMPLETED" || record.status === "CANCELLED"
            }
          >
            {status.map((s) => {
              if (!currentFlow.includes(s.value)) return null;

              const targetIndex = currentFlow.indexOf(s.value);

              // Logic chặn ngược:
              // 1. Disable các bước cũ hơn (targetIndex < currentIndex)
              // 2. Disable chính bước hiện tại
              // 3. Luôn cho phép chọn "CANCELLED" (trừ khi đã xong)
              const isDisabled =
                (targetIndex <= currentIndex && s.value !== "CANCELLED") ||
                record.status === "CANCELLED" ||
                record.status === "COMPLETED";

              return (
                <Select.Option
                  key={s.value}
                  value={s.value}
                  disabled={isDisabled}
                >
                  <Tag color={isDisabled ? "default" : s.color}>{s.label}</Tag>
                </Select.Option>
              );
            })}
          </Select>
        );
      },
    },
  ];

  const expandedRowRender = (record: any) => {
    return (
      <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* CỘT 1: DANH SÁCH MÓN ĂN */}
          <Card title="Danh sách món" size="small" variant="borderless">
            {record.items.map((item: any, idx: number) => (
              <div
                key={idx}
                className="flex items-center gap-3 mb-3 last:mb-0 border-b pb-2 last:border-0"
              >
                <img
                  src={item.image || "/placeholder.png"}
                  alt={item.name}
                  className="w-12 h-12 rounded object-cover"
                />
                <div className="flex-1">
                  <div className="font-medium">{item.name}</div>
                  <div className="text-gray-500 text-xs">x{item.quantity}</div>
                </div>
                <div className="font-semibold">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(item.price)}
                </div>
              </div>
            ))}
          </Card>

          <Card title="Thông tin chi tiết" size="small" variant="borderless">
            <Descriptions column={1} size="small">
              <Descriptions.Item
                label={
                  <span className="text-gray-500">
                    <ClockCircleOutlined /> Ngày đặt
                  </span>
                }
              >
                {new Date(record.createdAt).toLocaleString("vi-VN")}
              </Descriptions.Item>
              <Descriptions.Item
                label={
                  <span className="text-gray-500">
                    <EnvironmentOutlined /> Người nhận
                  </span>
                }
              >
                <div>
                  <b>{record.shippingAddress?.fullName}</b> -{" "}
                  {record.shippingAddress?.phone}
                  <br />
                  <span className="text-gray-500">
                    {record.shippingAddress?.address}
                  </span>
                </div>
              </Descriptions.Item>
              <Descriptions.Item label="Ghi chú">
                {record.note ? (
                  <span className="text-red-500 font-medium">
                    {record.note}
                  </span>
                ) : (
                  "Không có"
                )}
              </Descriptions.Item>
              <Descriptions.Item label="Thanh toán">
                <Tag
                  color={
                    record.paymentMethod === "BANKING" ? "gold" : "default"
                  }
                >
                  {record.paymentMethod}
                </Tag>
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </div>
      </div>
    );
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Quản lý & Xử lý đơn hàng
      </h1>
      <Table
        rowKey={(record) => record._id}
        columns={columns}
        dataSource={orders}
        loading={loading}
        expandable={{
          expandedRowRender,
          rowExpandable: (record) => true,
        }}
        pagination={{ pageSize: 8 }}
      />
    </div>
  );
};

export default AdminOrdersPage;
