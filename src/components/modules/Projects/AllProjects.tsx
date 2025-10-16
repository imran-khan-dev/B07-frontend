/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { ArrowRight, Github } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Project, ProjectData } from "@/types";
import { toast } from "react-hot-toast";
import Loading from "@/components/ui/Loading";

interface ProjectsProps {
  data: ProjectData;
}

const AllProjects = ({ data }: ProjectsProps) => {
  const [projects, setProjects] = useState<Project[]>(data.data);
  const [pagination, setPagination] = useState(data.pagination);
  const [loading, setLoading] = useState(false);

  // Fetch projects from API
  const fetchProjects = async (page: number) => {
    try {
      setLoading(true);
      const res = await fetch(
        `/api/proxy/project/get-projects?page=${page}&limit=${pagination.limit}`
      );
      const json = await res.json();
      const updatedData: ProjectData = json.data;
      setProjects(updatedData.data);
      setPagination(updatedData.pagination);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err: any) {
      toast.error(err.message || "Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (pagination.page < pagination.totalPages) {
      fetchProjects(pagination.page + 1);
    }
  };

  const handlePrev = () => {
    if (pagination.page > 1) {
      fetchProjects(pagination.page - 1);
    }
  };

  return (
    <section className="relative overflow-hidden py-18 mx-auto">
      {/* Background gradient */}
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

      <div className="relative z-10 container mx-auto flex flex-col items-center gap-16 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="mb-6 text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">
            All Projects
          </h1>
          <p className="text-gray-600 dark:text-gray-300 md:text-lg">
            Explore my latest web development projects built with modern
            technologies like React, Next.js, TypeScript, and Tailwind CSS.
          </p>
        </div>

        {/* Project Cards */}
        {loading ? (
          <Loading />
        ) : projects.length > 0 ? (
          <div className="w-full flex flex-col items-center gap-10 sm:gap-12 md:gap-14 lg:gap-16">
            {projects.map((project: Project) => (
              <Card
                key={project.id}
                className="w-full max-w-5xl border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-black/30 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl p-5 sm:p-7 lg:p-10"
              >
                <div className="flex flex-col md:flex-row gap-6 md:gap-10 lg:gap-14 items-start">
                  {/* Image Section */}
                  <div className="w-full md:w-1/2 order-first md:order-last">
                    <a
                      href={project.liveUrl || "#"}
                      target="_blank"
                      className="block"
                    >
                      <div className="aspect-[16/10] overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
                        <img
                          src={project.thumbnail || "/placeholder.png"}
                          alt={project.title}
                          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                      </div>
                    </a>
                  </div>

                  {/* Text Section */}
                  <div className="w-full md:w-1/2 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-900 dark:text-white">
                        <a
                          href={project.liveUrl || "#"}
                          target="_blank"
                          className="hover:text-blue-600 dark:hover:text-purple-400 transition-colors"
                        >
                          {project.title}
                        </a>
                      </h3>
                      <p className="mt-3 text-gray-600 dark:text-gray-300 text-sm sm:text-base lg:text-lg">
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

                      <div className="mt-4 text-gray-500 dark:text-gray-400 text-sm sm:text-base">
                        {new Date(project.createdAt).toLocaleDateString()}
                      </div>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-4">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          className="inline-flex items-center font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:underline text-sm sm:text-base"
                        >
                          <span>Live Demo</span>
                          <ArrowRight className="ml-2 w-4 h-4 text-blue-600 dark:text-purple-400" />
                        </a>
                      )}
                      {project.repoUrl && (
                        <a
                          href={project.repoUrl}
                          target="_blank"
                          className="inline-flex items-center font-semibold text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-purple-400 transition-colors text-sm sm:text-base"
                        >
                          <Github className="mr-2 w-4 h-4" />
                          <span>Repository</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400 text-center w-full">
            No projects found.
          </p>
        )}

        {/* Pagination Controls */}
        {pagination.totalPages > 1 && (
          <div className="flex justify-center mt-10">
            <div className="flex items-center gap-2 sm:gap-3 bg-white/80 dark:bg-black/40 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-full shadow-md px-3 sm:px-5 py-2">
              {/* Prev */}
              <button
                onClick={handlePrev}
                disabled={pagination.page === 1}
                className={`px-3 py-1.5 rounded-full text-sm sm:text-base font-medium transition-all ${
                  pagination.page === 1
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-blue-600 dark:text-purple-400 hover:bg-blue-600 hover:text-white dark:hover:bg-purple-400 dark:hover:text-black"
                }`}
              >
                Prev
              </button>

              {/* Page Numbers */}
              <div className="flex items-center gap-1 sm:gap-2">
                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
                  .slice(
                    Math.max(0, pagination.page - 3),
                    Math.min(pagination.totalPages, pagination.page + 2)
                  )
                  .map((pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => fetchProjects(pageNum)}
                      className={`w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full text-sm font-semibold transition-all ${
                        pageNum === pagination.page
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md"
                          : "text-gray-700 dark:text-gray-300 hover:bg-blue-600 hover:text-white dark:hover:bg-purple-400 dark:hover:text-black"
                      }`}
                    >
                      {pageNum}
                    </button>
                  ))}
              </div>

              {/* Next */}
              <button
                onClick={handleNext}
                disabled={pagination.page === pagination.totalPages}
                className={`px-3 py-1.5 rounded-full text-sm sm:text-base font-medium transition-all ${
                  pagination.page === pagination.totalPages
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-blue-600 dark:text-purple-400 hover:bg-blue-600 hover:text-white dark:hover:bg-purple-400 dark:hover:text-black"
                }`}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export { AllProjects };
