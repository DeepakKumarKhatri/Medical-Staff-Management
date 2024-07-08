import React from "react";
import ManagerUsers from "../../components/Cards/ManagerUsers";
import Header from "../../components/Generals/Header";

const Patients = () => {
  return (
    <div className="flex flex-col m-5">
      <Header
        main_content={"MANAGE PATIENTS"}
        para_content={"List of all patients that had been diagnosed at Medico."}
      />
      <div>
        <ManagerUsers comingFrom={"patients"} />
      </div>
    </div>
  );
};

export default Patients;
