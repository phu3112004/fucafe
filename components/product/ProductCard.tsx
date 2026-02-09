import { Product } from "@/types/product-types";
const ProductCard = (product: Product) => {
  return (
    <div className="border p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <img
        src={product.image}
        alt="Product Image"
        className="w-full h-48 object-cover rounded-md"
      />
      <h2 className="text-xl font-semibold">{product.name}</h2>
      <p>
        Price:{" "}
        {product.price.toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        })}
      </p>
      <button>Add to Cart</button>
    </div>
  );
};
export default ProductCard;
