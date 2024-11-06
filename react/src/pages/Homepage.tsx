import CategoriesPreviewList from "../features/categories/CategoiesPreviewList";
import SectionHeader from "../ui/SectionHeader";

export default function Homepage() {
  return (
    <>
      <section>
        <SectionHeader title="Explore Categories" />
        <CategoriesPreviewList />
      </section>
    </>
  );
}
