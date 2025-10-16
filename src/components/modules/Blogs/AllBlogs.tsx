"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { BlogData, BlogPost } from "@/types";
import { format } from "date-fns";
import Loading from "@/components/ui/Loading";

interface AllBlogsProps {
  data: BlogData;
}

export default function AllBlogs({ data }: AllBlogsProps) {
  const [blogs, setBlogs] = useState<BlogPost[]>(data.data);
  const [pagination, setPagination] = useState(data.pagination);
  const [loading, setLoading] = useState(false);

  const fetchBlogs = async (page: number) => {
    try {
      setLoading(true);
      const res = await fetch(
        `/api/proxy/blog/get-blogs?page=${page}&limit=${pagination.limit}`
      );
      const json = await res.json();
      const updatedData: BlogData = json.data;

      setBlogs(updatedData.data);
      setPagination(updatedData.pagination);
    } catch (err) {
      console.error("Failed to fetch blogs:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleNextPage = () => {
    if (pagination.page < pagination.totalPages) {
      fetchBlogs(pagination.page + 1);
    }
  };

  const handlePrevPage = () => {
    if (pagination.page > 1) {
      fetchBlogs(pagination.page - 1);
    }
  };

  return (
    <section className="relative overflow-hidden py-18 mx-auto">
      {/* Background gradient */}
      <div
        className="absolute inset-0 z-0 dark:hidden"
        style={{
          background:
            "linear-gradient(to bottom, #3b82f6 0%, #ffffff 40%, #ffffff 60%, #3b82f6 100%)",
        }}
      />
      <div
        className="absolute inset-0 z-0 hidden dark:block"
        style={{
          background:
            "linear-gradient(to bottom, #010133 0%, #000000 40%, #000000 60%, #010133 100%)",
        }}
      />

      <div className="mx-auto container relative z-10 flex flex-col items-center gap-16">
        {/* Header */}
        <div className="text-center">
          <h2 className="mx-auto mb-6 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl lg:max-w-3xl">
            All Blogs
          </h2>
          <p className="mx-auto max-w-2xl text-gray-600 dark:text-gray-300 md:text-lg">
            Discover the latest insights and tutorials about modern web
            development, UI design, and component-driven architecture.
          </p>
        </div>

        {/* Blog Cards */}
        {loading ? (
          <Loading />
        ) : blogs.length > 0 ? (
          <div className="w-full flex flex-col items-center gap-10 sm:gap-12 md:gap-14 lg:gap-16 px-4 sm:px-6 lg:px-8">
            {blogs.map((post) => (
              <Card
                key={post.id}
                className="w-full max-w-5xl border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-black/30 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl p-5 sm:p-7 lg:p-10"
              >
                <div className="flex flex-col md:flex-row gap-6 md:gap-10 lg:gap-14 items-start">
                  {/* Image Section */}
                  <div className="w-full md:w-1/2">
                    <a
                      href={`/blogs/${post.id}`}
                      target="_blank"
                      className="block"
                    >
                      <div className="aspect-[16/10] overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
                        <img
                          src={
                            post.thumbnail ||
                            "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg"
                          }
                          alt={post.title}
                          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                      </div>
                    </a>
                  </div>

                  {/* Text Section */}
                  <div className="w-full md:w-1/2">
                    <div className="mb-3 md:mb-4 flex flex-wrap gap-2 text-xs tracking-wider text-gray-500 dark:text-gray-400 uppercase">
                      {post.tags?.map((tag: string) => (
                        <span
                          key={tag}
                          className="px-2 py-1 rounded-full bg-gradient-to-r from-blue-600/10 to-purple-600/10 text-blue-600 dark:text-purple-400 border border-blue-500/20 dark:border-purple-400/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-900 dark:text-white leading-snug">
                      <a
                        href={`/blogs/${post.id}`}
                        target="_blank"
                        className="hover:text-blue-600 dark:hover:text-purple-400 transition-colors"
                      >
                        {post.title}
                      </a>
                    </h3>

                    <p className="mt-3 text-gray-600 dark:text-gray-300 text-sm sm:text-base lg:text-lg leading-relaxed line-clamp-3">
                      {post.summary}
                    </p>

                    <div className="mt-4 flex items-center space-x-3 text-xs sm:text-sm lg:text-base text-gray-500 dark:text-gray-400">
                      <span>{post.author.name}</span>
                      <span>•</span>
                      <span>{format(new Date(post.createdAt), "PPP")}</span>
                    </div>

                    <div className="mt-5">
                      <a
                        href={`/blogs/${post.id}`}
                        target="_blank"
                        className="inline-flex items-center font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:underline text-sm sm:text-base lg:text-lg"
                      >
                        <span>Read more</span>
                        <ArrowRight className="ml-2 size-4 text-blue-600 dark:text-purple-400 transition-transform group-hover:translate-x-1" />
                      </a>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 dark:text-gray-400 text-center">
            No blogs available.
          </p>
        )}

        {/* Pagination Controls */}
        {pagination.totalPages > 1 && (
          <div className="flex justify-center mt-10">
            <div className="flex items-center gap-2 sm:gap-3 bg-white/80 dark:bg-black/40 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-full shadow-md px-3 sm:px-5 py-2">
              {/* Prev */}
              <button
                onClick={handlePrevPage}
                disabled={pagination.page === 1}
                className={`px-3 py-1.5 rounded-full text-sm sm:text-base font-medium transition-all ${
                  pagination.page === 1
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-blue-600 dark:text-purple-400 hover:bg-blue-600 hover:text-white dark:hover:bg-purple-400 dark:hover:text-black"
                }`}
              >
                Prev
              </button>

              {/* Page Numbers */}
              <div className="flex items-center gap-1 sm:gap-2">
                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
                  .slice(
                    Math.max(0, pagination.page - 3),
                    Math.min(pagination.totalPages, pagination.page + 2)
                  )
                  .map((pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => fetchBlogs(pageNum)}
                      className={`w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full text-sm font-semibold transition-all ${
                        pageNum === pagination.page
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md"
                          : "text-gray-700 dark:text-gray-300 hover:bg-blue-600 hover:text-white dark:hover:bg-purple-400 dark:hover:text-black"
                      }`}
                    >
                      {pageNum}
                    </button>
                  ))}
              </div>

              {/* Next */}
              <button
                onClick={handleNextPage}
                disabled={pagination.page === pagination.totalPages}
                className={`px-3 py-1.5 rounded-full text-sm sm:text-base font-medium transition-all ${
                  pagination.page === pagination.totalPages
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-blue-600 dark:text-purple-400 hover:bg-blue-600 hover:text-white dark:hover:bg-purple-400 dark:hover:text-black"
                }`}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export { AllBlogs };
