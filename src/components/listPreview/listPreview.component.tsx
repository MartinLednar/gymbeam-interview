"use client";

import { FC, useMemo } from "react";
import Link from "../link/link.component";
import { List } from "@/types/list.type";
import { calcDoneTodos } from "@/utils/todos.util";
import { ListChecks, LayoutList, Trash2 } from "lucide-react";
import { useDeleteList } from "@/hooks/lists/mutations/useDeleteList.hook";

interface Props {
  listData: List;
}

export const ListPreview: FC<Props> = ({ listData }) => {
  const { id, createdAt, title, totalTodos } = listData;
  const filteredTodos = useMemo(() => calcDoneTodos(totalTodos), [totalTodos]);

  return (
    <div className="p-5 border border-black/10 flex flex-col">
      <h2 className="font-semibold">{title}</h2>
      <h3>Created: {new Date(createdAt).toLocaleDateString()}</h3>
      <h3>Total todos: {totalTodos.length}</h3>
      <div className="flex gap-x-3">
        <div className="flex flex-col flex-1 items-center justify-center p-5">
          <h4>Done</h4>
          <ListChecks />
          <p>{filteredTodos.doneTodos.total}</p>
        </div>

        <div className="flex flex-col flex-1 items-center justify-center p-5">
          <h4>Undone</h4>
          <LayoutList />
          <p>{filteredTodos.undoneTodos.total}</p>
        </div>
      </div>
      <Link
        href={`/lists/${id}`}
        className="px-3 py-5 border-2 border-green-500 text-center"
      >
        Go to list
      </Link>
    </div>
  );
};

export default ListPreview;
