import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
const Cart = () => {
  const cartTotalQuantity = useCartStore((state) => state.totalQuantity);
  return (
    <div className="relative">
      <div className="absolute top-[-6px] right-[-6px] bg-red-500 text-white rounded-full w-[16px] h-[16px] flex items-center justify-center text-xs">
        {cartTotalQuantity}
      </div>
      <ShoppingCart />
    </div>
  );
};

export default Cart;
