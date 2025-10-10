import { AboutContent } from "@/components/modules/About/AboutContent";
import { Metadata } from "next";


export const metadata:Metadata = {
  title: "About | Imran Khan",
  description:
    "Learn more about my journey, my passion for web development, and the values that drive me to build meaningful digital products.",
};

const AboutPage = () => {
  return (
    <div>
      <AboutContent />
    </div>
  );
};

export default AboutPage;
