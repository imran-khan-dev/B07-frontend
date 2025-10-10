import { AllProjects } from "@/components/modules/Projects/AllProjects";
import { Metadata } from "next";

export const metadata:Metadata = {
  title: "Projects | Imran Khan",
  description:
    "Explore my latest web development projects built with modern technologies like React, Next.js, TypeScript, and Tailwind CSS.",
};

const AllProjectsPage = () => {
  return (
    <div>
      <AllProjects />
    </div>
  );
};

export default AllProjectsPage;
