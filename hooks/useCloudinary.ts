"use client";
import { useState } from "react";

export const useCloudinary = () => {
  const [isUploading, setIsUploading] = useState(false);

  const uploadImage = async (file: File) => {
    if (!file) return null;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      `${process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME}`,
    );

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: "POST", body: formData },
      );

      const data = await res.json();
      return data.secure_url as string; // Trả về link ảnh xịn
    } catch (error) {
      console.error("Cloudinary Upload Error:", error);
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  return { uploadImage, isUploading };
};
