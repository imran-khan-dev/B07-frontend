import { AllProjects } from "@/components/modules/Projects/AllProjects";
import { ProjectData } from "@/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | Imran Khan",
  description:
    "Explore my latest web development projects built with modern technologies like React, Next.js, TypeScript, and Tailwind CSS.",
};

// Force dynamic rendering to fetch API at request time
export const dynamic = "force-dynamic";

export default async function AllProjectsPage() {
  let projects: ProjectData = {
    data: [],
    pagination: {
      page: 1,
      limit: 0,
      total: 0,
      totalPages: 0,
    },
  };

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/project/get-projects`
    );

    if (!res.ok) throw new Error("Failed to fetch projects");

    const json = await res.json();
    projects = json.data || projects;
  } catch (err) {
    console.error("Error fetching projects:", err);
  }

  return (
    <div className="w-full flex items-center justify-center">
      <AllProjects data={projects} />
    </div>
  );
}
