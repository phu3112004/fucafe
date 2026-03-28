"use client";

import { useState } from "react";

interface ImageUploadProps {
  onUpload: (url: string) => void; // Hàm callback trả link về cho form cha
}

export default function ImageUpload({ onUpload }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    // 1. Tạo form data để gửi lên Cloudinary
    const formData = new FormData();
    formData.append("file", file);
    // 👇 Thay bằng tên preset bạn vừa tạo ở bước 1
    formData.append(
      "upload_preset",
      `${process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME}`,
    );
    // 👇 Thay bằng tên cloud của bạn
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

    try {
      // 2. Gửi request upload trực tiếp
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        { method: "POST", body: formData },
      );

      const data = await res.json();

      if (data.secure_url) {
        // 3. Upload xong -> Gọi hàm cha để lưu link
        onUpload(data.secure_url);
        setPreview(data.secure_url); // Hiện ảnh xem trước
      }
    } catch (error) {
      alert("Failed to upload image!");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
      {/* Khu vực xem trước */}
      {preview ? (
        <div className="relative w-full h-40">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-full object-contain rounded"
          />
          <button
            type="button"
            onClick={() => setPreview(null)}
            className="absolute top-0 right-0 bg-red-500 text-white p-1 text-xs rounded-bl"
          >
            Delete
          </button>
        </div>
      ) : (
        <div className="text-gray-500 text-sm">No image selected</div>
      )}

      {/* Nút chọn file (Ẩn đi và thay bằng Label đẹp hơn nếu muốn) */}
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={uploading}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#6F4E37] file:text-white hover:file:bg-[#5a3e2b]"
      />

      {uploading && (
        <p className="text-blue-600 text-sm animate-pulse">
          Uploading image...
        </p>
      )}
    </div>
  );
}
