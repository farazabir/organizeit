"use client";
import { useState, useEffect, useRef } from "react";
import { Task } from "./task";
import { Button } from "./ui/button";
import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { Badge } from "./ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { createPortal } from "react-dom";
import { useProjectStore } from "@/stores/projectStore";

interface BoardProps {
  id: number;
  title: string;
  tasks: TaskData[];
  moveTask: (task: TaskData, fromBoardId: number, toBoardId: number) => void;
  createTask: (task: Omit<TaskData, "id">) => void;
}

interface TaskData {
  id: number;
  title: string;
  description: string;
  boardId: number;
}

export const Board: React.FC<BoardProps> = ({
  id,
  title,
  tasks,
  moveTask,
  createTask,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const boardRef = useRef<HTMLDivElement>(null);
  const { fetchTasks } = useProjectStore();

  useEffect(() => {
    fetchTasks(id);
  }, [id, fetchTasks]);

  useEffect(() => {
    const boardElement = boardRef.current;
    if (!boardElement) return;

    return dropTargetForElements({
      element: boardElement,
      onDrop: ({ source }) => {
        const task = source.data;
        const fromBoardId = task.boardId;
        moveTask(task, fromBoardId, id);
      },
    });
  }, [moveTask, id]);

  const handleAddTask = () => {
    if (newTaskTitle.trim() && newTaskDescription.trim()) {
      createTask({
        title: newTaskTitle.trim(),
        description: newTaskDescription.trim(),
        boardId: id,
      });
      setIsModalOpen(false);
      setNewTaskTitle("");
      setNewTaskDescription("");
    }
  };

  const handleUpdateTask = (
    taskId: number,
    title: string,
    description: string
  ) => {
    moveTask({ id: taskId, title, description, boardId: id }, id, id);
  };

  return (
    <Card
      ref={boardRef}
      className="relative w-80 h-fit max-h-[calc(100vh-12rem)] flex flex-col border border-gray-200 bg-white shadow-sm rounded-lg transition-all hover:shadow-md data-[drop-target]:bg-gray-50 data-[drop-target]:border-blue-500"
    >
      <CardHeader className="flex flex-row items-center justify-between p-4 pb-2 space-y-0">
        <div className="flex items-center gap-2">
          <CardTitle className="text-lg font-semibold text-gray-900">
            {title}
          </CardTitle>
          <Badge
            variant="secondary"
            className="px-1.5 py-0.5 text-xs font-medium bg-gray-100 text-gray-700"
          >
            {tasks.length}
          </Badge>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsModalOpen(true)}
          className="text-gray-500 hover:bg-gray-100"
        >
          + Add Task
        </Button>
      </CardHeader>

      <CardContent className="p-4 pt-0 space-y-2 overflow-hidden">
        {tasks.map((task) => (
          <Task
            key={task.id}
            id={task.id}
            title={task.title}
            description={task.description}
            boardId={id}
            onUpdate={handleUpdateTask}
          />
        ))}
      </CardContent>

      {isModalOpen &&
        createPortal(
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <Card className="w-full max-w-md bg-white rounded-lg shadow-lg animate-in fade-in-zoom-in">
              <CardHeader>
                <CardTitle className="text-gray-900">Create New Task</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  placeholder="Task title"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <Textarea
                  placeholder="Task description"
                  value={newTaskDescription}
                  onChange={(e) => setNewTaskDescription(e.target.value)}
                  className="h-24 resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsModalOpen(false)}
                    className="text-gray-700 hover:bg-gray-100"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleAddTask}
                    disabled={
                      !newTaskTitle.trim() || !newTaskDescription.trim()
                    }
                    className="bg-blue-500 text-white hover:bg-blue-600"
                  >
                    Create Task
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>,
          document.body
        )}
    </Card>
  );
};
