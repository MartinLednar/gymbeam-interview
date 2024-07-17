import { queryClient } from "@/components/wrappers/queryClient/queryClient.wrapper";
import { axiosClient } from "@/utils/axios.util";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

const fetchDeleteList = async ({ id }: { id: string }) => {
  try {
    await axiosClient.delete(`lists/${id}`);
  } catch (error) {
    throw error;
  }
};

export const useDeleteList = () =>
  useMutation({
    mutationFn: ({ id }: { id: string }) => {
      const deleteListPromise = fetchDeleteList({ id });

      toast.promise(deleteListPromise, {
        success: "List deleted successfully",
        loading: "Deleting list...",
        error: "Ups, something went wrong!",
      });

      return deleteListPromise;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lists"], exact: true });
    },
  });
