import { useEffect, useState } from "react";
import ProductFilterSortSection from "./ProductFilterSortSection";
import { IoOptionsOutline } from "react-icons/io5";
export default function MobileFilterSection() {
  const [areFiltersOpen, setAreFiltersOpen] = useState<boolean>(false);
  useEffect(() => {
    if (areFiltersOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "scroll";
  }, [areFiltersOpen]);

  return (
    <>
      {
        <div
          className={`fixed left-0 z-10 h-screen w-full bg-stone-50 px-3 py-3 shadow duration-300 md:hidden ${areFiltersOpen ? "bottom-0" : "-bottom-full"}`}
        >
          <ProductFilterSortSection />
          <button
            onClick={() => setAreFiltersOpen((open) => !open)}
            className="text-bold absolute right-5 top-5 hover:text-red-500"
          >
            X
          </button>
        </div>
      }
      <button
        onClick={() => setAreFiltersOpen((open) => !open)}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 rounded-full bg-orange-600 p-3 text-white md:hidden"
      >
        <IoOptionsOutline size={20} />
      </button>
    </>
  );
}
