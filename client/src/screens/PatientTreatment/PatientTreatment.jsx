import React from "react";
import Treatment from "../../components/Treatment/Treatment";
import TreatmentCard from "../../components/Treatment/TreatmentCard";

const PatientTreatment = () => {
  return (
    <>
      <Treatment />
        <TreatmentCard
          title="Malaria"
          diagnosedBy="Dr. Alma"
          treatmentPhase="Mid-Treatment"
        />
        <TreatmentCard
          title="Dengue"
          diagnosedBy="Dr. Aslam"
          treatmentPhase="Start-Treatment"
        />
        <TreatmentCard
          title="Fever"
          diagnosedBy="Dr. Abbas"
          treatmentPhase="End-Treatment"
        />
    </>
  );
};

export default PatientTreatment;
