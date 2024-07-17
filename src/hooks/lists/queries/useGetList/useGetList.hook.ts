import { List } from "@/types/list.type";
import { axiosClient } from "@/utils/axios.util";
import { useQuery } from "@tanstack/react-query";

const fetchGetList = async ({ listId }: { listId: string }) => {
  try {
    const { data } = await axiosClient.get<List>(`lists/${listId}`);
    return data;
  } catch (error) {
    throw error;
  }
};

export const useGetList = ({ listId }: { listId: string }) =>
  useQuery({
    queryKey: ["lists", listId],
    queryFn: () => fetchGetList({ listId }),
  });
