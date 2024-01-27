import logo from "../../../assets/logo.png";
import bg from "../../../assets/test5.png";
import { SlHome } from "react-icons/sl";
import { FaEllipsis, FaCamera, FaLandmark } from "react-icons/fa6";
import { IoSearchSharp, IoSettingsSharp, IoAdd } from "react-icons/io5";

const LeftSideBar = () => {
  return (
    <div className="sm:flex flex-col justify-between items-start sm:w-[25%] w-[10%] hidden">
      <div className="flex flex-col items-start justify-between gap-5">
        <img
          src={logo}
          className="img-rotate w-[30px] h-[30px] object-contain mt-6"
        />
        <div className="flex flex-col gap-[14px]">
          <div className="flex items-center gap-5">
            <SlHome size={25}/> <span className="text-[22px] lg:block hidden">Home</span>
          </div>
          <div className="flex items-center gap-5">
            <IoSearchSharp size={25}/> <span className="text-[22px] lg:block hidden">Explore</span>
          </div>
          <div className="flex items-center gap-5">
            <FaCamera size={25}/> <span className="text-[22px] lg:block hidden">Gallery</span>
          </div>
          {/* <div className="flex items-center gap-5">
            <FaLandmark size={25}/> <span className="text-[22px] lg:block hidden">Market place</span>
          </div> */}
          <div className="flex items-center gap-5">
            <IoSettingsSharp size={25}/> <span className="text-[22px] lg:block hidden">Settings</span>
          </div>
          <button className="bg-[#4285f4] border-none text-white flex items-center rounded-full px-5 py-1 justify-center">
            <IoAdd className="text-white" size={28}/> List new
          </button>
        </div>
      </div>
      <div className="flex bottom-5 absolute items-center gap-4 justify-between cursor-pointer lg:px-4 rounded-full md:shadow-xl md:py-1 bg-gray-200">
        <div className="flex items-center gap-2">
          <img
            src={bg}
            alt="profile"
            className="rounded-full w-[50px] h-[50px] object-cover shadow-lg"
          />
          <div className="me-3 lg:block hidden">
            <h2 className="text-[14px] font-bold">Sunday David</h2>
            <p className="text-[12px] text-gray-500">Estate manager</p>
          </div>
        </div>
        <FaEllipsis className="text-gray-500 lg:block hidden" />
      </div>
    </div>
  );
};

export default LeftSideBar;
