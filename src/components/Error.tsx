interface ErrorMessageProps {
  message: string;
}

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <span className="block text-xl text-red-500 mb-4">{message}</span>
      </div>
    </div>
  );
};

export default ErrorMessage;
