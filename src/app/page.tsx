"use client";

import { CreateListForm } from "@/components/forms/lists/createList.form";
import ListPreview from "@/components/listPreview/listPreview.component";
import { ListPreviewSkeleton } from "@/components/skeletons/listPreview.skeleton";
import { useGetLists } from "@/hooks/lists/queries/useGetLists/useGetLists.hook";
import { motion } from "framer-motion";

//TODO show no todos message, error state + retry for fetch
const HomePage = () => {
  const { isLoading, isSuccess, isError, data, refetch } = useGetLists();

  return (
    <>
      <main className="container px-5 mx-auto h-svh">
        <div className="flex items-center justify-between pb-10 pt-20">
          <h1 className=" font-bold text-4xl">My To-Dos</h1>

          <CreateListForm />
        </div>
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-3 gap-y-3"
        >
          {isLoading ? (
            <>
              <ListPreviewSkeleton />
              <ListPreviewSkeleton />
              <ListPreviewSkeleton />

              <ListPreviewSkeleton />
              <ListPreviewSkeleton />
              <ListPreviewSkeleton />
            </>
          ) : null}
          {isSuccess
            ? data.map((list) => <ListPreview key={list.id} listData={list} />)
            : null}
        </motion.div>
      </main>
    </>
  );
};

export default HomePage;
