import BlogDetailsCard from "@/components/modules/Blogs/BlogDetailsCard";

const BlogDetailsPage = async ({
  params,
}: {
  params: Promise<{ blogId: string }>;
}) => {
  const { blogId } = await params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blog/${blogId}`);

  const { data: blog } = await res.json();

  return (
    <>
      <BlogDetailsCard blog={blog} />
    </>
  );
};

export default BlogDetailsPage;
