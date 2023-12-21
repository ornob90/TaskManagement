import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoutBtn from "../../../components/singleUseBtn/LogoutBtn";

const ProfileCircle = () => {
  const [profileMenu, setProfileMenu] = useState(false);

  const navigate = useNavigate();

  const navItems = [
    {
      name: "Profile",
    },
  ];

  return (
    <div className="w-[30px] h-[30px] md:w-[40px] md:h-[40px] rounded-full border border-black "></div>
  );
};

export default ProfileCircle;
