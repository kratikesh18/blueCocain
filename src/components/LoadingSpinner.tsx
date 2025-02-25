import React from "react";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="h-screen w-full bg-transparent flex justify-center items-center">
      <div className="loader"></div>
    </div>
  );
};

export default LoadingSpinner;
