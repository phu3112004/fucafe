interface User {
  _id: string;
  name: string;
  email: string;
  imageUrl?: string;
  role: "admin" | "user";
}
interface AuthState {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}
export type { User, AuthState };
