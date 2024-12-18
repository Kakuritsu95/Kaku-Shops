import { useEffect } from "react";
import ProductFilterSortSection from "./ProductFilterSortSection";
import { IoOptionsOutline } from "react-icons/io5";
import { Category } from "../../types/categoryInterface";
export default function MobileFilterSection({
  categories,
  brands,
  isFilterSectionOpen,
  toggleOpenFilterSection,
}: {
  categories: Array<Category> | undefined;
  brands: Array<string> | undefined;
  isFilterSectionOpen: boolean;
  toggleOpenFilterSection: () => void;
}) {
  useEffect(() => {
    if (isFilterSectionOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "scroll";
  }, [isFilterSectionOpen]);

  return (
    <>
      {
        <div
          className={`fixed left-0 z-10 h-screen w-full bg-stone-50 px-3 py-3 shadow duration-300 md:hidden ${isFilterSectionOpen ? "bottom-0" : "-bottom-full"}`}
        >
          <ProductFilterSortSection categories={categories} brands={brands} />
          <button
            onClick={() => toggleOpenFilterSection()}
            className="text-bold absolute right-5 top-5 hover:text-red-500"
          >
            X
          </button>
        </div>
      }
      <button
        onClick={() => toggleOpenFilterSection()}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 rounded-full bg-orange-600 p-3 text-white md:hidden"
      >
        <IoOptionsOutline size={20} />
      </button>
    </>
  );
}
