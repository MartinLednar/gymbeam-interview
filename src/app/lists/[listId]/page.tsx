"use client";

import { CreateTodoForm } from "@/components/forms/todo/createTodo.form";
import { Modal } from "@/components/modal/modal.component";
import { TodoSkeleton } from "@/components/skeletons/todo.skeleton";
import { Todo } from "@/components/todo/todo.component";
import { useDeleteList } from "@/hooks/lists/mutations/useDeleteList.hook";
import { useGetList } from "@/hooks/lists/queries/useGetList/useGetList.hook";
import { calcDoneTodos } from "@/utils/todos.util";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, Trash2, TriangleAlert } from "lucide-react";

import { useParams, useRouter } from "next/navigation";
import { useMemo, useState } from "react";

const ListPage = () => {
  const { listId } = useParams<{ listId: string }>();
  const { push } = useRouter();
  const { isLoading, isSuccess, data } = useGetList({ listId });
  const { mutateAsync } = useDeleteList();
  const [isAddTodoModalActive, toggleAddTodoModalActive] = useState(false);
  const [isDeleteListModalActive, toggleDeleteListModal] = useState(false);

  const filteredTodos = useMemo(() => calcDoneTodos(data?.totalTodos), [data]);

  const handleDeleteList = async () => {
    await mutateAsync({ id: listId });
    push("/");
  };

  return (
    <div className="container mx-auto py-10 px-4">
      {isLoading ? (
        <>
          <div className="flex items-center justify-between border-b border-b-gray-600/30 pb-5">
            <div className="h-8 w-1/4 bg-gray-600/30 animate-pulse rounded-md" />
            <div className="h-8 w-1/6 bg-gray-600/30 animate-pulse rounded-md" />
          </div>
          <div className="flex flex-col gap-y-3 max-w-lg mx-auto pt-10">
            <TodoSkeleton />
            <TodoSkeleton />
            <TodoSkeleton />
            <TodoSkeleton />
          </div>
        </>
      ) : null}
      {isSuccess ? (
        <>
          <div className="flex items-center justify-between border-b border-b-gray-600/30 pb-5">
            <div className="flex flex-col gap-y-2">
              <h1 className="text-4xl font-bold">{data.title}</h1>
              <p className="text-lg font-light">
                Created: {new Date(data.createdAt).toLocaleDateString()}
              </p>
            </div>
            <button
              onClick={() => toggleDeleteListModal(!isDeleteListModalActive)}
              type="button"
              className="flex gap-x-1 p-2 ml-auto bg-red-600 text-white rounded-md"
            >
              <Trash2 className="w-5 h-5 " />
              Delete list
            </button>
            <Modal
              toggleModal={toggleDeleteListModal}
              isModalActive={isDeleteListModalActive}
            >
              <div className="w-full">
                <div className="flex flex-col gap-y-3 w-full">
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
                    onClick={handleDeleteList}
                  >
                    <Trash2 className="w-5 h-5" />
                    Delete List
                  </button>
                </div>
              </div>
            </Modal>
          </div>

          <div className="max-w-lg mx-auto pt-20">
            <div className="flex items-center justify-between pb-6 border-b-2 border-b-gray-600/30">
              <h2 className="text-2xl font-semibold ">To-Do</h2>

              <button
                className="flex gap-x-3 rounded-md items-center justify-center p-2 px-4 bg-green-600 text-white"
                onClick={() => toggleAddTodoModalActive(!isAddTodoModalActive)}
              >
                Add <Plus className="w-5 h-5" />
              </button>
            </div>

            <motion.div
              layout
              className="max-h-[50svh] overflow-y-scroll flex flex-col gap-y-3 pt-5"
            >
              {filteredTodos && filteredTodos.undoneTodos.total > 0 ? (
                filteredTodos.undoneTodos.todos.map((todo) => (
                  <Todo key={todo.id} {...todo} />
                ))
              ) : (
                <p className="text-lg font-light text-center">
                  No todos to do...
                </p>
              )}
            </motion.div>
            <Modal
              isModalActive={isAddTodoModalActive}
              toggleModal={toggleAddTodoModalActive}
            >
              <CreateTodoForm listId={listId} />
            </Modal>
          </div>

          <div className="max-w-lg mx-auto pt-20">
            <h2 className="text-2xl font-semibold pb-6 border-b-2 border-b-gray-600/30">
              Completed tasks
            </h2>
            <motion.div
              layout
              className="max-h-[50svh] overflow-y-scroll flex flex-col gap-y-3 pt-5"
            >
              {filteredTodos && filteredTodos.doneTodos.total > 0 ? (
                filteredTodos.doneTodos.todos.map((todo) => (
                  <Todo key={todo.id} {...todo} />
                ))
              ) : (
                <p className="text-lg font-light text-center">
                  Ready for great accomplishments...
                </p>
              )}
            </motion.div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default ListPage;
