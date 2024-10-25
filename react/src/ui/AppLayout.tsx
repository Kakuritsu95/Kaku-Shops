import { Outlet } from "react-router";
import Footer from "./Footer";
import Navbar from "./Navbar";

export function AppLayout() {
  return (
    <div className="space-y-5">
      <Navbar />
      <main className="mx-5 xl:mx-auto xl:w-3/4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
