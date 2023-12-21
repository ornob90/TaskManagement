import React from "react";
import { Outlet } from "react-router-dom";
import ProfileSideBar from "../../components/Sidebar/ProfileSideBar";
import { DndProvider, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
const Dashboard = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="relative flex flex-col lg:flex-row  min-h-screen bg-[#F1F3F4] h-auto">
        <ProfileSideBar />
        <Outlet />
      </div>
    </DndProvider>
  );
};

export default Dashboard;
