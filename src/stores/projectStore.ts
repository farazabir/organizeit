import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "@/utils/api";

interface Project {
  id: number | null;
  name: string;
  createdAt: string;
  updatedAt: string;
}

interface Board {
  id: number;
  name: string;
  projectId: number;
}

interface Task {
  id: number;
  title: string;
  description: string;
  boardId: number;
}

interface ProjectState {
  projects: Project[];
  currentProject: Project | null;
  boards: Board[];
  currentBoard: Board | null;
  tasks: Task[];

  fetchProjects: () => Promise<void>;
  createProject: (name: string) => Promise<void>;
  setCurrentProject: (projectId: number | null) => void;

  fetchBoards: (projectId: number | null) => Promise<void>;
  createBoard: (projectId: number | null, name: string | null) => Promise<void>;
  setCurrentBoard: (boardId: number | null) => void;

  fetchTasks: (boardId: number) => Promise<void>;
  createTask: (
    boardId: number,
    title: string,
    description: string
  ) => Promise<void>;
  moveTaskBoard: (taskId: number, newBoardId: number) => Promise<void>;
}

export const useProjectStore = create<ProjectState>()(
  persist(
    (set, get) => ({
      projects: [],
      currentProject: null,
      boards: [],
      currentBoard: null,
      tasks: [],

      fetchProjects: async () => {
        try {
          const token = localStorage.getItem("token");
          if (!token) throw new Error("No token found");

          const res = await api.get("/api/v1/project/get", {
            headers: { Authorization: `${token}` },
          });
          set({ projects: res.data });
        } catch (error) {
          console.error("Failed to fetch projects:", error);
        }
      },

      createProject: async (name) => {
        try {
          const token = localStorage.getItem("token");
          if (!token) throw new Error("No token found");

          const res = await api.post(
            "/api/v1/project/create",
            { name },
            { headers: { Authorization: `${token}` } }
          );
          set((state) => ({ projects: [...state.projects, res.data] }));
        } catch (error) {
          console.error("Failed to create project:", error);
        }
      },

      setCurrentProject: (projectId) => {
        const project = get().projects.find((p) => p.id === projectId) || null;
        set({ currentProject: project });
      },

      // Board methods
      fetchBoards: async (projectId) => {
        try {
          const token = localStorage.getItem("token");
          if (!token) throw new Error("No token found");

          const res = await api.get(`/api/v1/board/${projectId}`, {
            headers: { Authorization: `${token}` },
          });
          set({ boards: res.data });
        } catch (error) {
          console.error("Failed to fetch boards:", error);
        }
      },

      createBoard: async (projectId, name) => {
        try {
          const token = localStorage.getItem("token");
          if (!token) throw new Error("No token found");

          const res = await api.post(
            `/api/v1/board/${projectId}`,
            { name },
            { headers: { Authorization: `${token}` } }
          );
          set((state) => ({ boards: [...state.boards, res.data] }));
        } catch (error) {
          console.error("Failed to create board:", error);
        }
      },

      setCurrentBoard: (boardId) => {
        const board = get().boards.find((b) => b.id === boardId) || null;
        set({ currentBoard: board });
      },

      // Task methods
      fetchTasks: async (boardId) => {
        try {
          const token = localStorage.getItem("token");
          if (!token) throw new Error("No token found");

          const res = await api.get(`/api/v1/task/${boardId}`, {
            headers: { Authorization: `${token}` },
          });

          set((state) => ({
            tasks: [
              ...state.tasks.filter((task) => task.boardId !== boardId),
              ...res.data,
            ],
          }));
        } catch (error) {
          console.error("Failed to fetch tasks:", error);
        }
      },
      createTask: async (boardId, title, description) => {
        try {
          const token = localStorage.getItem("token");
          if (!token) throw new Error("No token found");

          const res = await api.post(
            `/api/v1/task/${boardId}`,
            { title, description },
            { headers: { Authorization: `${token}` } }
          );
          set((state) => ({ tasks: [...state.tasks, res.data] }));
        } catch (error) {
          console.error("Failed to create task:", error);
        }
      },

      moveTaskBoard: async (taskId, newBoardId) => {
        try {
          const token = localStorage.getItem("token");
          if (!token) throw new Error("No token found");

          await api.patch(
            `/api/v1/task/${taskId}/move/${newBoardId}`,
            {},
            {
              headers: { Authorization: `${token}` },
            }
          );

          set((state) => ({
            tasks: state.tasks.map((task) =>
              task.id === taskId ? { ...task, boardId: newBoardId } : task
            ),
          }));
        } catch (error) {
          console.error("Failed to move task:", error);
        }
      },
    }),
    {
      name: "project-storage",
      partialize: (state) => ({
        projects: state.projects,
        boards: state.boards,
        tasks: state.tasks,
        currentProject: state.currentProject,
        currentBoard: state.currentBoard,
      }),
    }
  )
);
