import React from "react";
import Task from "../Task/Task";
import { useDrop } from "react-dnd";
import usePatchPublic from "../../../../hooks/apiPublic/usePatchPublic";
import useAuth from "../../../../hooks/auth/useAuth";
import toast from "react-hot-toast";
import usePutPublic from "../../../../hooks/apiPublic/usePutPublic";

const TaskContainer = ({ status, tasks }) => {
  const [{ isOver }, taskRef] = useDrop({
    accept: "tasks",
    drop: (item) => onDropTask(item),
    collect: (monitor) => ({ isOver: !!monitor.isOver() }),
  });

  const { user } = useAuth();

  const { mutateAsync: updateStatus } = usePutPublic([["Tasks", user?.email]]);

  const onDropTask = async (item) => {
    const { _id } = item;
    console.log(status);
    try {
      const response = await updateStatus(`/tasks/${_id}?status=${status}`, {});
    } catch (error) {
      toast.error(error.message);
    }
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
