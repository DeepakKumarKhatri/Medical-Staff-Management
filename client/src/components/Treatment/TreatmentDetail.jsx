import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const TreatmentDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { disease } = location.state;

  const handleCheckInstructions = () => {
    navigate("/patient/instructions-details", { state: { instructions: disease.instructions } });
  };

  return (
    <div className="container mx-auto p-4 mt-6">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-4">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            {disease?.title} Treatment Details
          </h2>
          <div className="flex items-center mb-3">
            <p className="font-bold mr-2">Checked By:</p>
            <p className="text-gray-700">Dr. {disease?.diagnosedBy}</p>
          </div>
          <div className="flex items-center mb-3">
            <p className="font-bold mr-2">Status:</p>
            <p className="text-gray-700">{disease?.status}</p>
          </div>
          <div className="flex items-center mb-3">
            <p className="font-bold mr-2">Description:</p>
            <p className="text-gray-700">{disease?.description}</p>
          </div>
        </div>
        <div className="p-4 bg-gray-100">
          <div
            onClick={handleCheckInstructions}
            className="block text-center py-2 px-4 bg-[#F4A261] text-white font-semibold rounded-md shadow-md hover:bg-[#E76F51] transition-colors"
          >
            Check Treatment Instructions
          </div>
        </div>
      </div>
    </div>
  );
};

export default TreatmentDetail;
