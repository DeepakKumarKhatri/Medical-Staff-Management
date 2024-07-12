import React from "react";
import { useLocation } from "react-router-dom";

const PatientRecordDetail = () => {
  const { state } = useLocation();
  const { patientData, disease } = state; 

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Patient Record Detail
            </h2>
            <p className="text-gray-500">Detailed information about the patient</p>
          </div>
          <img
            src={patientData.avatar}
            className="w-20 h-20 rounded-full bg-gray-200"
            alt="Patient"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <p className="text-gray-500 font-semibold">Patient Name:</p>
            <p className="text-lg text-gray-800 font-medium">{`${patientData.firstName} ${patientData.lastName}`}</p>
          </div>
          <div>
            <p className="text-gray-500 font-semibold">Last Checked:</p>
            <p className="text-lg text-gray-800 font-medium">{new Date(disease.createdAt).toLocaleDateString()}</p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800">Disease</h3>
          <p className="text-gray-600 mt-2">{disease.description}</p>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-800">Instructions Given</h3>
          <p className="text-gray-600 mt-2">{disease.instructions?.additionalNotes || "No additional notes."}</p>
        </div>
      </div>
    </div>
  );
};

export default PatientRecordDetail;
