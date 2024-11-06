import { Outlet } from "react-router";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
const queryClient = new QueryClient();

export function AppLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <div className="space-y-5">
        <Navbar />
        <main className="px-2.5 xl:mx-auto xl:w-3/4">
          <Outlet />
        </main>
        <Footer />
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
