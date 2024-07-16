"use client";

import { CreateTodoForm } from "@/components/forms/todo/createTodo.form";
import { Modal } from "@/components/modal/modal.component";
import { Todo } from "@/components/todo/todo.component";
import { useDeleteList } from "@/hooks/lists/mutations/useDeleteList.hook";
import { useGetList } from "@/hooks/lists/queries/useGetList/useGetList.hook";
import { calcDoneTodos } from "@/utils/todos.util";
import { CircleCheckBig, Plus, Trash2 } from "lucide-react";

import { useParams, useRouter } from "next/navigation";
import { useMemo, useState } from "react";

const ListPage = () => {
  const { listId } = useParams<{ listId: string }>();
  const { push } = useRouter();
  const { isLoading, isSuccess, isError, data } = useGetList({ listId });
  const { mutateAsync } = useDeleteList();
  const [isAddTodoModalActive, setIsAddTodoModalActive] = useState(false);

  const filteredTodos = useMemo(() => calcDoneTodos(data?.totalTodos), [data]);

  const handleDeleteList = async () => {
    await mutateAsync({ id: listId });
    push("/");
  };

  return (
    <div className="container mx-auto py-10 px-4">
      {isSuccess ? (
        <>
          <div className="flex items-center justify-between border-b border-b-black/10 pb-5">
            <div className="flex flex-col gap-y-2">
              <h1 className="text-4xl font-bold">{data.title}</h1>
              <p className="text-lg font-light">
                Created: {new Date(data.createdAt).toLocaleDateString()}
              </p>
            </div>
            <button
              onClick={handleDeleteList}
              type="button"
              className="flex gap-x-1 p-2 ml-auto bg-red-600 text-white rounded-md"
            >
              <Trash2 className="w-5 h-5 " />
              Delete list
            </button>
          </div>

          <div className="max-w-xl  mx-auto pt-20">
            <div className="flex items-center justify-between pb-6 border-b border-b-black/10">
              <h2 className="text-2xl font-semibold ">To-Do</h2>

              <button
                className="flex gap-x-3 rounded-md items-center justify-center p-2 px-4 bg-green-600 text-white"
                onClick={() => setIsAddTodoModalActive(!isAddTodoModalActive)}
              >
                Add <Plus className="w-5 h-5" />
              </button>
            </div>
            <div className="max-h-[50svh] overflow-y-scroll flex flex-col gap-y-3 pt-5">
              {filteredTodos && filteredTodos.undoneTodos.total > 0
                ? filteredTodos.undoneTodos.todos.map((todo) => (
                    <Todo key={todo.id} {...todo} />
                  ))
                : null}
            </div>
            <Modal
              isModalActive={isAddTodoModalActive}
              toggleModal={setIsAddTodoModalActive}
            >
              <CreateTodoForm listId={listId} />
            </Modal>
          </div>

          <div className="max-w-xl  mx-auto pt-20">
            <h2 className="text-2xl font-semibold pb-6">Completed tasks</h2>
            <div className="max-h-[50svh] overflow-y-scroll flex flex-col gap-y-3">
              {filteredTodos && filteredTodos.doneTodos.total > 0
                ? filteredTodos.doneTodos.todos.map((todo) => (
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
