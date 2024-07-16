"use client";

import { useDeleteTodo } from "@/hooks/todos/mutations/useDeleteTodo/useDeleteTodo.hook";
import { useToggleTodoState } from "@/hooks/todos/mutations/useToggleTodoState/useToggleTodoState.hook";
import type { Todo as TTodo } from "@/types/todo.type";
import {
  Circle,
  CircleCheckBig,
  EllipsisIcon,
  Trash2,
  TriangleAlert,
} from "lucide-react";
import { FC, useState } from "react";
import { UpdateTodoForm } from "../forms/todo/updateTodo.form";
import { Modal } from "../modal/modal.component";

export const Todo: FC<TTodo> = (todo) => {
  const { completed, listId, id, title } = todo;
  const [isModalActive, setIsModalActive] = useState(false);
  const { mutate: toggleTodoState } = useToggleTodoState();
  const { mutate: deleteTodo } = useDeleteTodo();

  const handleDeleteTodo = () => deleteTodo({ listId, todoId: id });
  const handleToggleTodoState = () =>
    toggleTodoState({ completed: !completed, listId, todoId: id });

  const handleToggleModal = () => setIsModalActive(!isModalActive);

  return (
    <>
      <Modal isModalActive={isModalActive} toggleModal={setIsModalActive}>
        <div className="flex flex-col items-center justify-center gap-y-5">
          <UpdateTodoForm todo={todo} toggleModal={handleToggleModal} />

          <div className="flex flex-col gap-y-3 w-full pt-5">
            <h3 className="text-left text-xl font-semibold text-red-600 flex items-center gap-x-2">
              Danger Zone <TriangleAlert className="w-6 h-6" />
            </h3>
            <p className="font-light text-lg pb-5">
              Be careful this step is{" "}
              <strong className="text-red-600 font-semibold">
                irreversible
              </strong>
              !
            </p>
            <button
              type="button"
              className="flex p-2 bg-red-600 text-white rounded-md gap-x-2 items-center justify-center"
              onClick={handleDeleteTodo}
            >
              <Trash2 className="w-5 h-5" />
              Delete todo
            </button>
          </div>
        </div>
      </Modal>

      <div className="border bg-white h-min border-black/10 p-6 flex items-center gap-x-3 rounded-md">
        <button type="button" onClick={handleToggleTodoState}>
          {completed ? (
            <CircleCheckBig className="w-5 h-5 text-green-600" />
          ) : (
            <Circle className="w-5 h-5" />
          )}
        </button>

        <h4 className="text-lg">{title}</h4>

        {!completed && (
          <button
            type="button"
            className="flex ml-auto p-2 bg-gray-100 rounded-md border border-black/10"
            onClick={handleToggleModal}
          >
            <EllipsisIcon className="w-5 h-5" />
          </button>
        )}
      </div>
    </>
  );
};
