import { AllBlogs } from "@/components/modules/Blogs/AllBlogs";
import { BlogPost } from "@/types";

export const metadata = {
  title: "All Blogs | Imran Khan",
  description:
    "Discover the latest insights and tutorials about modern web development, UI design, and component-driven architecture.",
};

const AllBlogsPage = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/blog/get-blogs`,
    {
      next: {
        revalidate: 30,
      },
    }
  );
  const { data } = await res.json();
  const blogs: BlogPost[] = data.data;
  return (
    <div>
      <AllBlogs blogs={blogs} />
    </div>
  );
};

export default AllBlogsPage;
