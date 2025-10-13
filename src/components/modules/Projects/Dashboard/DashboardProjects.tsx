/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Trash2, Edit2 } from "lucide-react";
import { UpdateProjectModal } from "../UpdateProjectModal";
import { Project } from "@/types";
import { toast } from "react-hot-toast";

interface DashboardProjectsProps {
  allprojects: Project[];
}

export default function DashboardProjects({
  allprojects,
}: DashboardProjectsProps) {
  const [projects, setProjects] = useState<Project[]>(allprojects);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [deleteProjectId, setDeleteProjectId] = useState<number | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const handleDelete = async () => {
    if (!deleteProjectId) return;

    const originalProjects = [...projects];
    setProjects((prev) => prev.filter((p) => p.id !== deleteProjectId));
    setIsDeleteModalOpen(false);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API}/project/delete/${deleteProjectId}`,
        { method: "DELETE" }
      );

      if (!res.ok) throw new Error("Failed to delete project");

      toast.success("Project deleted successfully");
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
      setProjects(originalProjects);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
        All Projects
      </h1>

      {/* Project List */}
      <div className="space-y-4">
        {Array.isArray(projects) && projects.length > 0 ? (
          projects.map((project) => (
            <Card
              key={project.id}
              className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center p-4 sm:p-6 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Thumbnail */}
              {project.thumbnail && (
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full sm:w-32 h-32 object-cover rounded-lg border border-gray-200 dark:border-gray-700"
                />
              )}

              {/* Project Info */}
              <div className="flex-1 w-full">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {project.title}
                </h2>

                {/* Features */}
                {project.features && project.features.length > 0 && (
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
                    <strong>Features:</strong>{" "}
                    {project.features.slice(0, 3).join(", ")}
                    {project.features.length > 3 ? "..." : ""}
                  </p>
                )}

                {/* Metadata */}
                <p className="text-gray-500 dark:text-gray-400 text-xs mt-2">
                  Owner: {project.owner?.name || "Unknown"} •{" "}
                  {new Date(project.createdAt).toLocaleDateString()} •{" "}
                  {project.views ?? 0} views
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-2 mt-4 sm:mt-0">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedProject(project);
                    setIsUpdateModalOpen(true);
                  }}
                  className="flex items-center gap-1"
                >
                  <Edit2 className="w-4 h-4" /> Update
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => {
                    setDeleteProjectId(project.id);
                    setIsDeleteModalOpen(true);
                  }}
                  className="flex items-center gap-1"
                >
                  <Trash2 className="w-4 h-4" /> Delete
                </Button>
              </div>
            </Card>
          ))
        ) : (
          <p className="text-gray-500 dark:text-gray-400 text-center">
            No projects available.
          </p>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this project? This action cannot
              be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Update Project Modal */}
      {selectedProject && (
        <UpdateProjectModal
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          project={selectedProject}
          onUpdated={(updated) => {
            setProjects((prev) =>
              prev.map((p) => (p.id === updated.id ? updated : p))
            );
          }}
        />
      )}
    </div>
  );
}
