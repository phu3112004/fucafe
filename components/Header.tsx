"use client";
import Image from "next/image";
import Link from "next/link";
import { useAuthStore } from "@/store/useAuthStore";
import { usePathname } from "next/navigation";
import { navItem } from "@/const/nav-const";

const Header = () => {
  const user = useAuthStore((state) => state.user);
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <header className="w-[100%] h-[60px] flex flex-center px-16 border-b border-gray-300">
      <nav className="w-[100%] h-[100%] flex justify-between items-center">
        <div>
          <Image src="/logo.jpg" alt="Logo" width={50} height={50} />
        </div>
        <ul className="flex gap-16 text-lg">
          {navItem.map((item) => (
            <li key={item.href}>
              <Link href={item.href}>{item.name}</Link>
            </li>
          ))}
        </ul>
        <ul className="flex gap-4">
          {user ? (
            <>
              <li>
                <span>Welcome, {user.name}</span>
              </li>
              <li>
                <button onClick={() => useAuthStore.getState().logout()}>
                  Log out
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/login">Log in</Link>
              </li>
              <li>
                <Link href="/signup">Sign up</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};
export default Header;
