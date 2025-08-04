import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "@/pages/Home";
import "./App.css";

const ONE_HOUR_IN_MS = 1000 * 60 * 60;
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: ONE_HOUR_IN_MS,
    },
  },
});

function App() {
  return (
    <div className="min-h-screen grid items-center  bg-gradient-to-br from-gray-900 via-slate-800 to-zinc-900">
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>
    </div>
  );
}

export default App;
