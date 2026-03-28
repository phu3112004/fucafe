"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminSidebar() {
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", href: "/admin" },
    { name: "Products Management", href: "/admin/products" },
    { name: "Banners Management", href: "/admin/banners" },
    { name: "Orders Management", href: "/admin/orders" },
    { name: "Users Management", href: "/admin/users" },
    { name: "Contacts Management", href: "/admin/contact" },
    { name: "News Management", href: "/admin/news" },
  ];

  return (
    <aside className="w-64 bg-[#2C2C2C] text-white min-h-screen flex flex-col fixed left-0 top-0 overflow-y-auto">
      {/* Logo Admin */}
      <div className="p-6 border-b border-gray-700">
        <h2 className="text-2xl font-bold text-[#D4A373]">Fucafe Admin</h2>
        <p className="text-xs text-gray-400 mt-1">Management System</p>
      </div>

      {/* Menu Links */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-4 py-3 rounded-lg transition ${
                isActive
                  ? "bg-[#6F4E37] text-white font-bold" // Active style
                  : "hover:bg-gray-700 text-gray-300"
              }`}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Nút thoát */}
      <div className="p-4 border-t border-gray-700">
        <Link
          href="/"
          className="block text-center text-sm text-gray-400 hover:text-white"
        >
          ← Back to Website
        </Link>
      </div>
    </aside>
  );
}
