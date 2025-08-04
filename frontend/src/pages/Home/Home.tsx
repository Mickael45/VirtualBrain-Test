import ErrorFallback from "@/components/ErrorMessage";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import HomeContent from "./components/HomeContent";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const ONE_HOUR_IN_MS = 1000 * 60 * 60;
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: ONE_HOUR_IN_MS,
    },
  },
});

const Home = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<LoadingSpinner />}>
          <HomeContent />
        </Suspense>
      </ErrorBoundary>
    </QueryClientProvider>
  );
};

export default Home;
