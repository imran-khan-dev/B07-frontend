import DashboardProjects from "@/components/modules/Projects/Dashboard/DashboardProjects";
import { Project } from "@/types";
import React from "react";

export default async function AllBlogs() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/project/get-projects`
  );
  const { data } = await res.json();
  console.log("1", data);

  const projects: Project[] = data.data;

  return (
    <div className="w-full flex items-center justify-center">
      <DashboardProjects allprojects={projects} />
    </div>
  );
}
