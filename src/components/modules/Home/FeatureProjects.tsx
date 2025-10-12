"use client";

import { Github, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ProjectsProps, Project } from "@/types";

export function FeatureProjects({ projects }: ProjectsProps) {
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

      <div className="container mx-auto relative z-10 flex flex-col items-center gap-16 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <h2 className="mx-auto mb-6 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl lg:max-w-3xl">
            Feature Projects
          </h2>
          <p className="mx-auto max-w-2xl text-gray-600 dark:text-gray-300 md:text-lg">
            A showcase of the systems and apps I have built using the MERN
            stack, TypeScript, and clean architecture.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid gap-y-10 sm:grid-cols-12 mx-3 md:mx-0 sm:gap-y-12 md:gap-y-16 lg:gap-y-20">
          {projects.slice(0, 2).map((project: Project) => (
            <Card
              key={project.id}
              className="border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-black/30 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 sm:col-span-12 lg:col-span-10 lg:col-start-2 rounded-2xl p-6 sm:p-8"
            >
              <div className="grid gap-y-6 sm:grid-cols-10 sm:gap-x-5 md:items-center md:gap-x-8 lg:gap-x-12">
                {/* Info Section */}
                <div className="sm:col-span-5">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white md:text-2xl lg:text-3xl">
                    {project.title}
                  </h3>

                  <p className="mt-4 text-gray-600 dark:text-gray-300 md:mt-5">
                    {project.description}
                  </p>

                  {/* Features (tags) */}
                  {project.features.length > 0 && (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.features.map((feature) => (
                        <span
                          key={feature}
                          className="px-2 py-1 text-xs font-medium rounded-full bg-gradient-to-r from-blue-600/10 to-purple-600/10 text-blue-600 dark:text-purple-400 border border-blue-500/20 dark:border-purple-400/20"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Links */}
                  <div className="mt-6 flex items-center space-x-4 md:mt-8">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:underline md:text-base"
                      >
                        <ExternalLink className="mr-2 size-4 text-blue-600 dark:text-purple-400" />
                        Live Demo
                      </a>
                    )}
                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:underline md:text-base"
                      >
                        <Github className="mr-2 size-4 text-blue-600 dark:text-purple-400" />
                        Source
                      </a>
                    )}
                  </div>
                </div>

                {/* Image Section */}
                {project.thumbnail && (
                  <div className="order-first sm:order-last sm:col-span-5">
                    <a
                      href={project.liveUrl || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <div className="aspect-[16/9] overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
                        <img
                          src={project.thumbnail}
                          alt={project.title}
                          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                      </div>
                    </a>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
