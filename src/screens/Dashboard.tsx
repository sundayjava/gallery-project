import { Outlet } from "react-router-dom";
import {useState} from 'react'
import LeftSideBar from "./dashboard-components/sidebar-left/LeftSideBar";
import RightSidebar from "./dashboard-components/sidebar-right/RightSidebar";
import Navbar from "./dashboard-components/middlescreen/Navbar";
import { FaEllipsis, FaCamera } from "react-icons/fa6";
import { SlHome } from "react-icons/sl";
import { IoSearchSharp, IoSettingsSharp } from "react-icons/io5";
import { navlinks } from "../constant/dummydata";

const Dashboard = () => {
  const [activeNav, setActiveNav] = useState("");
  return (
    <div className="w-full flex-grow-0 h-screen overflow-auto flex md:px-20 sm:px-7 justify-center items-start">
      <LeftSideBar />
      <div className="w-[50%] relative border-x-2 px-1 flex-grow-[1] scroll-indicator overflow-y-scroll h-screen">
        <nav className="fixed w-full z-30 flex-grow-[1] sm:flex justify-center hidden">
          <Navbar />
        </nav>
        <ul className="flex fixed sm:hidden items-center py-2 bg-gray-100 gap-4 w-full justify-around">
        {navlinks.map((link) => (
          <li
            key={link.id}
            onClick={() => setActiveNav(link.link)}
            className="text-[16px] cursor-pointer"
          >
            <a
              className={`${
                activeNav === link.link
                  ? "font-black font-poppins border-b-2 text-[#fbbc05]"
                  : "font-[100] text-black/60"
              }`}
            >
              {link.link}
            </a>
          </li>
        ))}
      </ul>
        <Outlet />
      </div>
      <div className="w-full absolute m-auto bottom-0 px-6 sm:hidden bg-white flex justify-between items-center">
        <SlHome size={30}/>
        <FaEllipsis size={30}/>
        <FaCamera size={30}/>
        <IoSearchSharp size={30}/>
        <IoSettingsSharp size={30}/>
      </div>
      <RightSidebar />
    </div>
  );
};

export default Dashboard;