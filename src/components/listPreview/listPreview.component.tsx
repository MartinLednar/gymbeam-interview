"use client";

import { FC, useMemo } from "react";
import Link from "../link/link.component";
import { List } from "@/types/list.type";
import { calcDoneTodos } from "@/utils/todos.util";
import { ListChecks, LayoutList, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  listData: List;
}

export const ListPreview: FC<Props> = ({ listData }) => {
  const { id, createdAt, title, totalTodos } = listData;
  const filteredTodos = useMemo(() => calcDoneTodos(totalTodos), [totalTodos]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
      exit={{ opacity: 0 }}
      className="flex-1 h-max rounded-md overflow-hidden border border-gray-600/30 shadow-sm"
    >
      <div className="h-28 pb-3 px-5 pt-10 bg-gradient-to-r to-green-500 from-green-600 flex items-end">
        <h2 className="font-semibold text-3xl text-white">{title}</h2>
      </div>

      <div className="p-5 flex flex-col gap-y-1">
        <h3 className="text-lg">
          Created: {new Date(createdAt).toLocaleDateString()}
        </h3>
        <h3 className="text-lg">Total todos: {totalTodos.length}</h3>
        <div className="flex gap-x-3 p-2 pb-5">
          <div className="flex flex-col flex-1 items-center justify-center p-3 gap-y-2">
            <p className="text-xl">{filteredTodos.doneTodos.total}</p>
            <ListChecks className="w-7 h-7" />
          </div>

          <div className="flex flex-col flex-1 items-center justify-center p-5 gap-y-2">
            <p className="text-xl">{filteredTodos.undoneTodos.total}</p>
            <LayoutList className="w-7 h-7" />
          </div>
        </div>
        <Link
          href={`/lists/${id}`}
          className="p-3 rounded-md border-2 border-green-500 text-center transition-colors duration-500 hover:bg-green-500 hover:text-white"
        >
          Go to list
        </Link>
      </div>
    </motion.div>
  );
};

export default ListPreview;
