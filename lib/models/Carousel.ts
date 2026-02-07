import mongoose, { Schema, model, models } from "mongoose";

const carouselSchema = new Schema(
  {
    title: { type: String },
    imageUrl: { type: String, required: true },
    linkTo: { type: String, default: "/" },
    active: { type: Boolean, default: true },
  },
  { timestamps: true },
);

const Carousel = models.Carousel || model("Carousel", carouselSchema);
export default Carousel;
