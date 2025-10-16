import DashboardBlogs from "@/components/modules/Blogs/Dashboard/DashboardBlogs";
import { BlogData } from "@/types";
import React from "react";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Blogs | Imran Khan",
  description: "All Blogs Management of Imran Khan's portfolio",
};

export default async function AllBlogs() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blog/get-blogs`);
  const json = await res.json();

  const blogs: BlogData = json.data;

  return (
    <div className="w-full flex items-center justify-center">
      <DashboardBlogs data={blogs} />
    </div>
  );
}
