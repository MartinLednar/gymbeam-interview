"use client";

import Input from "@/components/input/input.component";
import { Modal } from "@/components/modal/modal.component";
import { useCreateList } from "@/hooks/lists/mutations/useCreateList.hook";
import {
  createListSchema,
  TCreateList,
} from "@/schemas/lists/createList.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, X } from "lucide-react";
import { useState } from "react";
import { createPortal } from "react-dom";
import { SubmitHandler, useForm } from "react-hook-form";

export const CreateListForm = () => {
  const [isModalActive, setIsModalActive] = useState(false);
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
    <>
      <button
        className="flex gap-x-3 rounded-md items-center justify-center p-2 px-4 bg-green-600 text-white"
        onClick={() => setIsModalActive(!isModalActive)}
      >
        Add <Plus className="w-5 h-5" />
      </button>

      <Modal isModalActive={isModalActive} toggleModal={setIsModalActive}>
        <form
          className="flex flex-col gap-y-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h3 className="text-left text-xl">New list</h3>
          <p className="font-light text-lg pb-5">
            Choose title for the new list
          </p>
          <Input
            disabled={isPending}
            fieldError={errors.title?.message}
            {...register("title")}
            placeholder="List title"
          />
          <button
            className="mt-1 p-3 rounded-md border-2 border-green-500 text-center transition-colors duration-500 hover:bg-green-500 hover:text-white disabled:opacity-50"
            disabled={isPending}
          >
            Submit
          </button>
        </form>
      </Modal>
    </>
  );
};
