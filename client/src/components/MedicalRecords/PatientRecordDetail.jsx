import React from "react";
import { Image } from "lucide-react";

const PatientRecordDetail = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Patient Record Detail</h2>
            <p className="text-gray-500">Detailed information about the patient</p>
          </div>
          <Image src="https://avatars.githubusercontent.com/u/86526696?v=4" className="w-20 h-20 rounded-full bg-gray-200" alt="Patient" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <p className="text-gray-500 font-semibold">Patient Name:</p>
            <p className="text-lg text-gray-800 font-medium">Deepak</p>
          </div>
          <div>
            <p className="text-gray-500 font-semibold">Last Checked:</p>
            <p className="text-lg text-gray-800 font-medium">12/09/2022</p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800">Disease</h3>
          <p className="text-gray-600 mt-2">Description of Disease</p>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-800">Instruction Given</h3>
          <p className="text-gray-600 mt-2">Description of Instruction Given</p>
        </div>
      </div>
    </div>
  );
};

export default PatientRecordDetail;
