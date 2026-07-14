import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-[80vh] bg-gradient-to-br from-white to-gray-100">
      <div className="relative flex items-center justify-center">
        {/* Outer Ring */}
        <div className="w-20 h-20 rounded-full border-4 border-gray-200 border-t-primary animate-spin"></div>

        {/* Inner Ring */}
        <div className="absolute w-14 h-14 rounded-full border-4 border-primary/30 border-b-primary animate-spin [animation-direction:reverse]"></div>

        {/* Center Glow */}
        <div className="absolute w-4 h-4 rounded-full bg-primary shadow-[0_0_20px_rgba(59,130,246,0.8)]"></div>
      </div>
    </div>
  );
};

export default Loader;