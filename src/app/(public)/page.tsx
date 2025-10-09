import { FeaturePost } from "@/components/modules/Home/FeaturePost";
import { FeatureProjects } from "@/components/modules/Home/FeatureProjects";
import Hero from "@/components/modules/Home/Hero";
import { BlogPost } from "@/types";

export default async function HomePage() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/blog/get-blogs`,
    {
      next: {
        revalidate: 30,
      },
    }
  );
  const { data } = await res.json();
  const blogs: BlogPost[] = data.data;
  return (
    <>
      <Hero />
      <FeaturePost blogs={blogs} />
      <FeatureProjects />
    </>
  );
}
