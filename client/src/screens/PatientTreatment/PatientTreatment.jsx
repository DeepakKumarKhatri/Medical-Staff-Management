import React from "react";
import MainHeader from "../../components/PatientGenerals/MainHeader";
import MainCard from "../../components/PatientGenerals/MainCard";

const PatientTreatment = () => {
  return (
    <>
      <MainHeader comingFrom={"PT"} />
      <MainCard
        comingFrom={"PT"}
        title="Malaria"
        diagnosedBy="Dr. Alma"
        treatmentPhase="Mid-Treatment"
      />
      <MainCard
        comingFrom={"PT"}
        title="Dengue"
        diagnosedBy="Dr. Aslam"
        treatmentPhase="Start-Treatment"
      />
      <MainCard
        comingFrom={"PT"}
        title="Fever"
        diagnosedBy="Dr. Abbas"
        treatmentPhase="End-Treatment"
      />
    </>
  );
};

export default PatientTreatment;
