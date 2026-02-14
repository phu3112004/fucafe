"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "@/store/useAuthStore"; // <--- Import Store

export default function LoginPage() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login); // Lấy hàm login từ kho
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        // 1. Lưu vào Store (Zustand)
        login(data.user);

        alert(`☕ Xin chào ${data.user.name}!`);

        // 2. Chuyển hướng
        if (data.user.role === "admin") {
          router.push("/admin"); // Nếu là sếp -> vào Admin
        } else {
          router.push("/"); // Nếu là khách -> ra trang chủ
        }
      } else {
        alert(`❌ Lỗi: ${data.message}`);
      }
    } catch (error) {
      alert("Lỗi hệ thống");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f0e6] px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-[#d4c5b0]">
        <h1 className="text-3xl font-bold text-center text-primary mb-8">
          Đăng nhập Fucafe
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="email"
            placeholder="Email"
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-[#6F4E37]"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <input
            type="password"
            placeholder="Mật khẩu"
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-[#6F4E37]"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#6F4E37] text-white font-bold py-3 rounded-lg hover:bg-[#5a3e2b] transition disabled:bg-gray-400"
          >
            {loading ? "Đang xử lý..." : "Đăng nhập"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Chưa có tài khoản?{" "}
          <Link
            href="/register"
            className="text-primary font-bold hover:underline"
          >
            Đăng ký ngay
          </Link>
        </div>
      </div>
    </div>
  );
}
