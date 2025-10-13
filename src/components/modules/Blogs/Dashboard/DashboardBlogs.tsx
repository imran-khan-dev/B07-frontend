/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Trash2, Edit2 } from "lucide-react";
import { UpdateBlogModal } from "../UpdateBlogModal";
import { BlogPost } from "@/types";
import { toast } from "react-hot-toast";

interface DashboardBlogsProps {
  allblogs: BlogPost[];
}

export default function DashboardBlogs({ allblogs }: DashboardBlogsProps) {
  const [blogs, setBlogs] = useState<BlogPost[]>(allblogs);
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const [deleteBlogId, setDeleteBlogId] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const handleDelete = async () => {
    if (!deleteBlogId) return;

    const originalBlogs = [...blogs];
    setBlogs((prev) => prev.filter((b) => b.id !== deleteBlogId));
    setIsDeleteModalOpen(false);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API}/blog/delete/${deleteBlogId}`,
        { method: "DELETE" }
      );

      if (!res.ok) throw new Error("Failed to delete blog");

      toast.success("Blog deleted successfully");
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");

      setBlogs(originalBlogs);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
        All Blogs
      </h1>

      {/* Blog List */}
      <div className="space-y-4">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <Card
              key={blog.id}
              className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center p-4 sm:p-6 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Thumbnail */}
              {blog.thumbnail && (
                <img
                  src={blog.thumbnail}
                  alt={blog.title}
                  className="w-full sm:w-32 h-32 object-cover rounded-lg border border-gray-200 dark:border-gray-700"
                />
              )}

              {/* Blog Info */}
              <div className="flex-1 w-full">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {blog.title}
                  </h2>

                  {/* Featured Badge */}
                  {blog.isFeatured && (
                    <span className="ml-2 px-3 py-1 text-xs font-semibold bg-yellow-100 text-yellow-700 rounded-full border border-yellow-300">
                      Featured
                    </span>
                  )}
                </div>

                <p className="text-gray-600 dark:text-gray-400 text-sm mt-1 line-clamp-2">
                  {blog.summary}
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">
                  By{" "}
                  {typeof blog.author === "object"
                    ? blog.author.name
                    : blog.author || "Unknown"}{" "}
                  • {new Date(blog.createdAt).toLocaleDateString()} •{" "}
                  {blog.views ?? 0} views
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-2 mt-4 sm:mt-0">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedBlog(blog);
                    setIsUpdateModalOpen(true);
                  }}
                  className="flex items-center gap-1"
                >
                  <Edit2 className="w-4 h-4" /> Update
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => {
                    setDeleteBlogId(blog.id);
                    setIsDeleteModalOpen(true);
                  }}
                  className="flex items-center gap-1"
                >
                  <Trash2 className="w-4 h-4" /> Delete
                </Button>
              </div>
            </Card>
          ))
        ) : (
          <p className="text-gray-500 dark:text-gray-400 text-center">
            No blogs available.
          </p>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this blog? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Update Blog Modal */}
      {selectedBlog && (
        <UpdateBlogModal
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          blog={selectedBlog}
          onUpdated={(updated) => {
            setBlogs((prev) =>
              prev.map((b) => (b.id === updated.id ? updated : b))
            );
          }}
        />
      )}
    </div>
  );
}
