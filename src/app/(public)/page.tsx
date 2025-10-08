import { FeaturePost } from "@/components/modules/Home/FeaturePost";
import { FeatureProjects } from "@/components/modules/Home/FeatureProjects";
import Hero from "@/components/modules/Home/Hero";

export default function HomePage() {
  return (
    <div>
      <Hero />
      <FeaturePost />
      <FeatureProjects />
    </div>
  );
}
