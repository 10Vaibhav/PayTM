const LoadingSpinner = ({ size = "default", text = "Loading..." }) => {
  const sizes = {
    small: "w-4 h-4",
    default: "w-8 h-8",
    large: "w-12 h-12"
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-3">
      <div className={`${sizes[size]} border-4 border-blue-600 border-t-transparent rounded-full animate-spin`}></div>
      {text && <p className="text-gray-600 font-medium text-sm">{text}</p>}
    </div>
  );
};

export default LoadingSpinner;