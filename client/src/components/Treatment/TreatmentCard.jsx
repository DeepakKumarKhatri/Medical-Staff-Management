import { Chip } from "@mui/material";
import { ChevronRight } from "lucide-react";
import React from "react";
import { getChipColor } from "../../lib/getChipColor";

const TreatmentCard = ({ title, diagnosedBy, treatmentPhase }) => {
  const chipStyles = getChipColor(treatmentPhase);

  return (
    <div className="flex items-center justify-between border-2 border-gray-400 rounded-2xl p-4 m-2 shadow-lg hover:shadow-xl transition-shadow">
      <div className="flex flex-col">
        <div className="flex">
          <p className="font-bold underline underline-offset-1">Title:</p>
          <p className="font-semibold text-gray-500">&nbsp;{title}</p>
        </div>
        <div className="flex">
          <p className="font-bold underline underline-offset-1">
            Diagnosed By:
          </p>
          <p className="font-semibold text-gray-500">&nbsp;{diagnosedBy}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Chip
          label={treatmentPhase}
          variant="outlined"
          style={{
            backgroundColor: chipStyles.color,
            borderColor: chipStyles.borderColor,
          }}
        />
        <div className="cursor-pointer p-2 hover:bg-gray-200 rounded-full transition-colors">
          <ChevronRight size={24} />
        </div>
      </div>
    </div>
  );
};

export default TreatmentCard;
