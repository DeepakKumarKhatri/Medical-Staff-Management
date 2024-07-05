import React from "react";
import SearchBox from "../SearchBox/SearchBox";
import RecordCard from "./RecordCard";

const MedicalRecords = () => {
  const recordsData = [
    {
      id: 1,
      patientName: "Deepak Kumar",
      lastCheck: "27/06/2024",
      contact: "03333760281",
      status: "Active",
    },
    {
      id: 2,
      patientName: "Amit Singh",
      lastCheck: "25/06/2024",
      contact: "03333760282",
      status: "Not Active",
    },
    {
      id: 3,
      patientName: "Deepak Singh",
      lastCheck: "25/06/2024",
      contact: "03333760282",
      status: "Active",
    },
  ];

  return (
    <div className="flex flex-col p-4">
      <SearchBox />
      <RecordCard records={recordsData}/>
    </div>
  );
};

export default MedicalRecords;
