import React from "react";
import SidebarLayout from "../../components/Layouts/SidebarLayout";
import DoctorSidebarCaller from "../../components/DoctorSidebar/DoctorSidebar";

const DoctorDashboard = () => {
  return (
    <SidebarLayout>
      <DoctorSidebarCaller />
    </SidebarLayout>
  );
};

export default DoctorDashboard;
