import { useQuery } from "@tanstack/react-query";
import { TaskLabelAPI } from "./query-slice";

function useGetAllLabels() {
  return useQuery({
    queryKey: ["labels"],
    queryFn: () => {
      return TaskLabelAPI.getAllLabels();
    },
  });
}

function useGetAllTaskLabels() {
  return useQuery({
    queryKey: ["task-labels"],
    queryFn: () => {
      return TaskLabelAPI.getAllTaskLabels();
    },
  });
}

export { useGetAllLabels, useGetAllTaskLabels };
