"use client";

import { useDeleteTodo } from "@/hooks/todos/mutations/useDeleteTodo/useDeleteTodo.hook";
import { useToggleTodoState } from "@/hooks/todos/mutations/useToggleTodoState/useToggleTodoState.hook";
import type { Todo as TTodo } from "@/types/todo.type";
import {
  CalendarClock,
  Circle,
  CircleCheckBig,
  EllipsisIcon,
  Square,
  Trash2,
  TriangleAlert,
} from "lucide-react";
import { FC, useState } from "react";
import { UpdateTodoForm } from "../forms/todo/updateTodo.form";
import { Modal } from "../modal/modal.component";
import { TodoPriority } from "../forms/todo/createTodo.form";

export const Todo: FC<TTodo> = (todo) => {
  const { completed, listId, id, title, description, dueDate, priority } = todo;
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

      <div className="border flex flex-col bg-white dark:bg-dark h-min border-gray-600/30 p-6 items-center gap-x-3 rounded-md">
        <div className="flex items-center justify-between w-full">
          <button type="button" onClick={handleToggleTodoState}>
            {completed ? (
              <CircleCheckBig className="w-6 h-6 text-green-600" />
            ) : (
              <Square className="w-6 h-6" />
            )}
          </button>
          <button
            type="button"
            className="flex ml-auto p-2 bg-gray-100 dark:bg-transparent rounded-md border border-gray/30"
            onClick={handleToggleModal}
          >
            <EllipsisIcon className="w-5 h-5" />
          </button>
        </div>

        <div className="w-full pt-5">
          <div className="flex items-center justify-between">
            <span
              className="rounded-full font-medium py-1 text-sm px-2 w-max text-white"
              style={{ backgroundColor: TodoPriority[priority].color }}
            >
              {priority}
            </span>

            <p className="flex items-center justify-center gap-x-2">
              <CalendarClock className="w-5 h-5" />{" "}
              {dueDate ? new Date(dueDate).toLocaleDateString() : "No due date"}
            </p>
          </div>

          <h4 className="text-xl pt-5 pb-3">{title}</h4>
          <p className="truncate max-w-sm">{description}</p>
        </div>
      </div>
    </>
  );
};
