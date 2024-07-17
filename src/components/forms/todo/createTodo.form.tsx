"use client";

import { Button } from "@/components/button/button.component";
import Input, { inputStyleVariants } from "@/components/input/input.component";
import { useCreateTodo } from "@/hooks/todos/mutations/useCreateTodo/useCreateTodo.hook";
import {
  createTodoSchema,
  TCreateTodo,
} from "@/schemas/todo/createTodo.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { color } from "framer-motion";
import { SubmitHandler, useForm } from "react-hook-form";

export const TodoPriority = {
  Low: { title: "Low", color: "green" },
  Medium: { title: "Medium", color: "darkOrange" },
  High: { title: "High", color: "red" },
} as const;

export const CreateTodoForm = ({ listId }: { listId: string }) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<TCreateTodo>({
    resolver: zodResolver(createTodoSchema),
    defaultValues: { title: "", priority: TodoPriority.Medium.title, listId },
  });
  const { mutate: createTodo, isPending } = useCreateTodo();

  const onSubmit: SubmitHandler<TCreateTodo> = (data) => {
    createTodo(data);
    reset();
  };

  return (
    <form
      className="flex flex-col gap-y-2 w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h3 className="text-left text-xl">New todo</h3>
      <p className="font-light text-lg pb-5">
        Create new task and get down on it!
      </p>

      <label htmlFor="title" className="font-light pt-2">
        Todo title <span className="text-red-500">*</span>
      </label>
      <Input
        id="title"
        disabled={isPending}
        {...register("title")}
        placeholder="Todo title"
      />

      <label htmlFor="dueDate" className="font-light pt-2">
        Due date
      </label>
      <Input
        id="dueDate"
        disabled={isPending}
        type="date"
        {...register("dueDate")}
        placeholder="Due date of todo"
      />

      <label htmlFor="priority" className="font-light pt-2">
        Task priority
      </label>
      <select
        id="priority"
        {...register("priority")}
        className={inputStyleVariants({ className: "cursor-pointer" })}
      >
        <option value={TodoPriority.Low.title}>Low</option>

        <option value={TodoPriority.Medium.title}>Medium</option>

        <option value={TodoPriority.High.title}>High</option>
      </select>

      <label htmlFor="description" className="font-light pt-2">
        Task description
      </label>
      <textarea
        id="description"
        {...register("description")}
        className={inputStyleVariants()}
      />

      <Button className="mt-5" disabled={isPending}>
        Submit
      </Button>
    </form>
  );
};
