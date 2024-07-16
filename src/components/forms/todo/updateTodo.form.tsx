"use client";

import { useUpdateTodo } from "@/hooks/todos/mutations/useUpdateTodo/useUpdateTodo.hook";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit, Save } from "lucide-react";
import { useMemo, useState, type Dispatch, type SetStateAction } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { TodoPriority } from "./createTodo.form";
import { Todo } from "@/types/todo.type";
import {
  createTodoSchema,
  TUpdateTodo,
} from "@/schemas/todo/createTodo.schema";
import Input, { inputStyleVariants } from "@/components/input/input.component";

export const UpdateTodoForm = ({
  todo,
  toggleModal,
}: {
  todo: Todo;
  toggleModal: () => void;
}) => {
  const { listId, id, createdAt, completed } = todo;
  const {
    register,
    reset,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TUpdateTodo>({
    resolver: zodResolver(createTodoSchema),
    defaultValues: {
      ...todo,
    },
  });
  const [isEditMode, toggleEditMode] = useState(false);
  const { mutateAsync, isPending } = useUpdateTodo();

  const handleToggleEditMode = () => toggleEditMode(!isEditMode);

  const formData = watch();

  const isDataChanged = useMemo(
    () => () => {
      return JSON.stringify(formData) !== JSON.stringify(todo);
    },
    [formData, todo]
  );

  console.log("errors", errors);

  const onSubmit: SubmitHandler<TUpdateTodo> = async (data) => {
    try {
      await mutateAsync({ ...data, listId, id, createdAt, completed });
      handleToggleEditMode();
    } catch (error) {
      toggleModal();
      reset();
    }
  };

  return (
    <form
      className="flex flex-col gap-y-2 w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h3 className="text-left text-xl font-semibold">Todo detail</h3>
      <p className="font-light text-lg pb-5">See todo details or update it.</p>

      <label htmlFor="title" className="font-light pt-2">
        Title
      </label>
      <Input
        id="title"
        disabled={isPending || !isEditMode}
        {...register("title")}
        placeholder="List title"
      />

      <label htmlFor="dueDate" className="font-light pt-2">
        Due date
      </label>
      <Input
        id="dueDate"
        disabled={isPending || !isEditMode}
        type="date"
        {...register("dueDate")}
      />

      <label htmlFor="priority" className="font-light pt-2">
        Task priority
      </label>
      <select
        id="priority"
        disabled={!isEditMode}
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
        disabled={!isEditMode}
        id="description"
        {...register("description")}
        className={inputStyleVariants()}
      />

      <div className="flex items-center gap-x-3 pt-3">
        <button
          type="submit"
          disabled={!isDataChanged() || isPending}
          className="flex-1 flex items-center justify-center gap-x-2 p-3 rounded-md border-2 border-green-500 text-center transition-colors duration-500 hover:bg-green-500 hover:text-white disabled:opacity-50 disabled:pointer-events-none"
        >
          <Save className="w-5 h-5" />
          Save
        </button>

        <button
          type="button"
          disabled={isPending}
          onClick={handleToggleEditMode}
          className={`flex-1 flex items-center justify-center gap-x-2 p-3 rounded-md border-2 border-orange-500 text-center transition-colors duration-500 hover:bg-orange-500 hover:text-white disabled:opacity-50 disabled:pointer-events-none ${
            isEditMode ? "bg-orange-500 text-white" : ""
          }`}
        >
          <Edit className="w-5 h-5" />
          Edit
        </button>
      </div>
    </form>
  );
};
