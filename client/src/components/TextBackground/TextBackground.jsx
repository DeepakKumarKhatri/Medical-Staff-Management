import React from "react";
import appLogo from "../../assets/images/logo/logo.png";
import { useNavigate } from "react-router-dom";

const TextBackground = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-start justify-center h-full p-8 bg-gray-100">
      <img
        src={appLogo}
        alt="Hospital Management System Logo"
        className="mb-4 w-24 h-24"
      />
      <h1 className="text-4xl font-bold text-[#304463] mb-4">
        Welcome to Medico
      </h1>
      <h2 className="text-2xl font-semibold text-[#7D8ABC] mb-4">
        "Your Partner in Efficient Healthcare Management"
      </h2>
      <p className="text-lg text-gray-700 mb-4">
        Our product provides excellent services to manage hospital operations
        efficiently.
      </p>
      <p className="text-lg text-gray-700 mb-4">
        Join us to explore a seamless and effective way to handle your hospital
        management tasks.
      </p>
      <button
        onClick={() => navigate("/register")}
        className="mt-6 px-6 py-2 bg-[#F4A261] text-white rounded-md hover:bg-[#E76F51]"
      >
        Get Started
      </button>
    </div>
  );
};

export default TextBackground;
