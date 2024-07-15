"use client";

import { useDeleteTodo } from "@/hooks/todos/mutations/useDeleteTodo/useDeleteTodo.hook";
import { useToggleTodoState } from "@/hooks/todos/mutations/useToggleTodoState/useToggleTodoState.hook";
import type { Todo as TTodo } from "@/types/todo.type";
import {
  Circle,
  CircleCheckBig,
  Edit,
  Square,
  SquareCheckBig,
  Trash2,
} from "lucide-react";
import { FC, useState } from "react";
import { UpdateTodoForm } from "../forms/todo/updateTodo.form";

export const Todo: FC<TTodo> = ({
  completed,
  listId,
  id,
  title,
  description,
  createdAt,
}) => {
  const [isEditMode, setEditMode] = useState(false);
  const { mutate: toggleTodoState } = useToggleTodoState();
  const { mutate: deleteTodo } = useDeleteTodo();

  const handleDeleteTodo = () => deleteTodo({ listId, todoId: id });
  const handleToggleTodoState = () =>
    toggleTodoState({ completed: !completed, listId, todoId: id });

  const handleToggleEditMode = () => setEditMode(!isEditMode);

  return (
    <>
      <div
        className={`absolute top-0 left-0 w-full h-full z-30 bg-black/20 ${
          !isEditMode ? "hidden" : "block"
        }`}
      ></div>
      <div
        className={`border bg-white h-min border-black/10 p-6 flex items-center gap-x-2 ${
          !isEditMode ? "" : "z-40"
        }`}
      >
        <button type="button" onClick={handleToggleTodoState}>
          {completed ? (
            <CircleCheckBig className="w-5 h-5 text-green-600" />
          ) : (
            <Circle className="w-5 h-5" />
          )}
        </button>

        <UpdateTodoForm
          listId={listId}
          todoId={id}
          isEditMode={isEditMode}
          toggleEditMode={setEditMode}
          title={title}
        />

        <button
          type="button"
          className="flex p-2 ml-auto bg-red-600 text-white rounded-md"
          onClick={handleDeleteTodo}
        >
          <Trash2 className="w-5 h-5" />
        </button>
        <button
          type="button"
          className="flex ml-auto p-2 bg-orange-600 text-white rounded-md"
          onClick={handleToggleEditMode}
        >
          <Edit className="w-5 h-5" />
        </button>
      </div>
    </>
  );
};
