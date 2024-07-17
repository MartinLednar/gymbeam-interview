import { queryClient } from "@/components/wrappers/queryClient/queryClient.wrapper";
import {
  createListSchema,
  TCreateList,
} from "@/schemas/lists/createList.schema";
import { axiosClient } from "@/utils/axios.util";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

const fetchCreateList = async (listData: TCreateList) => {
  try {
    const validatedData = createListSchema.parse(listData);

    const { data } = await axiosClient.post("lists", validatedData);

    return data;
  } catch (error) {
    throw error;
  }
};

export const useCreateList = () =>
  useMutation({
    mutationFn: (listData: TCreateList) => {
      const createListPromise = fetchCreateList(listData);

      toast.promise(createListPromise, {
        loading: "Creating new list",
        success: "List created successfully",
        error: "Ups, something went wrong!",
      });

      return createListPromise;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lists"], exact: true });
    },
  });
