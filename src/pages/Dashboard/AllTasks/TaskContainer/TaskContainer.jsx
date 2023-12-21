import React from "react";
import Task from "../Task/Task";
import { useDrop } from "react-dnd";

const TaskContainer = ({ status, tasks }) => {
  const [{ isOver }, taskRef] = useDrop({
    accept: status,
    collect: (monitor) => ({ isOver: !!monitor.isOver() }),
  });

  const onDropTask = async (item, status) => {
    console.log("hitted");
    console.log(item);
    console.log("updatedStatus: ", status);
  };

  return (
    <div
      ref={taskRef}
      className="p-4 border border-black min-h-[300px] flex flex-col gap-4"
    >
      {tasks?.map((task) => (
        <React.Fragment key={task._id}>
          {task.status === status && (
            <Task status={status} onDropTask={onDropTask} task={task} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default TaskContainer;
