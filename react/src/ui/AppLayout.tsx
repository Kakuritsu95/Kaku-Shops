import { Outlet } from "react-router";
import Footer from "./Footer";
import Navbar from "./Navbar";

export function AppLayout() {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
