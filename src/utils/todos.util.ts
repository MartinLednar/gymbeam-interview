import { Todo } from "@/types/todo.type";

export const calcDoneTodos = (todos: Todo[]) => {
  const doneTodos = todos.filter(({ completed }) => {
    return completed === true;
  });

  const undoneTodos = todos.filter(({ completed }) => {
    return completed === false;
  });

  return {
    doneTodos: {
      todos: doneTodos,
      total: doneTodos.length,
    },
    undoneTodos: {
      todos: undoneTodos,
      total: todos.length - doneTodos.length,
    },
  };
};
