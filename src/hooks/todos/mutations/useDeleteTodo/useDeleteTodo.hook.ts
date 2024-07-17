import { queryClient } from "@/components/wrappers/queryClient/queryClient.wrapper";
import { Todo } from "@/types/todo.type";
import { axiosClient } from "@/utils/axios.util";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

const fetchDeleteTodo = async ({
  todoId,
  listId,
}: {
  todoId: string;
  listId: string;
}) => {
  try {
    const { data } = await axiosClient.delete<Todo>(`todos`, {
      data: {
        listId,
        todoId,
      },
    });

    return data;
  } catch (error) {
    throw error;
  }
};

export const useDeleteTodo = () =>
  useMutation({
    mutationFn: ({ todoId, listId }: { todoId: string; listId: string }) => {
      const deleteTodoPromise = fetchDeleteTodo({ todoId, listId });

      toast.promise(deleteTodoPromise, {
        success: "Todo deleted successfully!",
        loading: "Deleting todo...",
        error: "Ups, something went wrong!",
      });

      return deleteTodoPromise;
    },
    onSuccess: ({ listId }) => {
      queryClient.invalidateQueries({ queryKey: ["lists", listId] });
    },
  });
