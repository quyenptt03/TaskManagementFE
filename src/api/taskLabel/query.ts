import { useQuery } from "@tanstack/react-query";
import { TaskLabelAPI } from "./query-slice";

function useGetAllLabels() {
  return useQuery({
    queryKey: ["labels"],
    queryFn: () => {
      return TaskLabelAPI.getAllLabels();
    },
    staleTime: 5 * 60 * 1000,
  });
}

function useGetAllTaskLabels() {
  return useQuery({
    queryKey: ["task-labels"],
    queryFn: () => {
      return TaskLabelAPI.getAllTaskLabels();
    },
    staleTime: 5 * 60 * 1000,
  });
}

export { useGetAllLabels, useGetAllTaskLabels };
