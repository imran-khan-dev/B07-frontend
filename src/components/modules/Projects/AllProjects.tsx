"use client";

import { ArrowRight, Github } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Project, ProjectsProps } from "@/types";

const AllProjects = ({projects}: ProjectsProps) => {
  return (
    <section className="relative overflow-hidden py-18 mx-auto">
      {/* Background gradient (top ↔ bottom, center soft white/black) */}
      <div
        className="absolute inset-0 z-0 dark:hidden"
        style={{
          background:
            "linear-gradient(to bottom, #3b82f6 0%, #ffffff 40%, #ffffff 60%, #3b82f6 100%)",
        }}
      />
      <div
        className="absolute inset-0 z-0 hidden dark:block"
        style={{
          background:
            "linear-gradient(to bottom, #010133 0%, #000000 40%, #000000 60%, #010133 100%)",
        }}
      />

      <div className="relative z-10 container mx-auto flex flex-col items-center gap-16">
        {/* Header */}
        <div className="text-center px-6 sm:px-10">
          <h1 className="mx-auto mb-6 text-4xl font-bold text-gray-900 dark:text-white md:text-5xl lg:max-w-3xl">
            All Projects
          </h1>
          <p className="mx-auto max-w-2xl text-gray-600 dark:text-gray-300 md:text-lg">
            Explore my latest web development projects built with modern
            technologies like React, Next.js, TypeScript, and Tailwind CSS.
          </p>
        </div>

        {/* Project Cards */}
        <div className="grid gap-y-10 sm:grid-cols-12 mx-3 sm:gap-y-12 md:gap-y-16 lg:gap-y-20">
          {projects.map((project: Project) => (
            <Card
              key={project.id}
              className="order-last border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-black/30 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 sm:order-first sm:col-span-12 lg:col-span-10 lg:col-start-2 rounded-2xl p-6 sm:p-8"
            >
              <div className="grid gap-y-6 sm:grid-cols-10 sm:gap-x-5 md:items-center md:gap-x-8 lg:gap-x-12">
                {/* Text Section */}
                <div className="sm:col-span-5 pl-2 md:pl-4 lg:pl-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white md:text-2xl lg:text-3xl">
                    <a
                      href={project.liveUrl || "#"}
                      target="_blank"
                      className="hover:text-blue-600 dark:hover:text-purple-400 transition-colors"
                    >
                      {project.title}
                    </a>
                  </h3>

                  <p className="mt-4 text-gray-600 dark:text-gray-300 md:mt-5">
                    {project.description}
                  </p>

                  {project.features && (
                    <ul className="mt-4 space-y-2 text-gray-700 dark:text-gray-400 list-disc pl-5 text-sm">
                      {project.features.map((feature, idx) => (
                        <li key={idx}>{feature}</li>
                      ))}
                    </ul>
                  )}

                  <div className="mt-6 flex items-center space-x-4 text-sm md:mt-8 text-gray-500 dark:text-gray-400">
                    <span>
                      {new Date(project.createdAt).toLocaleDateString()}
                    </span>
                    {/* <span>•</span> */}
                    {/* <span>{project.views} views</span> */}
                  </div>

                  <div className="mt-6 flex items-center gap-4 md:mt-8">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        className="inline-flex items-center font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:underline md:text-base"
                      >
                        <span>Live Demo</span>
                        <ArrowRight className="ml-2 size-4 text-blue-600 dark:text-purple-400" />
                      </a>
                    )}

                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        className="inline-flex items-center font-semibold text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-purple-400 transition-colors md:text-base"
                      >
                        <Github className="mr-2 size-4" />
                        <span>Repository</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Image Section */}
                <div className="order-first sm:order-last sm:col-span-5">
                  <a
                    href={project.liveUrl || "#"}
                    target="_blank"
                    className="block"
                  >
                    <div className="aspect-16/9 overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
                      <img
                        src={project.thumbnail || "/placeholder.png"}
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

export { AllProjects };
