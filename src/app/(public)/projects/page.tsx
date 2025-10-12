import { AllProjects } from "@/components/modules/Projects/AllProjects";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | Imran Khan",
  description:
    "Explore my latest web development projects built with modern technologies like React, Next.js, TypeScript, and Tailwind CSS.",
};

const resProject = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/project/all-projects`,
    {
      next: {
        revalidate: 30,
      },
    }
  );

  const {data: projects} = await resProject.json();


const AllProjectsPage = () => {
  return (
    <div>
      <AllProjects projects={projects} />
    </div>
  );
};

export default AllProjectsPage;
