"use client";
import { Table } from "antd";
import { useContacts } from "@/hooks/useContact";

const AdminContactsPage = () => {
  const { contacts, loading } = useContacts();
  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
      render: (id: string) => (
        <span className="font-mono text-gray-500">
          #{id.slice(-6).toUpperCase()}
        </span>
      ),
    },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Message", dataIndex: "message", key: "message" },
    {
      title: "Create At",
      dataIndex: "createdAt",
      key: "createdAt",
      sorter: (a: any, b: any) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      render: (date: string) => new Date(date).toLocaleString(),
    },
  ];
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-primary mb-8">Quản lý liên hệ</h1>
      <Table
        rowKey={"_id"}
        columns={columns}
        dataSource={contacts}
        loading={loading}
        pagination={{ pageSize: 8 }}
      />
    </div>
  );
};

export default AdminContactsPage;
