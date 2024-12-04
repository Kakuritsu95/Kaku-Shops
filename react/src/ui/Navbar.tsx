import Searchbar from "./Searchbar";
import Topbar from "./Topbar";
import Brandbar from "./Brandbar";
import authService from "../service/authService";
import { useUserDetails } from "../context/UserDetailsContext";
import { User } from "../types/userInterface";
import { useEffect } from "react";

export default function Navbar() {
  const { initializeUser } = useUserDetails();

  useEffect(() => {
    async function authenticatedUser() {
      const data: User = await authService.authenticateUser();
      console.log(data);
      initializeUser(data);
    }
    authenticatedUser();
  }, [initializeUser]);

  return (
    <header className="space-y-3">
      <Topbar />
      <Brandbar />
      <Searchbar smallScreen={true} />
    </header>
  );
}
