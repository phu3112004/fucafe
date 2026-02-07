import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  image?: string;
}

interface AuthState {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

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
