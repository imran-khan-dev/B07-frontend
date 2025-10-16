"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, PlusCircle, LogOut, Menu } from "lucide-react";
import { logout } from "@/actions/logout";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden flex items-center justify-between bg-black text-white p-4 border-b border-gray-700">
        <h1 className="text-lg font-bold">Dashboard</h1>
        <Button
          variant="ghost"
          onClick={() => setIsOpen(!isOpen)}
          className="p-2"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </div>

      {/* Sidebar */}
      <aside
        className={`
          min-h-screen fixed lg:static top-0 left-0 z-50 h-full w-64 bg-black text-white
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0
        `}
      >
        {/* Top navigation */}
        <nav className="flex-1 space-y-2 p-4">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-gray-100 hover:text-black transition"
            onClick={() => setIsOpen(false)}
          >
            <Home className="h-4 w-4" />
            Home
          </Link>

          <Link
            href="/dashboard"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-gray-100 hover:text-black transition"
            onClick={() => setIsOpen(false)}
          >
            <Home className="h-4 w-4" />
            Dashboard
          </Link>

          <Link
            href="/dashboard/create-blog"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-gray-100 hover:text-black transition"
            onClick={() => setIsOpen(false)}
          >
            <PlusCircle className="h-4 w-4" />
            Create Blog
          </Link>

          <Link
            href="/dashboard/all-blogs"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-gray-100 hover:text-black transition"
            onClick={() => setIsOpen(false)}
          >
            <PlusCircle className="h-4 w-4" />
            All Blogs
          </Link>

          <Link
            href="/dashboard/create-project"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-gray-100 hover:text-black transition"
            onClick={() => setIsOpen(false)}
          >
            <PlusCircle className="h-4 w-4" />
            Create Project
          </Link>

          <Link
            href="/dashboard/all-projects"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-gray-100 hover:text-black transition"
            onClick={() => setIsOpen(false)}
          >
            <PlusCircle className="h-4 w-4" />
            All Projects
          </Link>
        </nav>

        {/* Bottom action */}
        <div className="p-4 border-t border-gray-700">
          <form action={logout}>
            <Button
              variant="destructive"
              className="w-full justify-start gap-2 cursor-pointer"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </form>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
