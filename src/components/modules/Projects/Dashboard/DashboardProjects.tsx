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
import { Project, ProjectData } from "@/types";
import { toast } from "react-hot-toast";
import Loading from "@/components/ui/Loading";

interface DashboardProjectsProps {
  data: ProjectData;
}

export default function DashboardProjects({ data }: DashboardProjectsProps) {
  const [projects, setProjects] = useState<Project[]>(data.data);
  const [pagination, setPagination] = useState(data.pagination);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [deleteProjectId, setDeleteProjectId] = useState<number | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch projects by page
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
    } catch (err: any) {
      toast.error(err.message || "Failed to load blogs");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteProjectId) return;

    const originalProjects = [...projects];
    setProjects((prev) => prev.filter((p) => p.id !== deleteProjectId));
    setIsDeleteModalOpen(false);

    try {
      const res = await fetch(`/api/proxy/project/delete/${deleteProjectId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete project");

      toast.success("Project deleted successfully");
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
      setProjects(originalProjects);
    }
  };

  // Pagination handlers
  const handleNextPage = () => {
    if (pagination.page < pagination.totalPages) {
      fetchProjects(pagination.page + 1);
    }
  };

  const handlePrevPage = () => {
    if (pagination.page > 1) {
      fetchProjects(pagination.page - 1);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
        All Projects
      </h1>

      {/* Project List */}
      <div className="space-y-4">
        {loading ? (
          <Loading />
        ) : Array.isArray(projects) && projects.length > 0 ? (
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
                  By{" "}
                  {typeof project.owner === "object"
                    ? project.owner.name
                    : project.owner || "Unknown"}{" "}
                  • {new Date(project.createdAt).toLocaleDateString()}
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

      {/* Pagination Controls */}
      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-8">
          <Button
            variant="outline"
            disabled={pagination.page === 1}
            onClick={handlePrevPage}
          >
            Previous
          </Button>

          <span className="text-gray-700 dark:text-gray-300">
            Page {pagination.page} of {pagination.totalPages}
          </span>

          <Button
            variant="outline"
            disabled={pagination.page === pagination.totalPages}
            onClick={handleNextPage}
          >
            Next
          </Button>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent className="w-[90%] max-w-sm sm:max-w-md rounded-lg p-6">
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this project? This action cannot
              be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-end gap-2">
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
