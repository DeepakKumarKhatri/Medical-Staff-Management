import React from "react";
import MainHeader from "../../components/PatientGenerals/MainHeader";
import MainCard from "../../components/PatientGenerals/MainCard";

const PatientInstructions = () => {
  return (
    <>
      <MainHeader comingFrom={"PI"} />
      <MainCard
        comingFrom={"PI"}
        title="Malaria"
        diagnosedBy="Dr. Alma"
        treatmentPhase="Mid-Treatment"
      />
      <MainCard
        comingFrom={"PI"}
        title="Dengue"
        diagnosedBy="Dr. Aslam"
        treatmentPhase="Start-Treatment"
      />
      <MainCard
        comingFrom={"PI"}
        title="Fever"
        diagnosedBy="Dr. Abbas"
        treatmentPhase="End-Treatment"
      />
    </>
  );
};

export default PatientInstructions;
