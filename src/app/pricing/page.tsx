"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { CheckIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { useStripeStore } from "@/stores/stripeStore";
import { useAuthStore } from "@/stores/authStore";

type Plan = {
  title: string;
  price: number;
  features: string[];
};

export default function Pricing() {
  const router = useRouter();
  const { createCustomer, createCheckoutSession, isLoading } = useStripeStore();
  const { user } = useAuthStore();
  const plans: Plan[] = [
    {
      title: "Free",
      price: 0,
      features: [
        "3 projects",
        "3 team members",
        "Unlimited Board",
        "Business hours support",
      ],
    },
    {
      title: "Pro",
      price: 19.99,
      features: [
        "10 projects",
        "10 team members",
        "Unlimited Board",
        "Premium Support",
      ],
    },
    {
      title: "Business",
      price: 99.99,
      features: [
        "50 projects",
        "Unlimited team members",
        "Unlimited Board",
        "Priority Support",
      ],
    },
  ];

  const handleGetStarted = async (plan: Plan) => {
    if (!user) {
      alert("Please log in to create a subscription.");
      return;
    }

    const email = user.email;
    await createCustomer(email);

    const { customerId, error } = useStripeStore.getState();

    if (!error && customerId) {
      const priceId =
        plan.price === 19.99
          ? "price_1Qr12QK0wBZbULUsjJpRUPHc"
          : plan.price === 99.99
          ? "price_1Qr12sK0wBZbULUsqtVFi0nS"
          : "price_0";

      await createCheckoutSession(customerId, priceId);
    }

    if (error) {
      alert(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">
          Simple, Transparent Pricing
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className={`p-8 rounded-xl ${
                index === 1
                  ? "bg-black text-white"
                  : "bg-white dark:bg-gray-800"
              } shadow-lg hover:shadow-xl transform hover:scale-105 transition-all`}
            >
              <h3 className="text-2xl font-bold mb-4 dark:text-white">
                {plan.title}
              </h3>
              <div className="text-4xl font-bold mb-6 dark:text-white">
                ${plan.price}
                <span className="text-lg">/month</span>
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((item) => (
                  <li
                    key={item}
                    className="flex items-center dark:text-gray-300"
                  >
                    <CheckIcon className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button
                variant={index === 1 ? "secondary" : "default"}
                className="w-full py-6 text-lg"
                onClick={() => handleGetStarted(plan)}
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Get Started"}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">
            Frequently Asked Questions
          </h2>
          <div className="grid md:grid-cols-2 gap-8"></div>
          <div className="mt-12 text-center">
            <p className="text-gray-600 dark:text-gray-300">
              Still have questions?{" "}
              <a
                href="/contact"
                className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
              >
                Contact our team
              </a>
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-800 dark:to-cyan-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Transform Your Workflow?
          </h2>
          <p className="text-xl mb-8">
            Join thousands of teams already achieving more with our platform.
          </p>
          <Button
            variant="secondary"
            className="px-12 py-6 text-lg"
            onClick={() => router.push("/signup")}
          >
            Start Your Free Trial Today
          </Button>
        </div>
      </div>
    </div>
  );
}
