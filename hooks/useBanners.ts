import { useState, useEffect } from "react";
import { Banner, BannerFormData } from "@/types/banner-types";

const useBanners = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<BannerFormData>({
    title: "",
    imageUrl: "",
    linkTo: "/",
  });

  // 1. Hàm lấy danh sách
  const fetchBanners = async () => {
    try {
      // Lưu ý: Kiểm tra folder API của bạn là 'carousel' hay 'carousels' nhé
      const res = await fetch("/api/carousel");
      const data = await res.json();
      setBanners(data);
    } catch (error) {
      console.error("Lỗi tải banner", error);
    }
  };

  // Tự động tải khi Hook được gọi
  useEffect(() => {
    fetchBanners();
  }, []);

  // 2. Hàm thêm mới
  const addBanner = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.imageUrl) return alert("Phải có link ảnh!");

    setLoading(true);
    try {
      await fetch("/api/carousel", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      // Reset form & Load lại
      setFormData({ title: "", imageUrl: "", linkTo: "/" });
      fetchBanners();
    } catch (error) {
      alert("Lỗi thêm banner");
    } finally {
      setLoading(false);
    }
  };

  // 3. Hàm xóa
  const deleteBanner = async (id: string) => {
    if (!confirm("Bạn chắc chắn muốn xóa banner này?")) return;
    try {
      await fetch(`/api/carousel/${id}`, { method: "DELETE" });
      fetchBanners();
    } catch (error) {
      alert("Lỗi xóa banner");
    }
  };

  const setFormValue = (field: keyof BannerFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return {
    banners,
    formData,
    loading,
    setFormValue,
    addBanner,
    deleteBanner,
  };
};

export { useBanners };
