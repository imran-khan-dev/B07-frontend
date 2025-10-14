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
import { Card } from "@/components/ui/card";
import dynamic from "next/dynamic";
import "@uiw/react-md-editor/markdown-editor.css";
import { toast } from "react-hot-toast";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

const formSchema = z.object({
  title: z
    .string()
    .min(25, { message: "Title must be at least 25 characters long." }),
  description: z.string().min(1, { message: "Description is required." }),
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
  liveUrl: z.string().optional(),
  repoUrl: z.string().optional(),
  features: z
    .array(z.string())
    .min(2, { message: "At least 2 features required." }),
});

export function CreateProjectForm() {
  const [isPublishing, setIsPublishing] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      thumbnail: undefined,
      liveUrl: "",
      repoUrl: "",
      features: [],
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsPublishing(true);
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      if (data.thumbnail) formData.append("file", data.thumbnail);
      if (data.liveUrl) formData.append("liveUrl", data.liveUrl);
      if (data.repoUrl) formData.append("repoUrl", data.repoUrl);
      formData.append("features", JSON.stringify(data.features));
      formData.append("ownerId", "1");

      const res = await fetch(`/api/proxy/project/create-project`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData?.message || "Failed to create project");
      }

      const result = await res.json();
      toast.success("Project created successfully!");
      console.log("Project created:", result);
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
            Create a New Project
          </h2>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Project Title */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter project title..." {...field} />
                    </FormControl>
                    <FormDescription>
                      A clear and descriptive title for your project.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <MDEditor
                        value={field.value || ""}
                        onChange={(val) => field.onChange(val || "")}
                        height={300}
                      />
                    </FormControl>
                    <FormDescription>
                      A short preview that appears in project cards.
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
                        onChange={(e) =>
                          field.onChange(e.target.files?.[0] || undefined)
                        }
                      />
                    </FormControl>
                    <FormDescription>
                      Image shown as the project cover.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Live URL */}
              <FormField
                control={form.control}
                name="liveUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Live Project URL</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter live URL..." {...field} />
                    </FormControl>
                    <FormDescription>
                      The live demo link of your project.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Repository URL */}
              <FormField
                control={form.control}
                name="repoUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Repository URL</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter repository URL..." {...field} />
                    </FormControl>
                    <FormDescription>
                      GitHub or GitLab repository link.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Features */}
              <FormField
                control={form.control}
                name="features"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Features (comma separated)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="react, typescript, tailwind"
                        value={field.value.join(", ")}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value.split(",").map((tag) => tag.trim())
                          )
                        }
                      />
                    </FormControl>
                    <FormDescription>
                      Minimum 2 features required.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <div className="pt-4 text-center">
                <Button
                  type="submit"
                  className="px-8 py-2.5 font-semibold text-sm rounded-md bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90 transition-all"
                  disabled={isPublishing}
                >
                  {isPublishing ? "Publishing..." : "Publish Project"}
                </Button>
              </div>
            </form>
          </Form>
        </Card>
      </div>
    </section>
  );
}
