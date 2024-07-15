"use client";

import { CreateListForm } from "@/components/forms/lists/createList.form";
import ListPreview from "@/components/listPreview/listPreview.component";
import { useGetLists } from "@/hooks/lists/queries/useGetLists/useGetLists.hook";

//TODO show loading state, no todos message, error state + retry for fetch
const HomePage = () => {
  const { isLoading, isSuccess, isError, data } = useGetLists();

  return (
    <>
      <CreateListForm />

      <main className="grid grid-cols-3 gap-x-3 gap-y-3 p-10">
        {isSuccess
          ? data.map((list) => <ListPreview key={list.id} listData={list} />)
          : null}
      </main>
    </>
  );
};

export default HomePage;
