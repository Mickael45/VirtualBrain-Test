const ErrorMessage = ({ error }: { error: Error }) => (
  <div className="text-white">An error occurred: {error.message}</div>
);

export default ErrorMessage;
