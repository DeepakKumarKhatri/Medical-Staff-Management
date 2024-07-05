import React from "react";
import { ChevronRight } from "lucide-react";
import { Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getChipStyle } from "../../constants/getChipStyle";

const RecordCard = ({ records }) => {
  const navigate = useNavigate();

  const handleDetailClick = (recordID) => {
    navigate(`/doctor/patient-records/${recordID}`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
      {records.map((record) => (
        <div
          key={record.id}
          className="flex flex-col bg-gray-50 p-4 rounded-lg shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
        >
          <div className="flex justify-between items-center">
            <ChevronRight
              onClick={() => handleDetailClick(record.id)}
              title="Check detail"
              className="cursor-pointer text-gray-500 hover:text-gray-700 transition-colors duration-300 hover:bg-gray-200 rounded-xl"
            />
            <Chip
              label={record.status}
              style={getChipStyle(record.status)}
              className="ml-2"
            />
          </div>
          <div className="mt-4 p-2">
            <div className="flex mb-2">
              <p
                title="Patient Name"
                className="text-gray-700 font-bold underline underline-offset-1"
              >
                Patient Name:
              </p>
              <p title="Patient Name" className="font-semibold text-gray-500">
                &nbsp;{record.patientName}
              </p>
            </div>
            <div className="flex mb-2">
              <p
                title="Last Check"
                className="text-gray-700 font-bold underline underline-offset-1"
              >
                Last Check:
              </p>
              <p title="Last Check" className="font-semibold text-gray-500">
                &nbsp;{record.lastCheck}
              </p>
            </div>
            <div className="flex">
              <p
                title="Contact"
                className="text-gray-700 font-bold underline underline-offset-1"
              >
                Contact:
              </p>
              <p title="Contact" className="font-semibold text-gray-500">
                &nbsp;{record.contact}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecordCard;
