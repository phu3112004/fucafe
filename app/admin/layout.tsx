import AdminSidebar from "@/components/admin/AdminSidebar";

export const metadata = {
  title: "Trang Quản Trị - Fucafe",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* 1. Sidebar cố định bên trái */}
      <AdminSidebar />

      {/* 2. Nội dung thay đổi bên phải */}
      {/* ml-64 để đẩy nội dung sang phải, tránh bị Sidebar che mất */}
      <main className="flex-1 ml-64 p-8">
        <div className="bg-white rounded-xl shadow-sm p-6 min-h-[80vh]">
          {children}
        </div>
      </main>
    </div>
  );
}
