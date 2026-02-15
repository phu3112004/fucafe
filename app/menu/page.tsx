"use client";
import Sidebar from "@/components/menu/Sidebar";
import ProductCard from "@/components/product/ProductCard";
import { useProducts } from "@/hooks/useProducts";
import { useState, useMemo } from "react";

const MenuPage = () => {
  const { products } = useProducts(); // loading bỏ qua nếu chưa handle
  const [activeCategory, setActiveCategory] = useState("all");

  // Sử dụng useMemo để không phải tính toán lại mỗi lần re-render nếu products không đổi
  const groupedProducts = useMemo(() => {
    // 1. Nhóm sản phẩm theo category
    const groups = products.reduce(
      (acc, product) => {
        const cat = product.category; // Ví dụ: "Coffee", "Tea"
        if (!acc[cat]) {
          acc[cat] = [];
        }
        acc[cat].push(product);
        return acc;
      },
      {} as Record<string, typeof products>,
    );

    // 2. Chuyển đổi object thành mảng để dễ map
    // Kết quả: [{ category: "Coffee", items: [...] }, ...]
    let result = Object.entries(groups).map(([category, items]) => ({
      category,
      items,
    }));

    // 3. Lọc nếu activeCategory không phải "all"
    if (activeCategory !== "all") {
      result = result.filter((group) => group.category === activeCategory);
    }

    return result;
  }, [products, activeCategory]);

  return (
    <div className="grid grid-cols-[15%_85%] px-16 my-4 justify-between items-start gap-8">
      <Sidebar
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      {/* Cột hiển thị sản phẩm */}
      <div className="pl-4 flex flex-col gap-10">
        {groupedProducts
          .slice()
          .reverse()
          .map((group) => (
            <div key={group.category}>
              {/* Tiêu đề từng nhóm (Ví dụ: Cà phê) */}
              <h2 className="text-2xl font-bold text-primary mb-4 border-b pb-2 uppercase">
                {group.category}
              </h2>

              {/* Grid sản phẩm của nhóm đó */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {group.items.map((product) => (
                  <ProductCard key={product._id} {...product} />
                ))}
              </div>
            </div>
          ))}

        {/* Xử lý trường hợp không có sản phẩm nào */}
        {groupedProducts.length === 0 && (
          <div className="text-center text-gray-500">
            Không tìm thấy sản phẩm nào.
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuPage;
