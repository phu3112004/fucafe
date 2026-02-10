"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
const Footer = () => {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) {
    return null;
  }
  return (
    <footer>
      <div className="w-[100%] min-h-[200px] flex justify-between items-center p-16 border-t border-gray-300">
        <div className="w-[30%] flex flex-col items-start gap-2">
          <Image src="/logo.jpg" alt="Logo" width={120} height={120} />
          <p>© 2026 Fu Café. Tất cả các quyền được bảo lưu</p>
        </div>
        <div className="w-[65%] flex justify-between">
          <div>
            <h2 className="text-xl font-medium">Về chúng tôi</h2>
            <ul className="flex gap-2 mt-4 flex-col">
              <li>
                <Link href={"/about"}>Câu chuyện</Link>
              </li>
              <li>
                <Link href={"/menu"}>Thực đơn</Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-medium">Liên hệ</h2>
            <ul className="flex gap-2 mt-4 flex-col">
              <li>Điện thoại: +84 912 345 678</li>
              <li>Email: info@fucafe.com</li>
              <li>Địa chỉ: 123 Coffee, TP.HCM</li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-medium">Theo dõi</h2>
            <ul className="flex gap-2 mt-4 flex-col">
              <li>Facebook</li>
              <li>Twitter</li>
              <li>Instagram</li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-medium">Thông tin</h2>
            <ul className="flex gap-2 mt-4 flex-col">
              <li>Blog</li>
              <li>Chính sách bảo mật</li>
              <li>Nhận tin qua email</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
