"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useProjectStore } from "@/stores/projectStore";
import Link from "next/link";
import { PlusCircle, FolderPlus } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import ProtectedRoute from "@/components/protectedRoute";

export default function ProjectPage() {
  const { projects, fetchProjects, createProject } = useProjectStore();
  const [newProjectName, setNewProjectName] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      await fetchProjects();
      setIsLoading(false);
    };
    loadData();
  }, []);

  const handleCreateProject = async () => {
    if (newProjectName.trim()) {
      await createProject(newProjectName);
      setNewProjectName("");
    }
  };

  return (
    <ProtectedRoute>
      <div className="container mx-auto p-6 min-h-screen bg-background dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Your Projects
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Manage and organize your workspaces
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Project name"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg bg-white dark:bg-gray-800 
                         border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 
                         focus:border-transparent dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
                <FolderPlus className="h-5 w-5 absolute left-3 top-3 text-gray-400 dark:text-gray-500" />
              </div>
              <Button
                onClick={handleCreateProject}
                disabled={!newProjectName.trim()}
                className="gap-2"
              >
                <PlusCircle className="h-5 w-5" />
                Create Project
              </Button>
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <Skeleton
                  key={i}
                  className="h-32 rounded-xl bg-gray-100 dark:bg-gray-800"
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects.map((project) => (
                <Link
                  key={project.id}
                  href={`/playground/projects/${project.id}`}
                  className="group"
                >
                  <div
                    className="h-32 flex flex-col justify-between p-6 border rounded-xl 
                              bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 
                              hover:border-blue-500 dark:hover:border-blue-600 
                              hover:shadow-lg transition-all duration-200"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {project.name}
                      </h3>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {project.createdAt}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                      Last modified: {project.updatedAt}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {!isLoading && projects.length === 0 && (
            <div className="text-center py-12">
              <div className="mx-auto max-w-md space-y-4">
                <FolderPlus className="h-12 w-12 mx-auto text-gray-400 dark:text-gray-600" />
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                  No projects found
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Get started by creating a new project
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
