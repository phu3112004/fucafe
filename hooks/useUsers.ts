import { useState, useEffect } from "react";
import { User } from "@/types/user-types";

const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  // 1. Hàm lấy danh sách
  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/users");
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error("Lỗi tải user", error);
    }
  };

  // Tự động tải khi Hook được gọi
  useEffect(() => {
    fetchUsers();
  }, []);
  return { users, loading, fetchUsers };
};
export { useUsers };
