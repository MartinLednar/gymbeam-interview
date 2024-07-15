"use client";

import { useUpdateTodo } from "@/hooks/todos/mutations/useUpdateTodo/useUpdateTodo.hook";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

export const UpdateTodoForm = ({
  title,
  listId,
  todoId,
  isEditMode,
  toggleEditMode,
}: {
  listId: string;
  todoId: string;
  toggleEditMode: Dispatch<SetStateAction<boolean>>;
  title: string;
  isEditMode: boolean;
}) => {
  const { register, reset, handleSubmit, watch } = useForm<{ title: string }>({
    resolver: zodResolver(
      z.object({ title: z.string({ required_error: "Required" }).min(1) })
    ),
    defaultValues: {
      title,
    },
  });
  const { mutateAsync, isPending } = useUpdateTodo();

  const titleFormValue = watch("title");

  const onSubmit: SubmitHandler<{ title: string }> = async (data) => {
    try {
      await mutateAsync({ listId, todoId, title: data.title });
      toggleEditMode(!isEditMode);
    } catch (error) {
      toggleEditMode(!isEditMode);
      reset();
    }
  };

  return (
    <form className="flex" onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("title")}
        disabled={!isEditMode}
        className={`p-3 ${
          !isEditMode ? "bg-transparent" : "border border-green-600"
        }`}
      />

      {isEditMode || titleFormValue !== title ? (
        <button
          type="submit"
          disabled={titleFormValue === title || !isEditMode || isPending}
          className="bg-gray-200 p-2 rounded-md h-max disabled:opacity-50"
        >
          <Save className="w-5 h-5" />
        </button>
      ) : null}
    </form>
  );
};
