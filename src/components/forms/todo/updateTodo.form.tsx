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
import { Button } from "@/components/button/button.component";

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

  const handleToggleEditMode = () => {
    toggleEditMode(!isEditMode);
  };

  const formData = watch();

  const isDataChanged = useMemo(
    () => () => {
      return JSON.stringify(formData) !== JSON.stringify(todo);
    },
    [formData, todo]
  );

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
      <h3 className="text-left text-2xl font-bold">Todo detail</h3>
      <p className="font-light text-lg pb-5">See todo details or update it.</p>

      <label htmlFor="title" className="font-semibold text-lg">
        Title
      </label>
      <Input
        id="title"
        disabled={isPending || !isEditMode}
        {...register("title")}
        fieldError={errors.title?.message}
        placeholder="List title"
      />

      <label htmlFor="dueDate" className="font-semibold text-lg pt-4">
        Due date
      </label>
      <Input
        id="dueDate"
        disabled={isPending || !isEditMode}
        type="date"
        {...register("dueDate")}
      />

      <label htmlFor="priority" className="font-semibold text-lg pt-4">
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

      <label htmlFor="description" className="font-semibold text-lg pt-4">
        Task description
      </label>
      <textarea
        disabled={!isEditMode}
        id="description"
        {...register("description")}
        className={inputStyleVariants()}
      />

      <div className="flex items-center gap-x-3 pt-5">
        <Button
          type="submit"
          disabled={!isDataChanged() || isPending}
          className="flex-1"
        >
          <Save className="w-5 h-5" />
          Save
        </Button>

        <Button
          type="button"
          intent={"orangeEmpty"}
          disabled={isPending}
          onClick={handleToggleEditMode}
          className={`flex-1 ${isEditMode ? "bg-orange-500 text-white" : ""}`}
        >
          <Edit className="w-5 h-5" />
          Edit
        </Button>
      </div>
    </form>
  );
};
