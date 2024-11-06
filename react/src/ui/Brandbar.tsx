import { RxHamburgerMenu } from "react-icons/rx";
import Logo from "./Logo";
import Searchbar from "./Searchbar";
import NavbarCart from "../features/cart/NavbarCart";

export default function Brandbar() {
  return (
    <div className="mx-4 flex items-center justify-between space-x-8 py-3 lg:justify-center">
      <Logo />
      <Searchbar />
      <div className="flex items-center">
        <RxHamburgerMenu size={24} className="mr-5 lg:hidden" />
        <NavbarCart />
      </div>
    </div>
  );
}
