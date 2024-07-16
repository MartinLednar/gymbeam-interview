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

export const UpdateTodoForm = ({
  todo,
  toggleModal,
}: {
  todo: Todo;
  toggleModal: () => void;
}) => {
  const { listId, id: todoId } = todo;
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

  const onSubmit: SubmitHandler<TUpdateTodo> = async (data) => {
    try {
      await mutateAsync({ listId, todoId, title: data.title });
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
      <input
        id="title"
        disabled={isPending || !isEditMode}
        {...register("title")}
        className=" border-2 rounded-md border-black/10 py-4 px-3 outline-none focus:border-black/30"
        placeholder="List title"
      />

      <label htmlFor="priority" className="font-light pt-2">
        Task priority
      </label>
      <select
        id="priority"
        disabled={!isEditMode}
        {...register("priority")}
        defaultValue={TodoPriority.medium.title}
        className="p-3 border-2 border-black/10 rounded-md"
      >
        <option value={TodoPriority.low.title}>Low</option>

        <option value={TodoPriority.medium.title}>Medium</option>

        <option value={TodoPriority.high.title}>High</option>
      </select>

      <label htmlFor="dueDate" className="font-light pt-2">
        Due date
      </label>
      <input
        id="dueDate"
        disabled={isPending || !isEditMode}
        type="date"
        {...register("dueDate")}
        className=" border-2 rounded-md border-black/10 py-4 px-3 outline-none focus:border-black/30"
      />

      <label htmlFor="description" className="font-light pt-2">
        Task description
      </label>
      <textarea
        disabled={!isEditMode}
        id="description"
        {...register("description")}
        className="p-3 border-2 border-black/10 rounded-md"
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
