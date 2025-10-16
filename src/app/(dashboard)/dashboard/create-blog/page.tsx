import { CreateBlogForm } from "@/components/modules/Blogs/CreateBlogForm";
import { Metadata } from "next";
import React from "react";

export const metadata:Metadata = {
  title: "Create Blog | Imran Khan",
  description:
    "Create blog section of Imran Khan's portfolio",
};

const CreateBlog = () => {
  return (
    <div className="w-full flex items-center justify-center">
      <CreateBlogForm />
    </div>
  );
};

export default CreateBlog;
