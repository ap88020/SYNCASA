import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const Layout = () => {
  return (
    <div className="h-full w-full ">
      <div className="flex flex-1 h-[calc(100vh-64px)] overflow-hidden ">
        <Sidebar />
        <div className="flex-1 bg-[#F4F7FB]">
          < Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
