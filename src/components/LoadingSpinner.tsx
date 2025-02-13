import React from "react";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="h-[92.2vh] w-full bg-transparent flex justify-center items-center">
      <div className="loader"></div>
    </div>
  );
};

export default LoadingSpinner;
