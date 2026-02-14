import { CircleUser } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { useCartStore } from "@/store/useCartStore";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
const Auth = () => {
  const { logout } = useAuthStore();
  const { clearCart } = useCartStore();
  const handleLogout = () => {
    logout();
    clearCart();
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <CircleUser className="cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel>Tài khoản</DropdownMenuLabel>
          <DropdownMenuItem>
            <Link href="/profile">Hồ sơ</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/profile/orders">Đơn hàng</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>Đăng xuất</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Auth;
