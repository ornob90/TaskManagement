import React from "react";
import DashboardProfileContainer from "../../../components/shared/DashboardProfileContainer";
import TaskForm from "../../../components/shared/TaskForm";

const AddTask = () => {
  return (
    <DashboardProfileContainer className="bg-gray-200">
      <div className="mt-10 ml-10 text-4xl font-bold">
        <h1>Add Your Task</h1>
      </div>
      <TaskForm />
    </DashboardProfileContainer>
  );
};

export default AddTask;
