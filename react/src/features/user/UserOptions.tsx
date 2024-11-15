import { useState } from "react";
import { useUserDetails } from "../../context/UserDetailsContext";
import useDetectClickOutside from "../../hooks/useDetectClickOutside";
import authService from "../../service/authService";
import { MdArrowDropDown } from "react-icons/md";
import UserDropdownListOption from "./UserDropdownListOption";
import { TbLogout } from "react-icons/tb";
import { BsCart2 } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";
export default function UserOptions({ email }: { email: string }) {
  const [isDropDownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const ref = useDetectClickOutside(() => setIsDropdownOpen(false));
  const { logout } = useUserDetails();
  const username = email.split("@")[0];
  async function logoutUser() {
    logout();
    await authService.logout();
  }

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
            Account <IoSettingsOutline size={18} />
          </UserDropdownListOption>
          <UserDropdownListOption>
            My Cart <BsCart2 size={18} />
          </UserDropdownListOption>
          <UserDropdownListOption>
            Order history <BsCart2 size={18} />
          </UserDropdownListOption>
          <UserDropdownListOption>
            <button onClick={logoutUser}>Logout</button>
            <TbLogout size={18} />
          </UserDropdownListOption>
        </ul>
      )}
    </div>
  );
}
