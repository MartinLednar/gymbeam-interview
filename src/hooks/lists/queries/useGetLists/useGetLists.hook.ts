import { List } from "@/types/list.type";
import { axiosClient } from "@/utils/axios.util";
import { useQuery } from "@tanstack/react-query";

const fetchGetLists = async (): Promise<List[]> => {
  try {
    const { data } = await axiosClient.get<List[]>("lists");

    return data;
  } catch (error) {
    throw error;
  }
};

export const useGetLists = () =>
  useQuery<List[]>({
    queryKey: ["lists"],
    queryFn: () => {
      return fetchGetLists();
    },
  });
