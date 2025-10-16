import { AllBlogs } from "@/components/modules/Blogs/AllBlogs";
import { BlogData } from "@/types";

export const metadata = {
  title: "All Blogs | Imran Khan",
  description:
    "Discover the latest insights and tutorials about modern web development, UI design, and component-driven architecture.",
};

const AllBlogsPage = async () => {
  let blogs: BlogData = {
    data: [],
    pagination: { page: 1, limit: 0, total: 0, totalPages: 0 },
  };

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/blog/get-blogs`
    );
    const json = await res.json();

    // Ensure the structure matches BlogData
    blogs = {
      data: json?.data?.data || [],
      pagination: json?.data?.pagination || { page: 1, total: 0 },
    };
  } catch (err) {
    console.error("Failed to fetch blogs:", err);
  }

  return (
    <div>
      <AllBlogs data={blogs} />
    </div>
  );
};

export default AllBlogsPage;
