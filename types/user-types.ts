interface User {
  _id: string;
  name: string;
  email: string;
  imageUrl?: string;
  role: "admin" | "user";
}
export type { User };
