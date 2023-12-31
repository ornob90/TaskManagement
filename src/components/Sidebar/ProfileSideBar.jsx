import React, { useState } from "react";
import { CgMenuLeftAlt } from "react-icons/cg";
import { BiLeftArrowAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/auth/useAuth";

const ProfileSideBar = () => {
  const { user: curUser, loading } = useAuth();

  const [activeItem, setActiveItem] = useState("Account");
  const navItem = [
    {
      name: "All Tasks",
      to: `/dashboard`,
    },
    {
      name: "Add Task",
      to: `/dashboard/add-task`,
    },
  ];

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="w-max  lg:h-auto lg:w-[18%] h-full z-20">
      <h1
        onClick={() => setMenuOpen(true)}
        className={` mt-[5vh] ml-[5vw] lg:hidden`}
      >
        <CgMenuLeftAlt className="text-2xl" />
      </h1>
      <aside
        className={`w-[70%] sm:w-[38%] lg:w-[18%] pt-5 pl-5  min-h-[500px] h-full duration-[.4s]  fixed ${
          menuOpen ? "top-0 left-0" : "left-[-100%] lg:top-0 lg:left-0"
        } duration-[.4s] bg-[#0E0E0E] `}
      >
        <div className="flex items-center justify-between pb-2 text-white">
          <Link
            to="/"
            className="text-lg underline cursor-pointer font-clashBold sm:text-xl"
          >
            Task Management
          </Link>
          <BiLeftArrowAlt
            onClick={() => setMenuOpen(false)}
            className="text-2xl lg:hidden"
          />
        </div>

        <div className="flex items-center gap-4 pb-6 mt-5 text-white border-b">
          <div className="w-[80px] h-[80px] rounded-full bg-white text-black flex justify-center items-center font-clashBold text-2xl">
            {/* JK */}
            <img
              src={curUser?.photoURL}
              alt=""
              className="object-cover w-full h-full rounded-full"
            />
          </div>
          <div>
            <p>Hi,</p>
            <p className="font-bold">{curUser?.displayName}</p>
          </div>
        </div>

        <ul className="flex flex-col gap-4 mt-10 ">
          {navItem.map(({ name, icon, to, show }) => (
            <Link key={name} to={to}>
              <li
                onClick={() => setActiveItem(name)}
                className={`text-sm sm:text-base flex items-center gap-4  hover:bg-white hover:text-black duration-[.3s] py-2 pl-1 cursor-pointer ${
                  activeItem === name ? " bg-white text-black" : "text-white"
                } `}
              >
                {name}
              </li>
            </Link>
          ))}
        </ul>
      </aside>
    </div>
  );
};

export default ProfileSideBar;
