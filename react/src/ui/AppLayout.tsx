import { Outlet } from "react-router";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Toaster } from "react-hot-toast";
import { UserDetailsContext } from "../context/UserDetailsContext";

const queryClient = new QueryClient();

export function AppLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <div className="space-y-5">
        <UserDetailsContext>
          <Navbar />
          <main className="px-2.5 xl:mx-auto xl:w-3/4">
            <Outlet />
          </main>
        </UserDetailsContext>
        <Footer />
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
