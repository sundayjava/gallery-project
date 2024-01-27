import { IoHeartOutline } from "react-icons/io5";
import bg from "../assets/test5.png";
const UserProfile = () => {
  const relatedItems = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  return (
    <div className="mt-10 z-[2]">
      <div className="w-full h-[300px]">
        <div className="w-full h-[250px] bg-gray-300 relative">
          <img src={bg} className="w-full h-full object-cover" />
          <img
            src={bg}
            alt="test"
            className="w-[30%] xl:h-[78%] lg:h-[60%] h-[42%] p-1 rounded-full object-cover border-2 border-blue-200 absolute md:-bottom-[70px] -bottom-[40px] right-8"
          />
        </div>
        <button className=" border-2 border-blue-300 rounded-full mt-2 px-2 py-[2px] text-gray-600 text-[14px]">
          Edit profile
        </button>
      </div>
      <div className="mt-8 p-2">
        <h2 className="font-bold font-poppins text-[20px]">Sunday David</h2>
        <p className="font-bold text-gray-500 text-[16px]">Software Engineer</p>
      </div>

      <p className="p-2 mt-3 text-[15px] text-gray-500">
        A fullstack developer with multiple years of experience A fullstack
        developer with multiple years of experience A fullstack developer with
        multiple years of experience
      </p>

      <div className="w-full border-2 border-gray-200 items-center whitespace-nowrap overflow-x-auto mt-4">
        <div className="flex justify-center gap-10 py-2 items-center">
          <button className="rounded-full px-2 border-2 border-gray-300">
            Clothing
          </button>
          <button>Automobile</button>
          <button>Clothing</button>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center">
        {relatedItems.map((item: any) => (
          <div
            key={item++}
            className="sm:w-[300px] w-full flex mx-2 flex-col justify-center items-center sm:h-[250px] h-[300px] rounded-[10px] shadow-lg p-3"
          >
            <img
              className="h-[180px]"
              src="https://m.media-amazon.com/images/I/81vPI6JD09S._AC_SY355_.jpg"
            />
            <hr />
            <div className="flex justify-between items-center border-t-2 w-full px-4">
              <div className=" flex flex-col justify-center mt-2">
                <h2 className=" text-yellow-900 text-[14px] font-black">
                  3D Models
                </h2>
                <p className="text-[12px] text-gray-400">₦20000.00</p>
              </div>
              <IoHeartOutline
                size={28}
                color="pink"
                className="cursor-pointer"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserProfile;
