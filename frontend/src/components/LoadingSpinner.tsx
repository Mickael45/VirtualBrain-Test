const LoadingSpinner = () => (
  <div className="flex justify-center items-center">
    <div
      className={`w-12 h-12 border-4 border-solid border-blue-500 rounded-full animate-spin border-t-transparent`}
    ></div>
    <span className="sr-only">Chargement...</span>
  </div>
);

export default LoadingSpinner;
