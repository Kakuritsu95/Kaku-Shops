import CategoryList from "../features/categories/CategoryList";
import SectionHeader from "../ui/SectionHeader";

export default function Homepage() {
  return (
    <>
      <section>
        <SectionHeader title="Explore Categories" />
        <CategoryList />
      </section>
    </>
  );
}
