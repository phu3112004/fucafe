"use client";
import { useProducts } from "@/hooks/useProducts";
import { categories } from "@/const/product-const";
import ImageUpload from "@/components/ImageUpload";
import { Product } from "@/types/product-types";
import { useEffect } from "react";
import { toast } from "sonner";

interface AdminProductModalProps {
  product?: Product | null; // Nếu có product là Sửa, không có là Thêm
  onSuccess?: () => void; // Callback để đóng modal hoặc refresh danh sách
}

const AdminProductModal = ({ product, onSuccess }: AdminProductModalProps) => {
  const {
    addProduct,
    updateProduct, // Bạn nhớ thêm hàm này vào hook như mình hướng dẫn ở trên nhé
    setProductForm,
    productForm,
    error,
    loading,
    resetForm,
  } = useProducts();

  const isEdit = !!product;

  // Cập nhật dữ liệu vào Form khi component mount hoặc khi chọn sản phẩm khác
  useEffect(() => {
    if (isEdit && product) {
      // Đổ dữ liệu từ product vào form thông qua setProductForm (updateForm)
      (Object.keys(productForm) as Array<keyof typeof productForm>).forEach(
        (key) => {
          if (product[key] !== undefined) {
            setProductForm(key, product[key]);
          }
        },
      );
    } else {
      // Nếu không có product (chế độ Thêm), reset form về mặc định
      if (typeof resetForm === "function") resetForm();
    }
  }, [product, isEdit]);

  // Hàm xử lý thay đổi Input
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setProductForm(name as any, checked);
    } else if (type === "number") {
      setProductForm(name as any, Number(value));
    } else {
      setProductForm(name as any, value);
    }
  };

  // Hàm xử lý Submit chung
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let success = false;

    if (isEdit && product?._id) {
      // Gọi API Update (Bạn cần định nghĩa hàm này trong hook useProducts)
      success = await updateProduct(product._id, productForm);
      if (success) {
        toast.success("Product updated successfully!");
      }
    } else {
      // Gọi API Add
      await addProduct(e);
      success = !error; // Giả định thành công nếu không có lỗi
      toast.success("Product added successfully!");
    }

    if (success && onSuccess) {
      onSuccess();
    }
  };

  return (
    <div className="-mx-4 no-scrollbar max-h-[50vh] overflow-y-auto px-4">
      {/* Hiển thị lỗi từ hook */}
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 border border-red-200 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5">
        <div className="flex flex-col">
          <label className="mb-1.5 font-semibold text-gray-700">
            Product Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Vd: Cà phê Muối"
            className="border border-gray-300 p-2.5 rounded-md focus:ring-2 focus:ring-[#6F4E37] outline-none transition-all"
            value={productForm.name}
            onChange={handleInputChange}
          />
        </div>

        {/* Giá sản phẩm */}
        <div className="flex flex-col">
          <label className="mb-1.5 font-semibold text-gray-700">
            Price (VNĐ)
          </label>
          <input
            type="number"
            name="price"
            placeholder="Vd: 35000"
            className="border border-gray-300 p-2.5 rounded-md focus:ring-2 focus:ring-[#6F4E37] outline-none"
            value={productForm.price}
            onChange={handleInputChange}
          />
        </div>

        {/* Danh mục */}
        <div className="flex flex-col">
          <label className="mb-1.5 font-semibold text-gray-700">Category</label>
          <select
            name="category"
            className="border border-gray-300 p-2.5 rounded-md focus:ring-2 focus:ring-[#6F4E37] outline-none"
            value={productForm.category}
            onChange={handleInputChange}
          >
            <option value="">-- Select Category --</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Mô tả */}
        <div className="flex flex-col">
          <label className="mb-1.5 font-semibold text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            rows={3}
            placeholder="Description of flavor, ingredients..."
            className="border border-gray-300 p-2.5 rounded-md focus:ring-2 focus:ring-[#6F4E37] outline-none resize-none"
            value={productForm.description}
            onChange={handleInputChange}
          />
        </div>

        {/* Checkbox Best Seller */}
        <div className="flex items-center gap-2 py-2">
          <input
            type="checkbox"
            id="isBestSeller"
            name="isBestSeller"
            className="w-5 h-5 accent-[#6F4E37] cursor-pointer"
            checked={productForm.isBestSeller}
            onChange={handleInputChange}
          />
          <label
            htmlFor="isBestSeller"
            className="font-medium cursor-pointer select-none"
          >
            Mark as Best Seller
          </label>
        </div>

        {/* Upload hình ảnh */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-gray-700">Product Image</label>
          {productForm.image && (
            <div className="relative w-24 h-24 border rounded-md overflow-hidden bg-gray-50">
              <img
                src={productForm.image}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <ImageUpload
            onUpload={(url) => {
              setProductForm("image", url);
            }}
          />
        </div>

        {/* Nút Submit */}
        <button
          type="submit"
          disabled={loading}
          className={`mt-4 py-3 px-6 rounded-md text-white font-bold text-lg transition-all shadow-md
            ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#6F4E37] hover:bg-[#5a3e2b] active:scale-95"
            }`}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Processing...
            </span>
          ) : isEdit ? (
            "Update Product"
          ) : (
            "Add Product Now"
          )}
        </button>
      </form>
    </div>
  );
};

export default AdminProductModal;
