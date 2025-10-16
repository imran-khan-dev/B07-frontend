import { AllBlogs } from "@/components/modules/Blogs/AllBlogs";
import { BlogData } from "@/types";

export const metadata = {
  title: "All Blogs | Imran Khan",
  description:
    "Discover the latest insights and tutorials about modern web development, UI design, and component-driven architecture.",
};

export const revalidate = 30;

const AllBlogsPage = async () => {
  let blogs: BlogData = {
    data: [],
    pagination: { page: 1, limit: 0, total: 0, totalPages: 0 },
  };

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/blog/get-blogs`,
      {
        next: { revalidate: 30 },
      }
    );
    const json = await res.json();
    blogs = {
      data: json?.data?.data || [],
      pagination: json?.data?.pagination || {
        page: 1,
        limit: 0,
        total: 0,
        totalPages: 0,
      },
    };
  } catch (err) {
    console.error("Failed to fetch blogs:", err);
  }

  return <AllBlogs data={blogs} />;
};

export default AllBlogsPage;
