import { queryClient } from "@/components/wrappers/queryClient/queryClient.wrapper";
import { Todo } from "@/types/todo.type";
import { axiosClient } from "@/utils/axios.util";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

const fetchUpdateTodo = async ({
  listId,
  id: todoId,
  ...otherData
}: Partial<Todo>) => {
  try {
    const { data } = await axiosClient.put<Todo>(`todos`, {
      listId,
      id: todoId,
      ...otherData,
    });

    return data;
  } catch (error) {
    throw error;
  }
};

export const useUpdateTodo = () =>
  useMutation({
    mutationFn: (todo: Partial<Todo>) => {
      const updateTodoPromise = fetchUpdateTodo(todo);

      toast.promise(updateTodoPromise, {
        success: "To-Do updated successfully!",
        loading: "Updating To-Do...",
        error: "Ups, something went wrong!",
      });

      return updateTodoPromise;
    },
    onSuccess: ({ listId }) => {
      queryClient.invalidateQueries({ queryKey: ["lists", listId] });
    },
  });
