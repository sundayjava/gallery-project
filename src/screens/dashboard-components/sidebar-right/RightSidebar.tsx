import { IoSearchSharp } from "react-icons/io5";
import bg from "../../../assets/logo.png";
import { logo } from "../../../assets";
import { postdetails } from "../../../constant/dummydata";

const RightSidebar = () => {
  const date = new Date();
  return (
    <div className="w-[25%] px-5 items-center lg:block hidden">
      <div className="w-full flex justify-center bg-white z-10">
        <div className="flex items-center mt-1 rounded-[20px] fixed gap-3 py-1 px-6 w-auto shadow-sm bg-gray-200">
          <IoSearchSharp size={24} className="text-gray-500 " />

          <input
            type="search"
            placeholder="type here..."
            className="border-none outline-none w-full text-[13px] font-comfortaa text-bold text-gray-700"
          />
        </div>
      </div>

      <h1 className=" font-black mt-20 mb-3 ms-4 text-[17px]">Update</h1>
      <div className="flex gap-3 items-center justify-center">
        {postdetails.slice(0, 3).map((data, index) => (
          <div key={index} className="storiesbg rounded-[10px] relative shadow-sm w-[100px] h-[150px] object-cover">
            <div className="absolute m-auto bottom-2 right-4">
              <div className="flex items-center gap-1">
                <img
                  src={bg}
                  alt="small img"
                  className="w-[16px] h-[16px] rounded-full"
                />
                <span className="text-[8px] text-white font-poppins font-bold">
                  Sunday David
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h1 className=" font-black mt-10 mb-3 text-[17px]">Trends for you</h1>
      <div className="flex gap-5 flex-col">
        {postdetails.slice(0, 3).map((data, index) => (
          <div key={index} className="flex justify-between cursor-pointer">
            <div className="flex items-center gap-3">
              <img
                src={bg}
                alt="trends"
                className="w-[30px] h-[30px] rounded-full shadow-lg p-[2px]"
              />
              <div className="flex flex-col">
                <p className="text-[11px] font-normal font-poppins">Logo bg</p>
                <p className="text-[8px] text-gray-500">
                  Nun quis enim posuere,
                </p>
              </div>
            </div>
            <button className="bg-gray-500 text-white text-[11px] h-5 font-bold px-2 rounded-full">
              check in
            </button>
          </div>
        ))}
      </div>
      <button className="mt-7 text-[14px] tracking-wider">See more</button>

      <h1 className=" font-black mt-10 mb-3 text-[17px]">Recommendations</h1>
      <div className="flex flex-wrap justify-center gap-4 items-center">
        <img
          src={logo}
          alt="recommends"
          className="w-[90px] h-[110px] rounded-[10px] shadow-lg"
        />
        <img
          src={logo}
          alt="recommends"
          className="w-[90px] h-[110px] rounded-[10px] shadow-lg"
        />
        <img
          src={logo}
          alt="recommends"
          className="w-[90px] h-[110px] rounded-[10px] shadow-lg"
        />
        <img
          src={logo}
          alt="recommends"
          className="w-[90px] h-[110px] rounded-[10px] shadow-lg"
        />
        <img
          src={logo}
          alt="recommends"
          className="w-[90px] h-[110px] rounded-[10px] shadow-lg"
        />
        <img
          src={logo}
          alt="recommends"
          className="w-[90px] h-[110px] rounded-[10px] shadow-lg"
        />
      </div>

      <footer className="mt-5 text-[13px] tracking-wider">
        &copy; Copyright {date.getFullYear()}
      </footer>
    </div>
  );
};

export default RightSidebar;
