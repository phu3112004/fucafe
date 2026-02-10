import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AuthState } from "@/types/user-types";

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,

      // Hành động Đăng nhập: Lưu user vào kho
      login: (userData) => set({ user: userData }),

      // Hành động Đăng xuất: Xóa user, về null
      logout: () => set({ user: null }),
    }),
    {
      name: "fucafe-auth", // Tên key lưu trong LocalStorage
    },
  ),
);
