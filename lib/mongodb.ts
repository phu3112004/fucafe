import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("!Chưa khai báo MONGODB_URI trong file .env.local");
}

// Định nghĩa kiểu cho biến global để TypeScript không báo lỗi
interface MongooseCache {
  conn: mongoose.Connection | null;
  promise: Promise<mongoose.Connection> | null;
}

// Khai báo biến global (chỉ dùng trong môi trường dev để cache kết nối)
let cached: MongooseCache = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function connectDB() {
  // 1. Nếu đã có kết nối rồi thì dùng lại luôn
  if (cached.conn) {
    return cached.conn;
  }

  // 2. Nếu chưa có kết nối nhưng đang trong quá trình kết nối (promise) thì đợi
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    // Tạo kết nối mới và lưu vào promise
    cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongoose) => {
      console.log("Đã kết nối MongoDB thành công!");
      return mongoose.connection;
    });
  }

  // 3. Chờ kết nối hoàn tất và lưu vào biến conn
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectDB;
