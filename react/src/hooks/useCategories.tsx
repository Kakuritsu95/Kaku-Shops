import { useQuery } from "@tanstack/react-query";
import categoryService from "../service/categoryService";
import { Category } from "../types/categoryInterface";

export default function useCategories() {
  const { data: categories } = useQuery<Array<Category>>({
    queryKey: ["categories"],
    queryFn: () => {
      return categoryService.getAll();
    },
  });
  return categories;
}
