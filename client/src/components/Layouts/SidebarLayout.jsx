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

    /*For Fixed But, Bug of not toggling */
    // <div className="flex h-screen">
    //   <div className="fixed top-0 left-0 h-full w-64 bg-gray-800 text-white">
    //     {children}
    //   </div>
    //   <div className="ml-64 flex-1 overflow-auto">
    //     <Outlet />
    //   </div>
    // </div>

  );
};

export default SidebarLayout;
