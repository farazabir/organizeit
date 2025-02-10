"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ArrowRightIcon,
  UsersIcon,
  ChartBarIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

export default function Home() {
  const [animate, setAnimate] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 100); // Delay to ensure smooth entry
    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      title: "Real-time Collaboration",
      icon: UsersIcon,
      description: "Work simultaneously with team members across the globe",
    },
    {
      title: "Advanced Analytics",
      icon: ChartBarIcon,
      description: "Track progress with detailed reports and insights",
    },
    {
      title: "Time Tracking",
      icon: ClockIcon,
      description: "Monitor project timelines and individual contributions",
    },
  ];

  const faqs = [
    {
      question: "What industries do you specialize in?",
      answer:
        "We serve clients across various sectors including fintech, healthcare, e-commerce, and SaaS. Our solutions are tailored to meet industry-specific requirements while maintaining scalability and compliance.",
    },
    {
      question: "How do you ensure data security?",
      answer:
        "We implement enterprise-grade security measures including end-to-end encryption, regular audits, and compliance with GDPR and SOC2 standards. All data is stored in secure, geographically redundant servers.",
    },
    {
      question: "What is your implementation timeline?",
      answer:
        "Typical projects range from 4-12 weeks depending on complexity. We follow an agile methodology with bi-weekly sprints and continuous client feedback to ensure timely delivery.",
    },
    {
      question: "Do you offer ongoing support?",
      answer:
        "Yes, we provide 24/7 technical support with SLAs starting at 99.9% uptime. Our support packages include regular updates, performance optimization, and dedicated account management.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={animate ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Transform Your
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              {" "}
              Workflow
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Streamline projects, enhance collaboration, and achieve
            unprecedented productivity with our all-in-one platform.
          </p>
          <div className="flex justify-center space-x-4">
            <Button
              className="px-8 py-6 text-lg"
              onClick={() => router.push("/playground")}
            >
              Start Free Trial <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" className="px-8 py-6 text-lg">
              Watch Demo
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9, y: 50 }} // Start with scale and slide
              animate={animate ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: index * 0.2,
                type: "spring",
                stiffness: 200,
              }}
              className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow"
            >
              <feature.icon className="h-12 w-12 text-blue-600 dark:text-blue-400 mb-6" />
              <h3 className="text-xl font-semibold mb-4 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-blue-600 dark:bg-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {["500K+", "98%", "150+"].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={animate ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.3 }}
                className="space-y-2"
              >
                <div className="text-4xl font-bold">{stat}</div>
                <div className="text-blue-100">
                  {
                    [
                      "Projects Managed",
                      "Customer Satisfaction",
                      "Countries Served",
                    ][index]
                  }
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-3xl font-bold mb-6 dark:text-white">
          Simple, Transparent Pricing
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          Choose the plan that&apos;s right for you.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {["Free", "Pro", "Business"].map((plan, index) => (
            <motion.div
              key={plan}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={animate ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.3 }}
              className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md"
            >
              <h3 className="text-2xl font-bold mb-4 dark:text-white">
                {plan}
              </h3>
              <div className="text-4xl font-bold mb-6 dark:text-white">
                ${[0, 20, 99][index]}
                <span className="text-lg">/month</span>
              </div>
              <Button
                className="w-full py-4 text-lg"
                onClick={() => router.push("/pricing")}
              >
                View Full Pricing
              </Button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-gray-50 dark:bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">
            Frequently Asked Questions
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={animate ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.3 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm transition-all hover:shadow-md"
              >
                <dt className="text-lg font-semibold text-gray-900 dark:text-white">
                  {faq.question}
                </dt>
                <dd className="mt-2 text-gray-600 dark:text-gray-300">
                  {faq.answer}
                </dd>
              </motion.div>
            ))}
          </div>
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

      {/* Call to Action Section */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-800 dark:to-cyan-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Transform Your Workflow?
          </h2>
          <p className="text-xl mb-8">
            Join thousands of teams already achieving more with OrganizeIt
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
