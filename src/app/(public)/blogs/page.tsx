import { AllBlogs } from "@/components/modules/Blogs/AllBlogs";
import { BlogData } from "@/types";

export const metadata = {
  title: "All Blogs | Imran Khan",
  description:
    "Discover the latest insights and tutorials about modern web development, UI design, and component-driven architecture.",
};

const AllBlogsPage = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blog/get-blogs`);
  const json = await res.json();

  const blogs: BlogData = json.data;

  return (
    <div>
      <AllBlogs data={blogs} />
    </div>
  );
};

export default AllBlogsPage;
