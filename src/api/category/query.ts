import { useQuery } from "@tanstack/react-query";
import { CategoryAPI } from "./query-slice";

function useGetAllCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => {
      return CategoryAPI.getAll();
    },
  });
}

export { useGetAllCategories };
