import { NavLink } from "react-router-dom";
import { MdClose } from "react-icons/md";
import LogoutBtn from "../../../components/singleUseBtn/LogoutBtn";
const DropDown = ({ navItems, menu, setMenu }) => {
  return (
    <div
      className={`block md:hidden w-screen h-[300px] absolute bg-gray-100  ${
        menu ? "top-0" : "-top-[300px]"
      } right-0 duration-[.4s]  pt-4 text-black`}
    >
      <div className="flex justify-between w-[90%] mx-auto  items-center">
        <LogoutBtn />
        <MdClose className="text-xl" onClick={() => setMenu(!menu)} />
      </div>
      <ul className="w-[90%] mx-auto space-y-4 mt-5  font-clashRegular">
        {navItems.map(({ name, slug }) => (
          <li key={name} className="w-full text-center">
            <NavLink to={slug} className="">
              {name}
            </NavLink>{" "}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropDown;
