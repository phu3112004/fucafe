import { Product } from "@/types/product-types";
import { useCartStore } from "@/store/useCartStore";
import { toast } from "sonner";

const ProductCard = (product: Product) => {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    toast.success("Đã thêm sản phẩm vào giỏ hàng!");
    addItem({ ...product, quantity: 1 });
  };

  return (
    <div className="relative border p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 h-[350px] flex flex-col items-center justify-between">
      <img
        src={product.image}
        alt="Product Image"
        className="w-full h-48 object-cover rounded-md"
      />
      {product.isBestSeller && (
        <div className="absolute top-2 left-2 bg-yellow-300 text-yellow-800 px-2 py-1 rounded-md text-sm font-semibold">
          Best Seller
        </div>
      )}
      <h2 className="text-xl font-semibold">{product.name}</h2>
      <p>
        Giá:{" "}
        {product.price.toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        })}
      </p>
      <button
        onClick={handleAddToCart}
        className="bg-[#6F4E37] text-white px-4 py-2 rounded hover:bg-[#5a3e2d] cursor-pointer transition-colors duration-300"
      >
        Thêm vào giỏ hàng
      </button>
    </div>
  );
};
export default ProductCard;
