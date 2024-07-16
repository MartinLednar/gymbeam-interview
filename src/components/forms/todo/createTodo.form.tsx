"use client";

import { useCreateTodo } from "@/hooks/todos/mutations/useCreateTodo/useCreateTodo.hook";
import {
  createTodoSchema,
  TCreateTodo,
} from "@/schemas/todo/createTodo.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { color } from "framer-motion";
import { SubmitHandler, useForm } from "react-hook-form";

export const TodoPriority = {
  low: { title: "Low", color: "green" },
  medium: { title: "Medium", color: "orange" },
  high: { title: "High", color: "Red" },
} as const;

export const CreateTodoForm = ({ listId }: { listId: string }) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<TCreateTodo>({
    resolver: zodResolver(createTodoSchema),
    defaultValues: { title: "", listId },
  });
  const { mutate: createTodo, isPending } = useCreateTodo();

  const onSubmit: SubmitHandler<TCreateTodo> = (data) => {
    createTodo(data);
    reset();
  };

  console.log("erros", errors);

  return (
    <form
      className="flex flex-col gap-y-2 w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h3 className="text-left text-xl">New todo</h3>
      <p className="font-light text-lg pb-5">
        Create new task and get down on it!
      </p>

      <label htmlFor="dueDate" className="font-light pt-2">
        Todo title <span className="text-red-500">*</span>
      </label>
      <input
        disabled={isPending}
        {...register("title")}
        className="border-2 rounded-md border-black/10 py-4 px-3 outline-none focus:border-black/30"
        placeholder="List title"
      />

      <label htmlFor="dueDate" className="font-light pt-2">
        Due date
      </label>
      <input
        id="dueDate"
        disabled={isPending}
        type="date"
        {...register("dueDate")}
        className=" border-2 rounded-md border-black/10 py-4 px-3 outline-none focus:border-black/30"
        placeholder="List title"
      />

      <label htmlFor="priority" className="font-light pt-2">
        Task priority
      </label>
      <select
        id="priority"
        {...register("priority")}
        defaultValue={TodoPriority.medium.title}
        className="p-3 border-2 border-black/10 rounded-md"
      >
        <option value={TodoPriority.low.title}>Low</option>

        <option value={TodoPriority.medium.title}>Medium</option>

        <option value={TodoPriority.high.title}>High</option>
      </select>

      <label htmlFor="description" className="font-light pt-2">
        Task description
      </label>
      <textarea
        id="description"
        {...register("description")}
        className="p-3 border-2 border-black/10 rounded-md"
      />

      <button
        className="p-3 mt-5 rounded-md border-2 border-green-500 text-center transition-colors duration-500 hover:bg-green-500 hover:text-white disabled:opacity-50"
        disabled={isPending}
      >
        Submit
      </button>
    </form>
  );
};
