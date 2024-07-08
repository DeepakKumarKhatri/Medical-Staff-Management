import React from "react";
import ManagerUsers from "../../components/Cards/ManagerUsers";
import Header from "../../components/Generals/Header";

const Clinic_Managers = () => {
  return (
    <div className="flex flex-col m-5">
      <Header main_content={"MANAGE CLINIC MANAGERS"} 
      para_content={"List of all available working clinic managers at Medico."}/>
      <div>
        <ManagerUsers comingFrom={"clinic_managers"} />
      </div>
    </div>
  );
};

export default Clinic_Managers;
