/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
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
import "@uiw/react-md-editor/markdown-editor.css";
import { toast } from "react-hot-toast";

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

export function CreateBlogForm() {
  const [isPublishing, setIsPublishing] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      summary: "",
      thumbnail: undefined,
      isFeatured: false,
      tags: [],
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsPublishing(true);
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("content", data.content);
      if (data.summary) formData.append("summary", data.summary);
      if (data.thumbnail) formData.append("file", data.thumbnail);
      formData.append("isFeatured", String(data.isFeatured));
      formData.append("tags", JSON.stringify(data.tags));
      formData.append("authorId", JSON.stringify(1));

      const res = await fetch("/api/proxy/blog/create-blog", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData?.message || "Failed to create blog");
      }

      const result = await res.json();
      toast.success("Blog created successfully!");
      console.log("Blog created:", result);
      form.reset();
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Something went wrong");
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <section className="w-7xl py-14 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <Card className="border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-black/40 backdrop-blur-md shadow-md hover:shadow-lg transition-all duration-300 p-8 rounded-2xl max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-gray-900 dark:text-white text-center">
            Create a New Blog
          </h2>

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
                    <FormLabel>Thumbnail Image</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => field.onChange(e.target.files?.[0])}
                      />
                    </FormControl>
                    <FormDescription>
                      Image shown as the blog cover.
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

              {/* Is Featured */}
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
                  className="px-8 py-2.5 font-semibold text-sm rounded-md bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90 transition-all"
                  disabled={isPublishing}
                >
                  {isPublishing ? "Publishing..." : "Publish Blog"}
                </Button>
              </div>
            </form>
          </Form>
        </Card>
      </div>
    </section>
  );
}
