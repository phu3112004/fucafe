// hooks/useProducts.tsx
import { useState, useEffect } from "react";
import { Product as ProductType } from "../types/product-types"; // Kiểm tra lại đường dẫn import này
import { useRouter } from "next/navigation";

const useProducts = () => {
  const router = useRouter();
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // State form
  const [productForm, setProductForm] = useState<Omit<ProductType, "_id">>({
    name: "",
    description: "",
    price: 0,
    image: "",
    category: "",
    isBestSeller: false,
  });

  // Fetch products (giữ nguyên)
  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products");
      if (!response.ok) throw new Error("Failed to fetch products");
      const data: ProductType[] = await response.json();
      setProducts(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 1. Thêm hàm Reset Form để dùng khi chuyển từ Sửa sang Thêm
  const resetForm = () => {
    setProductForm({
      name: "",
      description: "",
      price: 0,
      image: "",
      category: "",
      isBestSeller: false,
    });
    setError(null);
  };

  // 2. Thêm hàm Update Product
  const updateProduct = async (id: string, data: Partial<ProductType>) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "PUT", // Hoặc PATCH tùy API của bạn
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to update product");

      const updatedData = await response.json();
      // Cập nhật lại danh sách local để UI thay đổi ngay
      setProducts((prev) => prev.map((p) => (p._id === id ? updatedData : p)));
      return true; // Trả về true để component biết là đã xong
    } catch (err) {
      setError((err as Error).message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // --- HÀM MỚI: Để cập nhật từng trường của form ---
  const updateForm = (key: keyof Omit<ProductType, "_id">, value: any) => {
    setProductForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Add product
  const addProduct = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset error cũ
    setError(null);

    // Validate dữ liệu trước khi gửi
    if (!productForm.name) {
      setError("Vui lòng điền Tên sản phẩm!");
      return;
    } else if (productForm.price <= 0) {
      setError("Giá sản phẩm phải lớn hơn 0!");
      return;
    } else if (!productForm.category) {
      setError("Vui lòng chọn danh mục sản phẩm!");
      return;
    } else if (!productForm.image) {
      setError("Vui lòng tải lên hình ảnh sản phẩm!");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productForm),
      });

      if (!response.ok) throw new Error("Failed to add product");

      const addedProduct: ProductType = await response.json();
      setProducts((prev) => [...prev, addedProduct]);

      setProductForm({
        name: "",
        description: "",
        price: 0,
        image: "",
        category: "",
        isBestSeller: false,
      });
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
      router.refresh();
      router.push("/admin/products");
    }
  };

  // 3. Thêm hàm Delete Product
  const deleteProduct = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete product");

      // Cập nhật lại danh sách local để UI thay đổi ngay
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
      router.refresh();
    }
  };

  return {
    products,
    loading,
    error,
    addProduct,
    fetchProducts,
    productForm,
    setProductForm: updateForm, // Xuất hàm updateForm thay vì setProductForm gốc
    updateProduct, // Xuất hàm mới
    resetForm,
    deleteProduct, // Xuất hàm deleteProduct
  };
};

export { useProducts };
