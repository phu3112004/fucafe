import mongoose, { Schema, model, models } from "mongoose";

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    image: { type: String },
    category: { type: String, default: "Coffee" },
    isBestSeller: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const Product = models.Product || model("Product", productSchema);
export default Product;
