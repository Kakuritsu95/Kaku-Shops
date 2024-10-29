import { RxHamburgerMenu } from "react-icons/rx";
import Logo from "./Logo";
import Searchbar from "./Searchbar";
import CartIcon from "../features/cart/CartIcon";

export default function Brandbar() {
  return (
    <div className="mx-4 flex items-center justify-between space-x-8 py-3 lg:justify-center">
      <Logo />
      <Searchbar />
      <div className="flex items-center">
        <RxHamburgerMenu size={24} className="mr-5 lg:hidden" />
        <CartIcon />
      </div>
    </div>
  );
}
