import { Outlet } from "react-router";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Toaster } from "react-hot-toast";
import { UserDetailsContext } from "../context/UserDetailsContext";

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

export function AppLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <div className="space-y-10">
        <UserDetailsContext>
          <Navbar />
          <main className="min-h-[80dvh] px-2.5 xl:mx-auto xl:w-4/5">
            <Outlet />
          </main>
        </UserDetailsContext>
        <Footer />
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
