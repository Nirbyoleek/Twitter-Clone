import React from "react";

const LoadingSpinner = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-200/60 via-white/60 to-purple-200/60 backdrop-blur-sm animate-pulse">
    <div className="p-8 rounded-full bg-white/80 shadow-2xl flex items-center justify-center border-4 border-blue-100">
      <svg className="animate-spin h-16 w-16 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
      </svg>
    </div>
  </div>
);

export default LoadingSpinner;
