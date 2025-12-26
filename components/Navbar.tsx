"use client";

import Link from "next/link";
import { useAuth } from "@/components/AuthProvider";
import { Menu, X, User as UserIcon } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { user, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-primary text-primary-foreground shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link
              href="/"
              className="font-bold text-2xl font-amiri text-secondary">
              Manhaj.ai
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                href="/"
                className="hover:text-secondary px-3 py-2 rounded-md font-medium">
                Home
              </Link>
              <Link
                href="/scholars"
                className="hover:text-secondary px-3 py-2 rounded-md font-medium">
                Scholars
              </Link>
              <Link
                href="/articles"
                className="hover:text-secondary px-3 py-2 rounded-md font-medium">
                Articles/Ftawa
              </Link>
              {user?.role === "admin" && (
                <Link
                  href="/admin"
                  className="text-secondary hover:text-white px-3 py-2 rounded-md font-medium border border-secondary">
                  Admin Panel
                </Link>
              )}
            </div>
          </div>

          <div className="hidden md:block">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm opacity-80">{user.email}</span>
                <button
                  onClick={signOut}
                  className="bg-secondary text-primary px-4 py-2 rounded hover:bg-secondary/90 font-medium transition-colors">
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  href="/login"
                  className="hover:text-secondary px-3 py-2 rounded-md font-medium">
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="bg-secondary text-primary px-4 py-2 rounded hover:bg-secondary/90 font-medium transition-colors">
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md hover:text-secondary focus:outline-none">
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-primary pb-4">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/"
              className="block hover:text-secondary px-3 py-2 rounded-md font-medium">
              Home
            </Link>
            <Link
              href="/scholars"
              className="block hover:text-secondary px-3 py-2 rounded-md font-medium">
              Scholars
            </Link>
            <Link
              href="/articles"
              className="block hover:text-secondary px-3 py-2 rounded-md font-medium">
              Articles/Ftawa
            </Link>
            {user?.role === "admin" && (
              <Link
                href="/admin"
                className="block text-secondary px-3 py-2 rounded-md font-medium">
                Admin Panel
              </Link>
            )}
          </div>
          <div className="pt-4 pb-3 border-t border-primary-foreground/20">
            {user ? (
              <div className="px-5 space-y-2">
                <div className="flex items-center">
                  <UserIcon className="h-5 w-5 mr-2" />
                  <span className="text-sm font-medium">{user.email}</span>
                </div>
                <button
                  onClick={signOut}
                  className="block w-full text-left bg-secondary text-primary px-3 py-2 rounded-md font-medium">
                  Logout
                </button>
              </div>
            ) : (
              <div className="px-5 space-y-2">
                <Link
                  href="/login"
                  className="block text-center hover:text-secondary border border-transparent hover:border-secondary px-3 py-2 rounded-md font-medium">
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="block text-center bg-secondary text-primary px-3 py-2 rounded-md font-medium">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
