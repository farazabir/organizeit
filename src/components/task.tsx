"use client";
import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { Button } from "./ui/button";
import { draggable } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { Card, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

interface TaskProps {
  id: number;
  title: string;
  description: string;
  boardId: number;
  onUpdate: (
    id: number,
    updatedTitle: string,
    updatedDescription: string
  ) => void;
}

export const Task: React.FC<TaskProps> = ({
  id,
  title,
  description,
  boardId,
  onUpdate,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDescription, setEditedDescription] = useState(description);
  const taskRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const taskElement = taskRef.current;
    if (!taskElement) return;

    return draggable({
      element: taskElement,
      getInitialData: () => ({
        id,
        title,
        description,
        boardId,
      }),
    });
  }, [id, title, description, boardId]);

  const handleSave = () => {
    onUpdate(id, editedTitle.trim(), editedDescription.trim());
    setIsEditing(false);
  };

  return (
    <>
      <Card
        ref={taskRef}
        className="group relative w-72 min-h-[120px] cursor-grab border-border bg-card shadow-sm transition-all hover:shadow-md hover:border-primary active:cursor-grabbing"
        onClick={() => setIsModalOpen(true)}
      >
        <CardHeader className="space-y-1 p-4">
          <CardTitle className="line-clamp-1 text-base font-medium text-foreground">
            {title}
          </CardTitle>
          <CardDescription className="line-clamp-3 text-sm text-muted-foreground">
            {description}
          </CardDescription>
        </CardHeader>
      </Card>

      {isModalOpen &&
        createPortal(
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm">
            <div className="absolute inset-0 flex items-center justify-center p-4 overflow-y-auto">
              <div className="w-full max-w-xl rounded-lg bg-background shadow-2xl border border-border">
                <div className="p-8 space-y-8">
                  <div className="flex justify-between items-start pb-6 border-b border-border">
                    <h2 className="text-2xl font-bold text-foreground tracking-tight">
                      {isEditing ? "Edit Task" : "Task Details"}
                    </h2>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setIsEditing(false);
                        setIsModalOpen(false);
                      }}
                      className="text-muted-foreground hover:bg-accent/50 rounded-lg"
                    >
                      ✕
                    </Button>
                  </div>

                  <div className="space-y-8">
                    {isEditing ? (
                      <>
                        <div className="space-y-6">
                          <div className="space-y-3">
                            <label className="block text-sm font-semibold text-foreground tracking-wide">
                              Title
                            </label>
                            <Input
                              value={editedTitle}
                              onChange={(e) => setEditedTitle(e.target.value)}
                              className="text-foreground bg-card/80 border-2 border-border hover:border-primary/50 focus:border-primary"
                            />
                          </div>
                          <div className="space-y-3">
                            <label className="block text-sm font-semibold text-foreground tracking-wide">
                              Description
                            </label>
                            <Textarea
                              value={editedDescription}
                              onChange={(e) =>
                                setEditedDescription(e.target.value)
                              }
                              rows={5}
                              className="text-foreground bg-card/80 border-2 border-border hover:border-primary/50 focus:border-primary resize-none"
                            />
                          </div>
                        </div>
                        <div className="flex justify-end gap-3 pt-6 border-t border-border">
                          <Button
                            variant="outline"
                            onClick={() => setIsEditing(false)}
                            className="min-w-[120px] border-2"
                          >
                            Cancel
                          </Button>
                          <Button
                            onClick={handleSave}
                            className="min-w-[120px] font-semibold"
                          >
                            Save Changes
                          </Button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="space-y-6">
                          <div className="space-y-3">
                            <h3 className="text-sm font-semibold text-foreground tracking-wide uppercase">
                              Title
                            </h3>
                            <p className="text-foreground font-medium leading-relaxed">
                              {editedTitle}
                            </p>
                          </div>
                          <div className="space-y-3">
                            <h3 className="text-sm font-semibold text-foreground tracking-wide uppercase">
                              Description
                            </h3>
                            <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed">
                              {editedDescription || "No description provided"}
                            </p>
                          </div>
                        </div>
                        <div className="flex justify-end gap-3 pt-6 border-t border-border">
                          <Button
                            variant="outline"
                            onClick={() => setIsModalOpen(false)}
                            className="min-w-[120px] border-2"
                          >
                            Close
                          </Button>
                          <Button
                            onClick={() => setIsEditing(true)}
                            className="min-w-[120px] font-semibold"
                          >
                            Edit Task
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};
