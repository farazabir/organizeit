"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useAuthStore } from "@/stores/authStore";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { user, logout } = useAuthStore();

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark", !isDarkMode);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm sticky top-0 z-50 border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              href="/home"
              className="text-xl font-bold text-primary hover:text-primary/90 transition-colors dark:text-white dark:hover:text-white/90"
            >
              OrganizeIt
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            <NavigationMenu className="flex space-x-6">
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/about"
                  className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors dark:text-gray-300 dark:hover:text-white"
                >
                  About
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/services"
                  className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors dark:text-gray-300 dark:hover:text-white"
                >
                  Services
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/contact"
                  className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors dark:text-gray-300 dark:hover:text-white"
                >
                  Contact
                </NavigationMenuLink>
              </NavigationMenuItem>
              {user ? (
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="/profile"
                    className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors dark:text-gray-300 dark:hover:text-white"
                  >
                    Profile
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ) : (
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="/login"
                    className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors dark:text-gray-300 dark:hover:text-white"
                  >
                    Login
                  </NavigationMenuLink>
                </NavigationMenuItem>
              )}
              {user ? (
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="/"
                    onClick={logout}
                    className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors dark:text-gray-300 dark:hover:text-white"
                  >
                    Logout
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ) : (
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="/signup"
                    className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors dark:text-gray-300 dark:hover:text-white"
                  >
                    Signup
                  </NavigationMenuLink>
                </NavigationMenuItem>
              )}
            </NavigationMenu>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5 text-foreground/80 dark:text-gray-300" />
              ) : (
                <Moon className="h-5 w-5 text-foreground/80 dark:text-gray-300" />
              )}
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex lg:hidden items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5 text-foreground/80 dark:text-gray-300" />
              ) : (
                <Moon className="h-5 w-5 text-foreground/80 dark:text-gray-300" />
              )}
            </button>
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5 text-foreground/80 dark:text-gray-300" />
              ) : (
                <Menu className="h-5 w-5 text-foreground/80 dark:text-gray-300" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-2 pb-4">
            <NavigationMenu className="flex flex-col space-y-2">
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/about"
                  onClick={closeMenu}
                  className="block px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
                >
                  About
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/services"
                  onClick={closeMenu}
                  className="block px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
                >
                  Services
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/contact"
                  onClick={closeMenu}
                  className="block px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
                >
                  Contact
                </NavigationMenuLink>
              </NavigationMenuItem>
              {user ? (
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="/profile"
                    onClick={closeMenu}
                    className="block px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
                  >
                    Profile
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ) : (
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="/login"
                    onClick={closeMenu}
                    className="block px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
                  >
                    Login
                  </NavigationMenuLink>
                </NavigationMenuItem>
              )}
              {user ? (
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="/"
                    onClick={() => {
                      closeMenu();
                      logout();
                    }}
                    className="block px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
                  >
                    Logout
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ) : (
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="/signup"
                    onClick={closeMenu}
                    className="block px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
                  >
                    Signup
                  </NavigationMenuLink>
                </NavigationMenuItem>
              )}
            </NavigationMenu>
          </div>
        )}
      </div>
    </nav>
  );
}
