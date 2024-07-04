import React from "react";

const InstructionsDetail = () => {

  const instructionDetails = {
    diseaseName: "Malaria",
    doctorName: "Dr. Alma",
    date: "July 10, 2024",
    patientName: "Deepak",
    instructions: [
      {
        title: "Medication",
        details: "Take the prescribed antimalarial medication twice daily with food. Do not miss any doses.",
      },
      {
        title: "Diet",
        details: "Avoid spicy and oily foods. Drink plenty of fluids, including water, herbal teas, and fruit juices. Eat light and easily digestible meals.",
      },
      {
        title: "Rest",
        details: "Ensure you get plenty of rest. Avoid strenuous activities and stress.",
      },
      {
        title: "Follow-up",
        details: "Schedule a follow-up appointment in two weeks for a check-up and further blood tests.",
      },
      {
        title: "Emergency",
        details: "In case of high fever, severe headache, or other unusual symptoms, contact the hospital immediately or visit the nearest emergency room.",
      },
    ],
    additionalNotes:
      "It is important to adhere strictly to the prescribed treatment plan to ensure a full recovery. If you have any questions or experience any side effects, please contact the clinic.",
  };

  return (
    <div className="container mx-auto p-4 mt-6">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-4">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            {instructionDetails.diseaseName} Instructions
          </h2>
          <div className="flex items-center mb-3">
            <p className="font-bold mr-2">Doctor:</p>
            <p className="text-gray-700">{instructionDetails.doctorName}</p>
          </div>
          <div className="flex items-center mb-3">
            <p className="font-bold mr-2">Date:</p>
            <p className="text-gray-700">{instructionDetails.date}</p>
          </div>
          <div className="flex items-center mb-3">
            <p className="font-bold mr-2">Patient Name:</p>
            <p className="text-gray-700">{instructionDetails.patientName}</p>
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-semibold text-blue-800 mb-2">
              Instructions
            </h3>
            {instructionDetails.instructions.map((instruction, index) => (
              <div key={index} className="mb-3">
                <h4 className="font-bold text-gray-800">{instruction.title}</h4>
                <p className="text-gray-700">{instruction.details}</p>
              </div>
            ))}
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-semibold text-blue-800 mb-2">
              Additional Notes
            </h3>
            <p className="text-gray-700">
              {instructionDetails.additionalNotes}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructionsDetail;
