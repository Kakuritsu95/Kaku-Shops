import Searchbar from "./Searchbar";
import Topbar from "./Topbar";
import Brandbar from "./Brandbar";
import authService from "../service/authService";
import { useUserContext } from "../context/UserDetailsContext";
import { User } from "../types/userInterface";
import { useEffect } from "react";

export default function Navbar() {
  const { initializeUser } = useUserContext();

  useEffect(() => {
    async function authenticatedUser() {
      const data: User = await authService.authenticateUser();

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
