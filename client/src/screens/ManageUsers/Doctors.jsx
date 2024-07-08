import React from "react";
import ManagerUsers from "../../components/Cards/ManagerUsers";
import Header from "../../components/Generals/Header";

const Doctors = () => {
  return (
    <div className="flex flex-col m-5">
      <Header
        main_content={"MANAGE DOCTORS"}
        para_content={"List of all available working doctors at Medico."}
      />
      <div>
        <ManagerUsers comingFrom={"doctors"} />
      </div>
    </div>
  );
};

export default Doctors;
