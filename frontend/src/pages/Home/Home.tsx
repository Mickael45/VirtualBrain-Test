import ErrorFallback from "@/components/ErrorMessage";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import HomeContent from "./components/HomeContent";

const Home = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<LoadingSpinner />}>
        <HomeContent />
      </Suspense>
    </ErrorBoundary>
  );
};

export default Home;
