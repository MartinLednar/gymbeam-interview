import { Todo } from "./todo.type";

export type List = {
  id: string;
  createdAt: string;
  title: string;
  totalTodos: Todo[];
};
