import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "@/utils/api";

interface User {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  active: boolean;
}

interface AuthState {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,

      login: async (email, password) => {
        const res = await api.post("/api/v1/user/login", { email, password });
        const token = res.data;
        localStorage.setItem("token", token);

        const userRes = await api.get("/api/v1/user/profile", {
          headers: { Authorization: `${token}` },
        });

        set({ user: userRes.data, token });
      },

      register: async (name, email, password) => {
        const res = await api.post("/api/v1/user", { name, email, password });
        set({ user: res.data.user });
      },

      logout: () => {
        localStorage.removeItem("token");
        set({ user: null, token: null });
      },
    }),
    { name: "auth-storage" }
  )
);
