"use client";

import ImageUpload from "@/components/ImageUpload";
import { useBanners } from "@/hooks/useBanners";

export default function AdminBannersPage() {
  const { banners, formData, loading, setFormValue, addBanner, deleteBanner } =
    useBanners();

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-[#6F4E37] mb-8">
        Quản lý Banner Quảng cáo
      </h1>

      {/* FORM THÊM MỚI */}
      <div className="bg-white p-6 rounded-xl shadow-md border border-[#d4c5b0] mb-10">
        <h2 className="text-xl font-bold mb-4">Thêm Banner Mới</h2>
        <form
          onSubmit={addBanner} // Gọi hàm từ hook
          className="grid grid-cols-1 md:grid-cols-1 gap-4"
        >
          <input
            type="text"
            placeholder="Tiêu đề (VD: Sale 50%)"
            className="border p-2 rounded"
            value={formData.title}
            onChange={(e) => setFormValue("title", e.target.value)}
          />
          <input
            type="text"
            placeholder="Link đích (VD: /menu)"
            className="border p-2 rounded"
            value={formData.linkTo}
            onChange={(e) => setFormValue("linkTo", e.target.value)}
          />
          <ImageUpload onUpload={(url) => setFormValue("imageUrl", url)} />
          <button
            type="submit"
            disabled={loading}
            className="bg-[#6F4E37] text-white font-bold py-2 rounded hover:bg-[#5a3e2b]"
          >
            {loading ? "Đang thêm..." : "Thêm ngay"}
          </button>
        </form>
      </div>

      {/* DANH SÁCH BANNER */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {banners.map((banner) => (
          <div
            key={banner._id}
            className="relative group bg-gray-100 rounded-xl overflow-hidden shadow-sm"
          >
            <img
              src={banner.imageUrl}
              alt={banner.title}
              className="w-full h-40 object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-sm flex justify-between items-center">
              <span>{banner.title || "Banner không tiêu đề"}</span>
              <button
                onClick={() => deleteBanner(banner._id)} // Gọi hàm từ hook
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
              >
                Xóa
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
