import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { useNavigate } from "react-router";
import productService from "../service/productService";
import { useSearchResults } from "../hooks/useDebounce";
import { PagedData } from "../types/PagedData";
import { Product } from "../types/productInterface";
import useDetectClickOutside from "../hooks/useDetectClickOutside";
import ProductSearchResultsListPreview from "../features/product/ProductSearchResultListPreview";

export default function Searchbar({ smallScreen }: { smallScreen?: boolean }) {
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const navigate = useNavigate();
  const debouncedKeyword = useSearchResults(searchKeyword);
  const { data } = useQuery<PagedData<Product>>({
    queryKey: ["searchResults", debouncedKeyword],
    queryFn: () => {
      return productService.getBySearchKeyword(debouncedKeyword);
    },
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropDownRef = useDetectClickOutside(() => setIsDropdownOpen(false));
  return (
    <div
      className={`relative ${smallScreen ? "mx-4 lg:hidden" : "hidden w-2/4 lg:block"}`}
      ref={dropDownRef}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setIsDropdownOpen(false);
          navigate(`/search?keyword=${searchKeyword}`);
        }}
      >
        <IoSearchOutline
          size={21}
          color="gray"
          className="absolute left-3 top-3"
        />
        <input
          className="w-full rounded-l-md border border-gray-300 p-2.5 pl-10 outline-none duration-300 focus:border-sky-700 focus:shadow-outer"
          type="search"
          placeholder="Search..."
          onChange={(e) => {
            if (e.target.value.length > 2) setIsDropdownOpen(true);
            else setIsDropdownOpen(false);
            setSearchKeyword(e.target.value);
          }}
          value={searchKeyword}
        />
      </form>
      {isDropdownOpen && (
        <ProductSearchResultsListPreview
          products={data?.content}
          closeDropdown={() => setIsDropdownOpen(false)}
        />
      )}
    </div>
  );
}
