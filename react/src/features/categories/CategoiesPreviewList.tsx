import useCategories from "../../hooks/useCategories";
import CategoryPreviewCard from "./CategoryPreviewCard";

export default function CategoriesPreviewList() {
  const categories = useCategories();
  return (
    <ul className="flex flex-col flex-wrap justify-between gap-y-4 sm:flex-row">
      {categories?.map((category) => (
        <CategoryPreviewCard key={category.id} category={category} />
      ))}
    </ul>
  );
}
