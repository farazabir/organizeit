"use client";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Board } from "../../../../components/board";
import { Button } from "../../../../components/ui/button";
import { useProjectStore } from "@/stores/projectStore";
import { useParams } from "next/navigation";

// interface TaskData {
//   id: number;
//   title: string;
//   description: string;
//   boardId: number;
// }

const Project: React.FC = () => {
  const {
    projects,
    fetchProjects,
    currentProject,
    boards,
    tasks,
    setCurrentProject,
    fetchBoards,
    createBoard,
    moveTask,
    createTask,
  } = useProjectStore();
  const params = useParams();
  const { id } = params;
  const project = projects.find((p) => p.id === Number(id));

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newBoardName, setNewBoardName] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

 

  useEffect(() => {
    if (projects.length) {
      const project = projects.find((p) => p.id === Number(id));
      setCurrentProject(project?.id || null);
    }
  }, [id, projects, setCurrentProject]);

  useEffect(() => {
    if (currentProject) {
      fetchBoards(currentProject.id);
    }
  }, [currentProject, fetchBoards]);

  useEffect(() => {
    localStorage.setItem("boards", JSON.stringify(boards));
  }, [boards]);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddBoard = () => {
    if (newBoardName.trim() && currentProject) {
      createBoard(currentProject.id, newBoardName.trim());
      setIsModalOpen(false);
      setNewBoardName("");
    }
  };

  // const moveTask = (task: TaskData, fromBoardId: number, toBoardId: number) => {
  //   setTasks((prev) => {
  //     const updated = { ...prev };

  //     if (fromBoardId !== -1 && updated[fromBoardId]) {
  //       updated[fromBoardId] = updated[fromBoardId].filter(
  //         (t) => t.id !== task.id
  //       );
  //     }

  //     if (!updated[toBoardId]) updated[toBoardId] = [];
  //     const newId = updated[toBoardId].length
  //       ? Math.max(...updated[toBoardId].map((t) => t.id)) + 1
  //       : 1;

  //     updated[toBoardId] = [
  //       ...updated[toBoardId],
  //       {
  //         ...task,
  //         id: newId,
  //         boardId: toBoardId,
  //       },
  //     ];

  //     return updated;
  //   });
  // };

  if (!projects.length) {
    return (
      <div className="flex items-center justify-center h-full text-foreground">
        <p className="animate-pulse">Loading project data...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col mx-4 md:mx-8 lg:mx-12 h-[calc(100vh-4rem)] py-6 relative">
      <div className="absolute top-0 left-0 right-0 h-2 bg-transparent overflow-x-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-border scrollbar-track-transparent">
        <div className="w-[9999px]" />
      </div>

      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-foreground">
          {project?.name || "Project Board"}
        </h1>
        <Button onClick={() => setIsModalOpen(true)}>+ Create New Board</Button>
      </header>

      <motion.div
        ref={containerRef}
        className="flex-1 rounded-xl border border-border bg-background/80 backdrop-blur-sm overflow-x-auto p-4 scroll-smooth "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex gap-4 min-w-max">
          {boards.map((board, index) => (
            <Board
              key={index}
              id={board.id}
              title={board.name}
              tasks={tasks.filter((t) => t.boardId === board.id)}
              moveTask={(taskId, newBoardId) => moveTask(taskId.id, newBoardId)}
              createTask={(task) =>
                createTask(task.boardId, task.title, task.description)
              }
            />
          ))}
        </div>
      </motion.div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card w-full max-w-md p-6 rounded-lg border border-border shadow-2xl">
            <h2 className="text-xl font-semibold mb-4 text-foreground">
              Create New Board
            </h2>
            <input
              type="text"
              value={newBoardName}
              onChange={(e) => setNewBoardName(e.target.value)}
              placeholder="Enter board name"
              className="w-full px-4 py-2 mb-6 rounded-lg bg-background text-foreground border border-border focus:ring-2 focus:ring-primary focus:outline-none"
              onKeyDown={(e) => e.key === "Enter" && handleAddBoard()}
            />
            <div className="flex justify-end gap-2">
              <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddBoard} disabled={!newBoardName.trim()}>
                Create Board
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Project;
