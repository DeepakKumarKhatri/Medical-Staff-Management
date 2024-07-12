import { Chip } from "@mui/material";
import { ChevronRight } from "lucide-react";
import React from "react";
import { getChipColor } from "../../lib/getChipColor";
import { useNavigate } from "react-router-dom";

const MainCard = ({ title, diagnosedBy, treatmentPhase, diseaseData }) => {
  const chipStyles = getChipColor(treatmentPhase);
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate("/patient/treatment-details", { state: { disease: diseaseData } });
  };

  return (
    <div
      className="flex items-center justify-between border-2 border-gray-400 rounded-2xl p-4 m-2 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="flex flex-col">
        <div className="flex">
          <p title="Disease Name" className="font-bold underline underline-offset-1">
            Title:
          </p>
          <p title="Disease Name" className="font-semibold text-gray-500">
            &nbsp;{title}
          </p>
        </div>
        <div className="flex">
          <p title="Doctor Name" className="font-bold underline underline-offset-1">
            Diagnosed By:
          </p>
          <p title="Doctor Name" className="font-semibold text-gray-500">
            &nbsp;Dr. {diagnosedBy}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Chip
          title="Treatment Status"
          label={treatmentPhase}
          variant="outlined"
          style={{
            backgroundColor: chipStyles.color,
            borderColor: chipStyles.borderColor,
          }}
        />
        <ChevronRight size={24} />
      </div>
    </div>
  );
};

export default MainCard;
