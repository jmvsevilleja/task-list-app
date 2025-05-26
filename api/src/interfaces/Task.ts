export interface Task {
  id: number;
  title: string;
  content: string | null;
  completed: boolean;
  dueDate: Date | null;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}