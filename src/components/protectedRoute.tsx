"use client";

import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectPath?: string;
}

const ProtectedRoute = ({
  children,
  redirectPath = "/login",
}: ProtectedRouteProps) => {
  const { token } = useAuthStore();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      router.push(redirectPath);
    } else {
      setLoading(false);
    }
  }, [token, router, redirectPath]);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
