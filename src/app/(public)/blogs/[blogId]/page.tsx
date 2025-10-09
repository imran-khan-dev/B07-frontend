import BlogDetailsCard from "@/components/modules/Blogs/BlogDetailsCard";
import { BlogPost } from "@/types";

export const generateStaticParams = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blogs`, {
    next: { revalidate: 60 },
  });

  const result = await res.json();
  const blogs: BlogPost[] = result?.data?.data || [];

  return blogs.slice(0, 3).map((blog) => ({
    blogId: String(blog.id),
  }));
};

const BlogDetailsPage = async ({ params }: { params: { blogId: string } }) => {
  const { blogId } = params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/blog/${blogId}`,
    {
      next: {
        revalidate: 30,
      },
    }
  );

  const { data: blog } = await res.json();

  return (
    <>
      <BlogDetailsCard blog={blog} />
    </>
  );
};

export default BlogDetailsPage;
