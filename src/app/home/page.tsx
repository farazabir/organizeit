"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ArrowRightIcon,
  CheckIcon,
  UsersIcon,
  ChartBarIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

export default function Home() {
  const [animate, setAnimate] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 1);
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

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Project Manager",
      text: "OrganizeIt transformed how we manage complex projects.",
    },
    {
      name: "Michael Chen",
      role: "Startup Founder",
      text: "The intuitive interface boosted our team's productivity by 40%.",
    },
    {
      name: "Emma Wilson",
      role: "CTO",
      text: "Best project management solution we've ever used.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
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
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <feature.icon className="h-12 w-12 text-blue-600 dark:text-blue-400 mb-6" />
              <h3 className="text-xl font-semibold mb-4 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-blue-600 dark:bg-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold">500K+</div>
              <div className="text-blue-100">Projects Managed</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold">98%</div>
              <div className="text-blue-100">Customer Satisfaction</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold">150+</div>
              <div className="text-blue-100">Countries Served</div>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">
          Simple, Transparent Pricing
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {["Starter", "Professional", "Enterprise"].map((plan, index) => (
            <div
              key={plan}
              className={`p-8 rounded-xl ${
                index === 1
                  ? "bg-blue-600 text-white dark:bg-blue-800"
                  : "bg-white dark:bg-gray-800"
              } 
              shadow-lg hover:transform hover:scale-105 transition-all`}
            >
              <h3 className="text-2xl font-bold mb-4 dark:text-white">
                {plan}
              </h3>
              <div className="text-4xl font-bold mb-6 dark:text-white">
                ${[29, 59, 99][index]}
                <span className="text-lg">/month</span>
              </div>
              <ul className="space-y-4 mb-8">
                {[
                  "Unlimited Projects",
                  "Team Members",
                  "Storage",
                  "Premium Support",
                ].map((item, i) => (
                  <li
                    key={item}
                    className="flex items-center dark:text-gray-300"
                  >
                    <CheckIcon
                      className={`h-5 w-5 mr-2 ${
                        index === 1
                          ? "text-white"
                          : "text-blue-600 dark:text-blue-400"
                      }`}
                    />
                    {item} {i === 3 && index === 0 && "(Business hours)"}
                  </li>
                ))}
              </ul>
              <Button
                variant={index === 1 ? "secondary" : "default"}
                className="w-full py-6 text-lg"
                onClick={() => router.push("/signup")}
              >
                Get Started
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-gray-50 dark:bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">
            Trusted by Industry Leaders
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm"
              >
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {testimonial.text}
                </p>
                <div className="font-semibold dark:text-white">
                  {testimonial.name}
                </div>
                <div className="text-gray-500 dark:text-gray-400 text-sm">
                  {testimonial.role}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

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

      {/* Footer */}
    </div>
  );
}
