import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartState, CartItem } from "@/types/cart-types";

export const useCartStore = create<CartState>()(
  // Tạm để any nếu bạn chưa fix type, tốt nhất là để <CartState>
  persist(
    (set, get) => ({
      items: [],
      totalQuantity: 0,
      totalPrice: 0,

      // === SỬA LẠI HÀM ADD ITEM ===
      addItem: (newItem: CartItem) => {
        set((state: any) => {
          const existingItem = state.items.find(
            (i: any) => i._id === newItem._id,
          );

          let updatedItems;

          if (existingItem) {
            // Nếu có rồi: Dùng map để tạo mảng mới, update số lượng của item đó
            updatedItems = state.items.map((item: any) =>
              item._id === newItem._id
                ? { ...item, quantity: item.quantity + newItem.quantity }
                : item,
            );
          } else {
            // Nếu chưa có: Tạo mảng mới bằng cách copy mảng cũ + item mới
            updatedItems = [...state.items, newItem];
          }

          // Trả về state mới (Zustand sẽ tự merge và render lại)
          return {
            items: updatedItems,
            totalQuantity: state.totalQuantity + newItem.quantity,
            totalPrice: state.totalPrice + newItem.price * newItem.quantity,
          };
        });
      },

      // === SỬA LẠI HÀM REMOVE ITEM ===
      removeItem: (itemId: string) => {
        set((state: any) => {
          const itemToRemove = state.items.find((i: any) => i._id === itemId);

          if (!itemToRemove) return state; // Không thấy thì không làm gì

          const updatedItems = state.items.filter((i: any) => i._id !== itemId);

          return {
            items: updatedItems,
            totalQuantity: state.totalQuantity - itemToRemove.quantity,
            totalPrice:
              state.totalPrice - itemToRemove.price * itemToRemove.quantity,
          };
        });
      },
    }),
    {
      name: "fucafe-cart",
    },
  ),
);
