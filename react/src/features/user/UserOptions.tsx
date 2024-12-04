import { useState } from "react";
import { useUserDetails } from "../../context/UserDetailsContext";
import useDetectClickOutside from "../../hooks/useDetectClickOutside";
import { MdArrowDropDown } from "react-icons/md";
import UserDropdownListOption from "./UserDropdownListOption";
import { TbLogout } from "react-icons/tb";
import { BsCart2 } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";
export default function UserOptions() {
  const [isDropDownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const ref = useDetectClickOutside(() => setIsDropdownOpen(false));
  const { logout, firstName } = useUserDetails();
  const username = firstName;

  return (
    <div
      ref={ref}
      onClick={() => setIsDropdownOpen((open) => !open)}
      className="relative hover:cursor-pointer"
    >
      <span>{username}</span>
      <MdArrowDropDown className="inline" />
      {isDropDownOpen && (
        <ul className="bg-gray-0 text-gray-60 absolute right-0 top-8 z-10 flex w-40 flex-col space-y-3.5 rounded-lg border bg-gray-50 px-5 py-3.5 text-sm font-medium text-gray-600">
          <UserDropdownListOption>
            <span>Account</span>
            <IoSettingsOutline size={18} />
          </UserDropdownListOption>
          <UserDropdownListOption>
            <span>My cart</span>
            <BsCart2 size={18} />
          </UserDropdownListOption>
          <UserDropdownListOption>
            <span>Order history</span>
            <BsCart2 size={18} />
          </UserDropdownListOption>
          <UserDropdownListOption onClick={logout}>
            <span>Logout</span>
            <TbLogout size={18} />
          </UserDropdownListOption>
        </ul>
      )}
    </div>
  );
}
