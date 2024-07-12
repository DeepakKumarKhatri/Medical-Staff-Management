import React, { useState } from "react";
import MainHeader from "../../components/PatientGenerals/MainHeader";
import MainCard from "../../components/PatientGenerals/MainCard";
import { useSelector } from "react-redux";

const PatientTreatment = () => {
  const currentUser = useSelector((state) => state.auth.user);
  const [userName, setUserName] = useState(
    currentUser?.firstName || currentUser?.user?.user?.firstName
  );
  const diseasesArray = useState(
    currentUser?.diseases || currentUser?.user?.user?.diseases
  );

  return (
    <>
      <MainHeader comingFrom={"PT"} user={userName} />
      {diseasesArray[0].map((disease, index) => (
        <MainCard
          key={index}
          comingFrom={"PT"}
          title={disease.title}
          diagnosedBy={disease.diagnosedBy}
          treatmentPhase={disease.status}
          diseaseData={disease} 
        />
      ))}
    </>
  );
};

export default PatientTreatment;
