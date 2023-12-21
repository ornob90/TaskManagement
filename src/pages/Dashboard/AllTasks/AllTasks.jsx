import React from "react";
import DashboardProfileContainer from "../../../components/shared/DashboardProfileContainer";
import TaskContainer from "./TaskContainer/TaskContainer";
import useGetPublic from "../../../hooks/apiPublic/useGetPublic";
import useAuth from "../../../hooks/auth/useAuth";

const AllTasks = () => {
  const { user } = useAuth();
  const { data: tasks } = useGetPublic(
    ["Tasks", user?.email],
    `/tasks/${user?.email}`
  );

  return (
    <DashboardProfileContainer>
      <div className="mt-10 ml-10 text-4xl font-bold">
        <h1>Your Tasks</h1>
      </div>

      <div className="grid grid-cols-1 gap-4 mt-16 md:grid-cols-2 lg:grid-cols-3">
        <TaskContainer status="to-do" tasks={tasks} />
        <TaskContainer status="ongoing" tasks={tasks} />
        <TaskContainer status="completed" tasks={tasks} />
      </div>
    </DashboardProfileContainer>
  );
};

export default AllTasks;
