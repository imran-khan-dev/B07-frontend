import { BlogPost } from "@/types";
import Image from "next/image";
import { format } from "date-fns";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

export default function BlogDetailsCard({ blog }: { blog: BlogPost | null }) {
  if (!blog) {
    return (
      <div className="py-24 text-center text-gray-500">Blog not found.</div>
    );
  }

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Gradient */}
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

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 border border-gray-200/40 dark:border-gray-800/60 rounded-2xl shadow-lg p-6 sm:p-10">
          {/* Title */}
          <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-900 dark:text-white leading-snug">
            {blog.title}
          </h1>

          {/* Author */}
          <div className="flex items-center gap-4 mb-8">
            <Image
              src={
                blog.author.picture ||
                "https://cdn-icons-png.flaticon.com/512/9385/9385289.png"
              }
              alt={blog.author.name}
              width={56}
              height={56}
              className="rounded-full border border-gray-200 dark:border-gray-700 shadow-sm"
            />
            <div>
              <p className="font-semibold text-gray-900 dark:text-gray-100">
                {blog.author.name}
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                <span>{format(blog.createdAt, "PPP")}</span>
              </p>
            </div>
          </div>

          {/* Thumbnail */}
          {blog.thumbnail && (
            <div className="relative h-80 sm:h-96 w-full overflow-hidden rounded-xl mb-10">
              <Image
                src={blog.thumbnail}
                alt={blog.title}
                fill
                className="object-cover rounded-xl transition-transform duration-500 hover:scale-105"
              />
            </div>
          )}

          {/* Tags */}
          {blog.tags?.length > 0 && (
            <div className="flex flex-wrap gap-3 text-xs tracking-wider text-gray-500 dark:text-gray-400 uppercase mb-5">
              {blog.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full bg-gradient-to-r from-blue-600/10 to-purple-600/10 text-blue-600 dark:text-purple-400 border border-blue-500/20 dark:border-purple-400/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {blog.summary && (
            <div className="mb-8 p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-900/50 shadow-md transition-all duration-300">
              <p className="text-lg text-gray-800 dark:text-gray-200 leading-relaxed">
                {blog.summary}
              </p>
            </div>
          )}

          <article className="prose dark:prose-invert prose-lg max-w-none leading-relaxed">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
            >
              {blog.content}
            </ReactMarkdown>
          </article>
        </div>
      </div>
    </section>
  );
}
