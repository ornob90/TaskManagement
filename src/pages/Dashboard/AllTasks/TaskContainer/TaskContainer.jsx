import React from "react";
import Task from "../Task/Task";

const TaskContainer = ({ status, tasks }) => {
  return (
    <div className="p-4 border border-black min-h-[300px] flex flex-col gap-4">
      {tasks?.map((task) => (
        <React.Fragment key={task._id}>
          {task.status === status && <Task task={task} />}
        </React.Fragment>
      ))}
    </div>
  );
};

export default TaskContainer;
