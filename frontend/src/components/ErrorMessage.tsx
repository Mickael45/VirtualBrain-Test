const ErrorMessage = ({ error }: { error: Error }) => (
  <div className="text-white">Une erreur s'est produite : {error.message}</div>
);

export default ErrorMessage;
