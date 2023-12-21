import React from "react";
import { FiDelete } from "react-icons/fi";
import Swal from "sweetalert2";
import useDeletePublic from "../../../../hooks/apiPublic/useDeletePublic";
import useAuth from "../../../../hooks/auth/useAuth";
import toast from "react-hot-toast";

const Task = ({ task }) => {
  const { user } = useAuth();
  const { mutateAsync: removeTask } = useDeletePublic([["Tasks", user?.email]]);

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        removeTask(`/tasks/${task?._id}`)
          .then((res) => {
            toast.success("Product removed from cart!!");
          })
          .catch((err) => toast.error(err.message));
      }
    });
  };

  return (
    <div className="w-full p-2 border">
      <div className="flex items-center justify-between ">
        <div className="">
          <h1 className="text-sm font-bold">{task?.title}</h1>
          <p
            className={`px-2 my-3 text-white  rounded-full w-max text-[10px] ${
              task?.status === "to-do"
                ? "bg-red-500"
                : task?.status === "ongoing"
                ? "bg-yellow-500"
                : "bg-green-500"
            }`}
          >
            {task?.status}
          </p>
        </div>
        <FiDelete onClick={handleDelete} className="text-2xl cursor-auto" />
      </div>
      <div className="text-[13px] text-gray-500">{task?.description}</div>
    </div>
  );
};

export default Task;
