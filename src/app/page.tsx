"use client";

import { Button } from "@/components/button/button.component";
import { CreateListForm } from "@/components/forms/lists/createList.form";
import ListPreview from "@/components/listPreview/listPreview.component";
import { ListPreviewSkeleton } from "@/components/skeletons/listPreview.skeleton";
import { useGetLists } from "@/hooks/lists/queries/useGetLists/useGetLists.hook";
import { motion } from "framer-motion";

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

          {!isSuccess ? null : data.length > 0 ? (
            data.map((list) => <ListPreview key={list.id} listData={list} />)
          ) : (
            <p className="col-span-full text-lg h-[50svh] flex items-center justify-center">
              No To-Do lists. Let&apos;s get something done!
            </p>
          )}

          {isError && (
            <div className="col-span-full text-lg h-[50svh] flex flex-col items-center justify-center">
              <p className="text-lg pb-4">There was an error!</p>
              <Button onClick={() => refetch()}>Try again</Button>
            </div>
          )}
        </motion.div>
      </main>
    </>
  );
};

export default HomePage;
