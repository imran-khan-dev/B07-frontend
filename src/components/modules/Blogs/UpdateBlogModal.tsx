/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";
import dynamic from "next/dynamic";
import { toast } from "react-hot-toast";
import { useState } from "react";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

const formSchema = z.object({
  title: z
    .string()
    .min(25, { message: "Title must be at least 25 characters long." }),
  content: z.string(),
  summary: z.string().optional(),
  thumbnail: z
    .instanceof(File)
    .optional()
    .refine(
      (file) => !file || file.size <= 5 * 1024 * 1024,
      "File size must be less than 5MB."
    )
    .refine(
      (file) =>
        !file || ["image/jpeg", "image/png", "image/webp"].includes(file.type),
      "Only JPEG, PNG, or WEBP images are allowed."
    ),
  isFeatured: z.boolean(),
  tags: z
    .array(z.string())
    .min(2, { message: "At least 2 tags are required." }),
});

interface UpdateBlogModalProps {
  isOpen: boolean;
  onClose: () => void;
  blog: any;
  onUpdated?: (updated: any) => void;
}

export function UpdateBlogModal({
  isOpen,
  onClose,
  blog,
  onUpdated,
}: UpdateBlogModalProps) {
  const [isUpdating, setIsUpdating] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: blog?.title || "",
      content: blog?.content || "",
      summary: blog?.summary || "",
      thumbnail: undefined,
      isFeatured: blog?.isFeatured || false,
      tags: blog?.tags || [],
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsUpdating(true);
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("content", data.content);
      if (data.summary) formData.append("summary", data.summary);
      if (data.thumbnail) formData.append("file", data.thumbnail);
      formData.append("isFeatured", String(data.isFeatured));
      formData.append("tags", JSON.stringify(data.tags));

      const res = await fetch(`/api/proxy/blog/update-blog/${blog.id}`, {
        method: "PATCH",
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData?.message || "Failed to update blog");
      }

      const result = await res.json();
      toast.success("Blog updated successfully!");
      onUpdated?.(result.data);
      onClose();
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Something went wrong");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto w-[95vw] sm:max-w-2xl md:max-w-4xl scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
        <DialogHeader>
          <DialogTitle>Update Blog</DialogTitle>
        </DialogHeader>

        <Card className="border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-black/40 backdrop-blur-md shadow-md p-6 rounded-2xl">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Title */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Blog Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter blog title..." {...field} />
                    </FormControl>
                    <FormDescription>
                      A clear and descriptive title for your blog post.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Summary */}
              <FormField
                control={form.control}
                name="summary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Summary</FormLabel>
                    <FormControl>
                      <MDEditor
                        value={field.value || ""}
                        onChange={field.onChange}
                        height={300}
                      />
                    </FormControl>
                    <FormDescription>
                      A short preview that appears in blog cards.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Content */}
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <MDEditor
                        value={field.value || ""}
                        onChange={field.onChange}
                        height={300}
                      />
                    </FormControl>
                    <FormDescription>
                      Main content of your blog post.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Thumbnail */}
              <FormField
                control={form.control}
                name="thumbnail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Thumbnail</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => field.onChange(e.target.files?.[0])}
                      />
                    </FormControl>
                    <FormDescription>
                      Upload a new thumbnail to replace the existing one.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Tags */}
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tags (comma separated)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="react, typescript, ui"
                        value={field.value.join(", ")}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value.split(",").map((tag) => tag.trim())
                          )
                        }
                      />
                    </FormControl>
                    <FormDescription>Minimum 2 tags required.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Featured */}
              <FormField
                control={form.control}
                name="isFeatured"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>Feature this Blog</FormLabel>
                      <FormDescription>
                        Mark this post as featured to display on the homepage.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="pt-4 text-center">
                <Button
                  type="submit"
                  disabled={isUpdating}
                  className="px-8 py-2.5 font-semibold text-sm rounded-md bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90 transition-all"
                >
                  {isUpdating ? "Updating..." : "Update"}
                </Button>
              </div>
            </form>
          </Form>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
