import React from "react";
import SidebarCaller from "./PatientSidebar";
import { Outlet } from "react-router-dom";

const SidebarLayout = () => {
  return (
    <div className="flex">
      <SidebarCaller />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default SidebarLayout;
