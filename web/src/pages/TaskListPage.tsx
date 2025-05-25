import { useQuery, useMutation } from "@apollo/client";
import {
  GET_TASKS,
  CREATE_TASK,
  DELETE_TASK,
  UPDATE_TASK,
} from "../graphql/queries";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2, Edit, Plus } from "lucide-react";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { toast } from "sonner";

export default function TaskListPage() {
  const { loading, error, data, refetch } = useQuery(GET_TASKS);
  const [createTask] = useMutation(CREATE_TASK);
  const [deleteTask] = useMutation(DELETE_TASK);
  const [updateTask] = useMutation(UPDATE_TASK);

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskContent, setNewTaskContent] = useState("");
  const [newTaskDueDate, setNewTaskDueDate] = useState("");
  const [editTask, setEditTask] = useState<any>(null);

  const handleAddTask = async () => {
    if (!newTaskTitle.trim()) {
      toast.error("Error", {
        description: "Task title is required",
      });
      return;
    }

    try {
      await createTask({
        variables: {
          input: {
            title: newTaskTitle,
            content: newTaskContent,
            dueDate: newTaskDueDate || null,
          },
        },
      });
      setNewTaskTitle("");
      setNewTaskContent("");
      setNewTaskDueDate("");
      refetch();
      toast.success("Success", {
        description: "Task created successfully",
      });
    } catch (err) {
      toast.error("Error", {
        description: "Failed to create task",
      });
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await deleteTask({ variables: { id } });
      refetch();
      toast.success("Success", {
        description: "Task deleted successfully",
      });
    } catch (err) {
      toast.error("Error", {
        description: "Failed to delete task",
      });
    }
  };

  const handleToggleComplete = async (task: any) => {
    try {
      await updateTask({
        variables: {
          id: task.id,
          input: {
            completed: !task.completed,
          },
        },
      });
      refetch();
    } catch (err) {
      toast.error("Error", {
        description: "Failed to update task",
      });
    }
  };

  const handleSaveEdit = async () => {
    if (!editTask) return;

    try {
      await updateTask({
        variables: {
          id: editTask.id,
          input: {
            title: editTask.title,
            content: editTask.content,
            dueDate: editTask.dueDate || null,
          },
        },
      });
      setEditTask(null);
      refetch();
      toast.success("Success", {
        description: "Task updated successfully",
      });
    } catch (err) {
      toast.error("Error", {
        description: "Failed to update task",
      });
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (error)
    return <div className="p-4 text-red-500">Error: {error.message}</div>;

  return (
    <div className="container py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">My Tasks</h1>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="cursor-pointer">
              <Plus className="h-4 w-4" />
              Add Task
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Task</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <Input
                placeholder="Task title"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
              />
              <Input
                placeholder="Description (optional)"
                value={newTaskContent}
                onChange={(e) => setNewTaskContent(e.target.value)}
              />
              <Input
                type="date"
                value={newTaskDueDate}
                onChange={(e) => setNewTaskDueDate(e.target.value)}
              />
              <Button onClick={handleAddTask} className="cursor-pointer">
                Create Task
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">Status</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.tasks?.map((task: any) => (
            <TableRow key={task.id}>
              <TableCell>
                <Checkbox
                  className="cursor-pointer"
                  checked={task.completed}
                  onCheckedChange={() => handleToggleComplete(task)}
                />
              </TableCell>
              <TableCell className={task.completed ? "line-through" : ""}>
                {task.title}
              </TableCell>
              <TableCell>{task.content}</TableCell>
              <TableCell>
                {task.dueDate
                  ? format(new Date(task.dueDate), "MMM dd, yyyy")
                  : "-"}
              </TableCell>
              <TableCell className="text-right">
                <Dialog
                  open={editTask !== null}
                  onOpenChange={(open) => !open && setEditTask(null)}
                >
                  <DialogTrigger asChild>
                    <Button
                      className="cursor-pointer"
                      variant="ghost"
                      size="icon"
                      onClick={() => setEditTask(task)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Task</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <Input
                        value={editTask?.title || ""}
                        onChange={(e) =>
                          setEditTask({ ...editTask, title: e.target.value })
                        }
                      />
                      <Input
                        value={editTask?.content || ""}
                        onChange={(e) =>
                          setEditTask({ ...editTask, content: e.target.value })
                        }
                      />
                      <Input
                        type="date"
                        value={editTask?.dueDate?.split("T")[0] || ""}
                        onChange={(e) =>
                          setEditTask({
                            ...editTask,
                            dueDate: e.target.value
                              ? `${e.target.value}T00:00:00.00Z`
                              : null,
                          })
                        }
                      />
                      <Button
                        onClick={handleSaveEdit}
                        className="cursor-pointer"
                      >
                        Save Changes
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
                <Button
                  className="cursor-pointer"
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDeleteTask(task.id)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
