import { FeaturePost } from "@/components/modules/Home/FeaturePost";
import { FeatureProjects } from "@/components/modules/Home/FeatureProjects";
import Hero from "@/components/modules/Home/Hero";
import { BlogPost } from "@/types";

export const metadata = {
  title: "Home | Imran Khan",
  description:
    "Hello! I'm Imran Khan, a Full-Stack Web Developer. This is my portfolio website",
};

export default async function HomePage() {
  const resBlog = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/blog/get-blogs`,
    {
      next: {
        revalidate: 30,
      },
    }
  );
  const { data } = await resBlog.json();
  const blogs: BlogPost[] = data.data;

  const resProject = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/project/all-projects`,
    {
      next: {
        revalidate: 30,
      },
    }
  );

  const {data: projects} = await resProject.json();

  return (
    <>
      <Hero />
      <FeaturePost blogs={blogs} />
      <FeatureProjects projects={projects} />
    </>
  );
}
