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
import { Card } from "@/components/ui/card";
import dynamic from "next/dynamic";
import { toast } from "react-hot-toast";
import { useState } from "react";

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

interface UpdateBlogModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: any;
  onUpdated?: (updated: any) => void;
}

export function UpdateProjectModal({
  isOpen,
  onClose,
  project,
  onUpdated,
}: UpdateBlogModalProps) {
  const [isUpdating, setIsUpdating] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: project?.title || "",
      description: project?.description || "",
      thumbnail: undefined,
      features: project?.features || [],
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsUpdating(true);
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      if (data.thumbnail) formData.append("file", data.thumbnail);
      if (data.liveUrl) formData.append("liveUrl", data.liveUrl);
      if (data.repoUrl) formData.append("repoUrl", data.repoUrl);
      formData.append("features", JSON.stringify(data.features));

      const res = await fetch(`/api/proxy/project/update-project/${project.id}`, {
        method: "PATCH",
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData?.message || "Failed to update project");
      }

      const result = await res.json();
      toast.success("Project updated successfully!");
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

        <Card className="border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-black/40 backdrop-blur-md shadow-md hover:shadow-lg transition-all duration-300 p-8 rounded-2xl max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-gray-900 dark:text-white text-center">
            Update Project
          </h2>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Title */}
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
                    <FormLabel>Summary</FormLabel>
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

              {/* Live Url */}
              <FormField
                control={form.control}
                name="liveUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Live URL</FormLabel>
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

              {/* Repo Url */}
              <FormField
                control={form.control}
                name="repoUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Repo URL</FormLabel>
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
                        placeholder="react, typescript, ui"
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

              <div className="pt-4 text-center">
                <Button
                  type="submit"
                  disabled={isUpdating}
                  className="px-8 py-2.5 font-semibold text-sm rounded-md bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90 transition-all"
                >
                  {isUpdating ? "Updating....." : "Update"}
                </Button>
              </div>
            </form>
          </Form>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
