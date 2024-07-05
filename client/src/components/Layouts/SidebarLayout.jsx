import React from "react";
import { Outlet } from "react-router-dom";

const SidebarLayout = ({ children }) => {
  return (
    <div className="flex">
      {children}
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default SidebarLayout;
