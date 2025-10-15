import { AllProjects } from "@/components/modules/Projects/AllProjects";
import { ProjectData } from "@/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | Imran Khan",
  description:
    "Explore my latest web development projects built with modern technologies like React, Next.js, TypeScript, and Tailwind CSS.",
};

const res = await fetch(
  `${process.env.NEXT_PUBLIC_BASE_API}/project/get-projects`
);
const json = await res.json();

const projects: ProjectData = json.data;

const AllProjectsPage = () => {
  return (
    <div>
      <AllProjects data={projects} />
    </div>
  );
};

export default AllProjectsPage;
