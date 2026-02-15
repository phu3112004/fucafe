"use client";
import { Table } from "antd";
import { useUsers } from "@/hooks/useUsers";

const AdminUsersPage = () => {
  const { users, loading } = useUsers();
  const columns = [
    { title: "ID", dataIndex: "_id", key: "_id" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Role", dataIndex: "role", key: "role" },
  ];
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-primary mb-8">
        Quản lý người dùng
      </h1>
      <Table
        rowKey={(record) => record.id}
        columns={columns}
        dataSource={users}
        loading={loading}
      />
    </div>
  );
};

export default AdminUsersPage;
