import { TodoPriority } from "@/components/forms/todo/createTodo.form";

export type Todo = {
  id: string;
  listId: string;
  createdAt: string;
  title: string;
  description: string;
  completed: boolean;
  dueDate: string;
  priority: "Low" | "Medium" | "High";
};
