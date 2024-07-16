import { Todo } from "@/types/todo.type";

export const calcDoneTodos = (todos?: Todo[]) => {
  if (todos) {
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
  } else {
    return {
      doneTodos: {
        todos: [],
        total: 0,
      },
      undoneTodos: {
        todos: [],
        total: 0,
      },
    };
  }
};
