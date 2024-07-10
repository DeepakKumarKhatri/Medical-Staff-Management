import React from "react";
import SidebarLayout from "../../components/Layouts/SidebarLayout";
import PatientSidebarCaller from "../../components/PatientSidebar/PatientSidebar";

const PatientDashboard = () => {
  return (
    <SidebarLayout>
      <PatientSidebarCaller />
    </SidebarLayout>
  );
};

export default PatientDashboard;
