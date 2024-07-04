import { Chip } from "@mui/material";
import { ChevronRight } from "lucide-react";
import React from "react";
import { getChipColor } from "../../lib/getChipColor";
import { Link } from "react-router-dom";

const MainCard = ({ title, diagnosedBy, treatmentPhase, comingFrom }) => {
  const chipStyles = getChipColor(treatmentPhase);

  return (
    <div className="flex items-center justify-between border-2 border-gray-400 rounded-2xl p-4 m-2 shadow-lg hover:shadow-xl transition-shadow">
      <div className="flex flex-col">
        <div className="flex">
          <p
            title="Disease Name"
            className="font-bold underline underline-offset-1"
          >
            Title:
          </p>
          <p title="Disease Name" className="font-semibold text-gray-500">
            &nbsp;{title}
          </p>
        </div>
        <div className="flex">
          <p
            title="Doctor Name"
            className="font-bold underline underline-offset-1"
          >
            Diagnosed By:
          </p>
          <p title="Doctor Name" className="font-semibold text-gray-500">
            &nbsp;{diagnosedBy}
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
        <Link
          to={comingFrom === 'PT' ? `:treatmentID` : `:instructionsID`}
          title="Check Details"
          className="cursor-pointer p-2 hover:bg-gray-200 rounded-full transition-colors"
        >
          <ChevronRight size={24} />
        </Link>
      </div>
    </div>
  );
};

export default MainCard;
