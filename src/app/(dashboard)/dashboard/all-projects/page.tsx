import DashboardProjects from "@/components/modules/Projects/Dashboard/DashboardProjects";
import { ProjectData } from "@/types";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "All Projects | Imran Khan",
  description: "All Projects management of Imran Khan's portfolio",
};

export default async function AllProjects() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/project/get-projects`
  );
  const json = await res.json();

  const projects: ProjectData = json.data;

  return (
    <div className="w-full flex items-center justify-center">
      <DashboardProjects data={projects} />
    </div>
  );
}
