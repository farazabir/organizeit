import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "@/utils/api";

interface StripeState {
  customerId: string | null;
  checkoutUrl: string | null;
  isLoading: boolean;
  error: string | null;
  createCustomer: (email: string) => Promise<void>;
  createCheckoutSession: (customerId: string, priceId: string) => Promise<void>;
  resetStripeState: () => void;
}

export const useStripeStore = create<StripeState>()(
  persist(
    (set) => ({
      customerId: null,
      checkoutUrl: null,
      isLoading: false,
      error: null,

      createCustomer: async (email) => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.post(
            "/api/v1/stripe/create-customer",
            null,
            {
              params: { email },
              headers: {
                Authorization: `${localStorage.getItem("token")}`,
              },
            }
          );
          set({ customerId: response.data, isLoading: false });
        } catch (error: any) {
          set({
            error: error.response?.data?.message || "Failed to create customer",
            isLoading: false,
          });
        }
      },

      createCheckoutSession: async (customerId, priceId) => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.post(
            "/api/v1/stripe/create-checkout-session",
            null,
            {
              params: { customerId, priceId },
              headers: {
                Authorization: `${localStorage.getItem("token")}`,
              },
            }
          );
          set({ checkoutUrl: response.data.url, isLoading: false });

          if (response) {
            window.location.href = response.data;
          }
        } catch (error: any) {
          set({
            error:
              error.response?.data?.message ||
              "Failed to create checkout session",
            isLoading: false,
          });
        }
      },

      resetStripeState: () => {
        set({
          customerId: null,
          checkoutUrl: null,
          error: null,
          isLoading: false,
        });
      },
    }),
    {
      name: "stripe-storage",
      partialize: (state) => ({
        customerId: state.customerId,
        checkoutUrl: state.checkoutUrl,
      }),
    }
  )
);
