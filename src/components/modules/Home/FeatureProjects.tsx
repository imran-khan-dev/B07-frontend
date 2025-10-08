"use client";

import { Github, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";

interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  liveUrl: string;
  githubUrl: string;
  image: string;
}

interface ProjectSectionProps {
  heading?: string;
  description?: string;
  projects?: Project[];
}

const FeatureProjects = ({
  heading = "Featured Projects",
  description = "A selection of my recent works showcasing modern UI design, clean code, and performance-focused architecture.",
  projects = [
    {
      id: "1",
      title: "Turf Management SaaS",
      description:
        "A full-featured turf booking and management system built with the MERN stack, supporting OTP login, owner dashboards, and online payments.",
      tech: ["React", "TypeScript", "Node.js", "MongoDB"],
      liveUrl: "#",
      githubUrl: "#",
      image:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-2.svg",
    },
    {
      id: "2",
      title: "Institute Website (MERN)",
      description:
        "A complete school management website with admin panel for notices, gallery, governing body, and more — optimized for performance and responsiveness.",
      tech: ["React", "Tailwind", "Express", "MongoDB"],
      liveUrl: "#",
      githubUrl: "#",
      image:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-3.svg",
    },
  ],
}: ProjectSectionProps) => {
  return (
    <section className="pb-18 relative overflow-hidden">
      {/* Background gradient (bottom → top) */}
      <div
        className="absolute inset-0 z-0 dark:hidden"
        style={{
          background:
            "radial-gradient(125% 125% at 50% 0%, #ffffff 40%, #3b82f6 100%)",
        }}
      />
      <div
        className="absolute inset-0 z-0 hidden dark:block"
        style={{
          background:
            "radial-gradient(125% 125% at 50% 0%, #000000 40%, #010133 100%)",
        }}
      />

      <div className="mx-auto container relative z-10 flex flex-col items-center gap-16">
        <div className="text-center">
          <h2 className="mx-auto mb-6 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl lg:max-w-3xl">
            {heading}
          </h2>
          <p className="mx-auto max-w-2xl text-gray-600 dark:text-gray-300 md:text-lg">
            {description}
          </p>
        </div>

        <div className="grid gap-y-10 sm:grid-cols-12 mx-3 md:mx-0 sm:gap-y-12 md:gap-y-16 lg:gap-y-20">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-black/30 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 sm:col-span-12 lg:col-span-10 lg:col-start-2 rounded-2xl p-6 sm:p-8"
            >
              <div className="grid gap-y-6 sm:grid-cols-10 sm:gap-x-5 md:items-center md:gap-x-8 lg:gap-x-12">
                {/* Text Section */}
                <div className="sm:col-span-5">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white md:text-2xl lg:text-3xl">
                    {project.title}
                  </h3>

                  <p className="mt-4 text-gray-600 dark:text-gray-300 md:mt-5">
                    {project.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-1 text-xs font-medium rounded-full bg-gradient-to-r from-blue-600/10 to-purple-600/10 text-blue-600 dark:text-purple-400 border border-blue-500/20 dark:border-purple-400/20"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex items-center space-x-4 md:mt-8">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      className="inline-flex items-center font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:underline md:text-base"
                    >
                      <ExternalLink className="mr-2 size-4 text-blue-600 dark:text-purple-400" />
                      Live Demo
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      className="inline-flex items-center font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:underline md:text-base"
                    >
                      <Github className="mr-2 size-4 text-blue-600 dark:text-purple-400" />
                      Source
                    </a>
                  </div>
                </div>

                {/* Image Section */}
                <div className="order-first sm:order-last sm:col-span-5">
                  <a href={project.liveUrl} target="_blank" className="block">
                    <div className="aspect-16/9 overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                  </a>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export { FeatureProjects };
