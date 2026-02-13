"use client";
import { Table } from "antd";
import { useUsers } from "@/hooks/useUsers";

const Users = () => {
  const { users, loading } = useUsers();
  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Role", dataIndex: "role", key: "role" },
  ];
  return (
    <Table
      columns={columns}
      dataSource={users}
      loading={loading}
      rowKey={(record) => record.id}
    />
  );
};

export default Users;
