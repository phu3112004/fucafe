"use client";
import { useAuthStore } from "@/store/useAuthStore";

const Profile = () => {
  const { user } = useAuthStore();
  return (
    <div>
      Hello {user?.name} {user?.id}
    </div>
  );
};

export default Profile;
