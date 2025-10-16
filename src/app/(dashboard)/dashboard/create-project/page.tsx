import { CreateProjectForm } from "@/components/modules/Projects/CreateProject";
import { Metadata } from "next";
import React from "react";

export const metadata:Metadata = {
  title: "Create Project | Imran Khan",
  description:
    "Create Project section of Imran Khan's portfolio",
};

export default function CreateProject() {
  return (
    <div className="w-full flex items-center justify-center">
      <CreateProjectForm />
    </div>
  );
}
