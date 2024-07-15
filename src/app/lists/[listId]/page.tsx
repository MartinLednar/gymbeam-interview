"use client";

import { CreateTodoForm } from "@/components/forms/todo/createTodo.form";
import { Todo } from "@/components/todo/todo.component";
import { useGetList } from "@/hooks/lists/queries/useGetList/useGetList.hook";
import { CircleCheckBig, Trash2 } from "lucide-react";

import { useParams } from "next/navigation";

const ListPage = () => {
  const { listId } = useParams<{ listId: string }>();
  const { isLoading, isSuccess, isError, data } = useGetList({ listId });

  return (
    <div className="container mx-auto py-10 px-4">
      {isSuccess ? (
        <>
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-y-2">
              <h1 className="text-4xl font-bold">{data.title}</h1>
              <p>Created: {new Date(data.createdAt).toLocaleDateString()}</p>
            </div>
            <button
              type="button"
              className="flex gap-x-1 p-2 ml-auto bg-red-600 text-white rounded-md"
            >
              <Trash2 className="w-5 h-5 " />
              Delete list
            </button>
          </div>

          <div className="max-w-xl  mx-auto pt-20">
            <h2 className="text-2xl font-semibold pb-6">To-Do</h2>
            <div className="max-h-[50svh] overflow-y-scroll flex flex-col gap-y-3">
              {data.totalTodos.length > 0
                ? data.totalTodos.map((todo) => (
                    <Todo key={todo.id} {...todo} />
                  ))
                : null}
            </div>
            <CreateTodoForm listId={listId} />
          </div>

          <div className="max-w-2xl max-h-[50svh] overflow-y-scroll flex flex-col gap-y-3 mx-auto pt-20">
            <h2 className="text-2xl font-semibold pb-6">Completed tasks</h2>
            <div className="max-h-[50svh] overflow-y-scroll flex flex-col gap-y-3">
              {data.totalTodos.length > 0
                ? data.totalTodos.map((todo) => (
                    <Todo key={todo.id} {...todo} />
                  ))
                : null}
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default ListPage;
