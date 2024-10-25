import CategoryCard from "./CategoryCard";

export default function CategoryList() {
  return (
    <ul className="flex flex-col flex-wrap justify-between gap-y-4 sm:flex-row">
      <CategoryCard />
      <CategoryCard />
      <CategoryCard />
      <CategoryCard />
      <CategoryCard />
      <CategoryCard />
      <CategoryCard />
      <CategoryCard />
      <CategoryCard />
    </ul>
  );
}
