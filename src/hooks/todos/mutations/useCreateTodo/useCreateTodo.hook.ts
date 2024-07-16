import { queryClient } from "@/components/wrappers/queryClient/queryClient.wrapper";
import {
  createTodoSchema,
  TCreateTodo,
} from "@/schemas/todo/createTodo.schema";
import { Todo } from "@/types/todo.type";
import { axiosClient } from "@/utils/axios.util";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

const fetchCreateTodo = async (todoData: TCreateTodo) => {
  try {
    const validatedData = createTodoSchema.parse(todoData);

    const { data } = await axiosClient.post<Todo>(
      `lists/${validatedData.listId}/todos`,
      {
        ...validatedData,
        completed: false,
        createdAt: new Date().toISOString(),
      } satisfies Omit<Todo, "id">
    );

    return data;
  } catch (error) {
    throw error;
  }
};

export const useCreateTodo = () =>
  useMutation({
    mutationFn: (todoData: TCreateTodo) => {
      const createTodoPromise = fetchCreateTodo(todoData);

      toast.promise(createTodoPromise, {
        success: "To-do created successfully!",
        loading: "Creating to-do...",
        error: "Ups, something went wrong!",
      });

      return createTodoPromise;
    },
    onSuccess: ({ listId }) => {
      queryClient.invalidateQueries({ queryKey: ["lists", listId] });
    },
  });
