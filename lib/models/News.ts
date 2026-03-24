import mongoose from "mongoose";

const NewsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: Object, required: true }, // Lưu cục JSON từ Tiptap
  thumbnail: { type: String }, // Link ảnh đại diện (nếu có)
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.News || mongoose.model("News", NewsSchema);
