import React from "react";
import DashboardProfileContainer from "../../../components/shared/DashboardProfileContainer";
import TaskContainer from "./TaskContainer/TaskContainer";
import useGetPublic from "../../../hooks/apiPublic/useGetPublic";
import useAuth from "../../../hooks/auth/useAuth";
import { useDrop } from "react-dnd";
import Task from "./Task/Task";

const AllTasks = () => {
  const { user } = useAuth();
  const { data: tasks } = useGetPublic(
    ["Tasks", user?.email],
    `/tasks/${user?.email}`
  );

  const [{ isOver: todoOver }, todoRef] = useDrop({
    accept: "todo",
    collect: (monitor) => ({ isOver: !!monitor.isOver() }),
  });

  const onDropTodo = async (item) => {
    console.log("hitted");
    console.log(item);
  };

  const [{ isOver: ongoingOver }, ongoingRef] = useDrop({
    accept: "ongoing",
    collect: (monitor) => ({ isOver: !!monitor.isOver() }),
  });

  const onDropOngoing = async (item) => {
    console.log("hitted");
    console.log(item);
  };

  const [{ isOver: onCompletedOver }, onCompletedRef] = useDrop({
    accept: "completed",
    collect: (monitor) => ({ isOver: !!monitor.isOver() }),
  });

  const onDropCompleted = async (item) => {
    console.log("hitted");
    console.log(item);
  };

  return (
    <DashboardProfileContainer className="mb-16">
      <div className="mt-10 ml-10 text-4xl font-bold">
        <h1>Your Tasks</h1>
      </div>

      <div className="grid grid-cols-1 gap-4 mt-16 md:grid-cols-2 lg:grid-cols-3">
        {/* TODO */}
        <div
          ref={todoRef}
          className="p-4 border border-black min-h-[300px] flex flex-col gap-4"
        >
          {tasks?.map((task) => (
            <React.Fragment key={task._id}>
              {task.status === "to-do" && (
                <Task status="to-do" onDropTask={onDropTodo} task={task} />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* ONGOING  */}
        <div
          ref={ongoingRef}
          className="p-4 border border-black min-h-[300px] flex flex-col gap-4"
        >
          {tasks?.map((task) => (
            <React.Fragment key={task._id}>
              {task.status === "ongoing" && (
                <Task status="ongoing" onDropTask={onDropOngoing} task={task} />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Completed */}
        <div
          ref={onCompletedRef}
          className="p-4 border border-black min-h-[300px] flex flex-col gap-4"
        >
          {tasks?.map((task) => (
            <React.Fragment key={task._id}>
              {task.status === "completed" && (
                <Task
                  status="completed"
                  onDropTask={onDropCompleted}
                  task={task}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </DashboardProfileContainer>
  );
};

export default AllTasks;
