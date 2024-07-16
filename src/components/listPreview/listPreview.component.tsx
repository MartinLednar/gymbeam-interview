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
  const { id, createdAt, title, totalTodos, bgColor } = listData;
  const filteredTodos = useMemo(() => calcDoneTodos(totalTodos), [totalTodos]);

  return (
    <div className="flex-1 h-max rounded-md overflow-hidden border border-gray-600/20 shadow-sm">
      <div
        className="h-min pb-3 px-4 pt-10 bg-gradient-to-tr to-[#468585] from-[#50B498]"
        style={{ backgroundColor: bgColor }}
      >
        <h2 className="font-semibold text-2xl text-white">{title}</h2>
      </div>

      <div className="p-3 flex flex-col gap-y-1">
        <h3 className="text-lg">
          Created: {new Date(createdAt).toLocaleDateString()}
        </h3>
        <h3 className="text-lg">Total todos: {totalTodos.length}</h3>
        <div className="flex gap-x-3 p-2">
          <div className="flex flex-col flex-1 items-center justify-center p-3 gap-y-2">
            <p className="text-lg font-light">
              {filteredTodos.doneTodos.total}
            </p>
            <ListChecks />
          </div>

          <div className="flex flex-col flex-1 items-center justify-center p-5 gap-y-2">
            <p className="text-lg font-light">
              {filteredTodos.undoneTodos.total}
            </p>
            <LayoutList />
          </div>
        </div>
        <Link
          href={`/lists/${id}`}
          className="p-3 rounded-md border-2 border-green-500 text-center transition-colors duration-500 hover:bg-green-500 hover:text-white"
        >
          Go to list
        </Link>
      </div>
    </div>
  );
};

export default ListPreview;
