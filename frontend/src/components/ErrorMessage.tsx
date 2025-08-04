const ErrorFallback = ({ error }: { error: Error }) => (
  <div>An error occurred: {error.message}</div>
);

export default ErrorFallback;
