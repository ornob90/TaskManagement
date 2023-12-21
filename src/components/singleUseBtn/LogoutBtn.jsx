import React from "react";
import Button from "../html/Button";
import useAuth from "../../hooks/auth/useAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const LogoutBtn = ({ className }) => {
  const { signOutMethod } = useAuth();
  const navigate = useNavigate();
  const handleSignOut = () => {
    signOutMethod()
      .then(() => {
        // console.log("Signed Out");
        toast.success("You have been logged out!!");
        navigate("/");
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <Button
      onClick={handleSignOut}
      className={`text-[12px] text-white md:text-sm px-4 md:px-3 font-clashRegular py-1 md:py-2 bg-black  ${className}`}
    >
      Sign Out
    </Button>
  );
};

export default LogoutBtn;
