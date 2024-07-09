import React from "react";
import { Outlet } from "react-router-dom";

const SidebarLayout = ({ children }) => {
  return (
    <div className="flex h-screen">
      <div className="top-0 left-0 h-full  bg-gray-800 text-white">
        {children}
      </div>
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default SidebarLayout;
