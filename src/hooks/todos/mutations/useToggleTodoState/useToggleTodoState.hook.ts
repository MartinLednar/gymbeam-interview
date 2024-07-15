import { queryClient } from "@/components/wrappers/queryClient/queryClient.wrapper";
import { Todo } from "@/types/todo.type";
import { axiosClient } from "@/utils/axios.util";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

const fetchToggleTodoState = async ({
  completed,
  listId,
  todoId,
}: {
  listId: string;
  todoId: string;
  completed: boolean;
}) => {
  try {
    const { data } = await axiosClient.put<Todo>(
      `lists/${listId}/todos/${todoId}`,
      { completed }
    );

    return data;
  } catch (error) {
    throw error;
  }
};

export const useToggleTodoState = () =>
  useMutation({
    mutationFn: ({
      completed,
      listId,
      todoId,
    }: {
      listId: string;
      todoId: string;
      completed: boolean;
    }) => {
      const toggleTodoStatePromise = fetchToggleTodoState({
        completed,
        listId,
        todoId,
      });

      toast.promise(toggleTodoStatePromise, {
        success: completed
          ? "Task completed. Good job!"
          : "Moved back to To-Do",
        loading: completed
          ? "Completing task..."
          : "Moving task back to To-Do...",
        error: "Ups, something went wrong!",
      });

      return toggleTodoStatePromise;
    },

    onSuccess: ({ listId }) => {
      queryClient.invalidateQueries({
        queryKey: ["lists", listId],
      });
    },
  });
