"use client";

import { useCreateTodo } from "@/hooks/todos/mutations/useCreateTodo/useCreateTodo.hook";
import {
  createTodoSchema,
  TCreateTodo,
} from "@/schemas/todo/createTodo.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

export const CreateTodoForm = ({ listId }: { listId: string }) => {
  const { register, reset, handleSubmit } = useForm<TCreateTodo>({
    resolver: zodResolver(createTodoSchema),
    defaultValues: { title: "", listId },
  });
  const { mutate: createTodo, isPending } = useCreateTodo();

  const onSubmit: SubmitHandler<TCreateTodo> = (data) => {
    createTodo(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        disabled={isPending}
        {...register("title")}
        className="w-max border border-black/10 p-5"
        placeholder="Todo title"
      />
      <button disabled={isPending}>Submit</button>
    </form>
  );
};
