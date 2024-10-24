import { Outlet } from "react-router";
import Footer from "./Footer";
import Navbar from "./Navbar";

export function AppLayout() {
  return (
    <div className="container mx-auto">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
