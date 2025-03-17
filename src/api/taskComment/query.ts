import { useQuery } from "@tanstack/react-query";
import { TaskCommentAPI } from "./query-slice";

function useGetAllTaskComments() {
  return useQuery({
    queryKey: ["task-commnents"],
    queryFn: () => {
      return TaskCommentAPI.getAll();
    },
    staleTime: 5 * 60 * 1000,
  });
}

export { useGetAllTaskComments };
