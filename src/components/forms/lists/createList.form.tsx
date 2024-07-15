"use client";

import { useCreateList } from "@/hooks/lists/mutations/useCreateList.hook";
import {
  createListSchema,
  TCreateList,
} from "@/schemas/lists/createList.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

export const CreateListForm = () => {
  const { mutate, isPending } = useCreateList();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TCreateList>({
    resolver: zodResolver(createListSchema.pick({ title: true })),
    defaultValues: {
      title: "",
    },
  });

  const onSubmit: SubmitHandler<TCreateList> = (data) => {
    mutate({ ...data, createdAt: new Date().toISOString() });
    reset();
  };

  return (
    <form
      className="flex flex-col items-center justify-center gap-y-3"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        disabled={isPending}
        {...register("title")}
        className="w-max border border-black/10 p-5"
        placeholder="List title"
      />
      <button disabled={isPending}>Submit</button>
    </form>
  );
};
