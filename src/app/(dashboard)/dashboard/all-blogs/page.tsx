import DashboardBlogs from "@/components/modules/Blogs/Dashboard/DashboardBlogs";
import { BlogPost } from "@/types";
import React from "react";

export default async function AllBlogs() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blog/get-blogs`);
  const { data } = await res.json();
  const blogs: BlogPost[] = data.data;

  return (
    <div className="w-full flex items-center justify-center">
      <DashboardBlogs allblogs={blogs} />
    </div>
  );
}
