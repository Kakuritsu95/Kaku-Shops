import { Outlet } from "react-router";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

export function AppLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="space-y-5">
        <Navbar />
        <main className="px-5 xl:mx-auto xl:w-3/4">
          <Outlet />
        </main>
        <Footer />
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
