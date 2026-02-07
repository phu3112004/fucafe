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
      alert("Thêm sản phẩm thành công!"); // Thông báo cho người dùng

      // Reset form sau khi thêm thành công (tuỳ chọn)
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

  return {
    products,
    loading,
    error,
    addProduct,
    productForm,
    setProductForm: updateForm, // Xuất hàm updateForm thay vì setProductForm gốc
  };
};

export { useProducts };
