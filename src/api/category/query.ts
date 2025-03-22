import { useQuery } from "@tanstack/react-query";
import { CategoryAPI } from "./query-slice";

function useGetAllCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => {
      return CategoryAPI.getAll();
    },
    staleTime: 5 * 60 * 1000,
  });
}

export { useGetAllCategories };
