import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../pages/Home/Navbar/Navbar";

const Root = () => {
  return (
    <div className="max-w-[1440px] mx-auto">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Root;
