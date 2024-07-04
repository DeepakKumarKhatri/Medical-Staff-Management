import React from "react";
import { Link } from "react-router-dom";

const TreatmentDetail = () => {
  const treatmentDetails = {
    diseaseName: "Malaria",
    checkedByDoctor: "Dr. Alma",
    date: "July 10, 2024",
    patientName: "Deepak",
    details:
      "Malaria is a mosquito-borne infectious disease that affects humans and other animals. It is caused by parasitic protozoans belonging to the Plasmodium type. The disease is transmitted through the bite of an infected female Anopheles mosquito.",
  };

  return (
    <div className="container mx-auto p-4 mt-6">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-4">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            {treatmentDetails.diseaseName} Treatment Details
          </h2>
          <div className="flex items-center mb-3">
            <p className="font-bold mr-2">Checked By:</p>
            <p className="text-gray-700">{treatmentDetails.checkedByDoctor}</p>
          </div>
          <div className="flex items-center mb-3">
            <p className="font-bold mr-2">Date:</p>
            <p className="text-gray-700">{treatmentDetails.date}</p>
          </div>
          <div className="flex items-center mb-3">
            <p className="font-bold mr-2">Patient Name:</p>
            <p className="text-gray-700">{treatmentDetails.patientName}</p>
          </div>
          <p className="text-gray-700 mb-6">{treatmentDetails.details}</p>
        </div>
        <div className="p-4 bg-gray-100">
          <Link
            to={`/instructions/:instructionsID`}
            className="block text-center py-2 px-4 bg-[#F4A261] text-white font-semibold rounded-md shadow-md hover:bg-[#E76F51] transition-colors"
          >
            Check Treatment Instructions
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TreatmentDetail;
