"use client";

import { CreateListForm } from "@/components/forms/lists/createList.form";
import ListPreview from "@/components/listPreview/listPreview.component";
import { useGetLists } from "@/hooks/lists/queries/useGetLists/useGetLists.hook";

//TODO show loading state, no todos message, error state + retry for fetch
const HomePage = () => {
  const { isLoading, isSuccess, isError, data } = useGetLists();

  return (
    <>
      <main className="container px-5 mx-auto h-svh">
        <div className="flex items-center justify-between pb-10 pt-20">
          <h1 className=" font-bold text-4xl">My To-Dos</h1>
          <CreateListForm />
        </div>
        <div className="grid grid-cols-3 gap-x-3 gap-y-3">
          {isSuccess
            ? data.map((list) => <ListPreview key={list.id} listData={list} />)
            : null}
        </div>
      </main>
    </>
  );
};

export default HomePage;
