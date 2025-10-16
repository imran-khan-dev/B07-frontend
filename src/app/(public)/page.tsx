import { FeaturePost } from "@/components/modules/Home/FeaturePost";
import { FeatureProjects } from "@/components/modules/Home/FeatureProjects";
import Hero from "@/components/modules/Home/Hero";
import { BlogPost, Project } from "@/types";

export const metadata = {
  title: "Home | Imran Khan",
  description:
    "Hello! I'm Imran Khan, a Full-Stack Web Developer. This is my portfolio website",
};

export default async function HomePage() {
  const resBlog = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/blog/get-blogs`,
    { cache: "no-store" }
  );
  const jsonBlog = await resBlog.json().catch(() => ({ data: { data: [] } }));
  const blogs: BlogPost[] = jsonBlog?.data?.data || [];

  const resProject = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/project/get-projects`,
    { cache: "no-store" }
  );
  const jsonProject = await resProject
    .json()
    .catch(() => ({ data: { data: [] } }));
  const projects: Project[] = jsonProject?.data?.data || [];
  return (
    <>
      <Hero />
      <FeaturePost blogs={blogs} />
      <FeatureProjects projects={projects} />
    </>
  );
}
