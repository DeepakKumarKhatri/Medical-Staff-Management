import React from "react";
import { useLocation } from "react-router-dom";

const InstructionsDetail = () => {
  const location = useLocation();
  const { instructions } = location.state;
  console.log(instructions);

  return (
    <div className="container mx-auto p-4 mt-6">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-4">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            Instructions
          </h2>
          <div className="mb-4">
            <h3 className="text-xl font-semibold text-blue-800 mb-2">
              Instructions
            </h3>
            <div className="mb-3">
              <p className="text-gray-700">{instructions?.instructions[0]}</p>
            </div>
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-semibold text-blue-800 mb-2">
              Additional Notes
            </h3>
            <p className="text-gray-700">{instructions?.additionalNotes}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructionsDetail;
