import React from "react";
import { useForm } from "react-hook-form";
import useUser from "../../hooks/others/useUser";
import usePostPublic from "../../hooks/apiPublic/usePostPublic";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const TaskForm = () => {
  const { _id, email } = useUser() || {};

  const { mutateAsync: addTask } = usePostPublic(null, "/tasks");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const dataToAdd = {
      ...data,
      userEmail: email,
    };

    try {
      const res = await addTask(dataToAdd);
      toast.success("Added");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col  justify-center items-center w-[80%] mx-auto min-h-[400px] "
    >
      {/* title  */}
      <div className="w-full ">
        <input
          {...register("title", { required: true })}
          type="text"
          placeholder="Title"
          className="w-full py-2 pl-4 mb-2 bg-transparent border border-black"
        />
      </div>
      {/* description */}
      <div className="w-full">
        <input
          {...register("description", { required: true })}
          type="text"
          placeholder="Description"
          className="w-full py-2 pl-4 mb-2 bg-transparent border border-black"
        />
      </div>

      {/* deadline */}
      <div className="w-full">
        <input
          {...register("deadline", { required: true })}
          type="date"
          placeholder="Deadline"
          className="w-full py-2 pl-4 mb-2 bg-transparent border border-black"
        />
      </div>

      {/* priority */}
      <div className="w-full py-2 pl-4 mb-2 bg-transparent border border-black">
        <select
          {...register("priority", { required: true })}
          className="w-full "
        >
          <option disabled selected>
            Priority
          </option>
          <option value="Low">Low</option>
          <option value="High">High</option>
          <option value="Moderate">Moderate</option>
        </select>
      </div>

      {/* status */}
      <div className="w-full">
        <select
          {...register("status", { required: true })}
          className="w-full py-2 pl-4 mb-2 bg-transparent border border-black"
        >
          <option disabled selected>
            Status
          </option>
          <option value="to-do">To Do</option>
          <option value="ongoing">Ongoing</option>
          <option value="completed">completed</option>
        </select>
      </div>
      <button className="w-full py-2 text-white bg-black">Add</button>
    </form>
  );
};

export default TaskForm;
