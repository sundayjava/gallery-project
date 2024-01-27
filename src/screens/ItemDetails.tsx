import React from "react";
import { IoHeart, IoHeartOutline } from "react-icons/io5";

const ItemDetails = () => {
  const relatedItems: any = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  return (
    <div className="mt-10 ">
      <img
        src="https://m.media-amazon.com/images/I/81vPI6JD09S._AC_SY355_.jpg"
        className="w-full h-[50%] p-4"
      />
      <div className="flex sm:justify-between justify-center items-center sm:gap-0 gap-3 px-10 sm:flex-row flex-col">
        <div className="flex items-center gap-5">
          <img className="bg-black w-[40px] rounded-full h-[40px]" src="" />
          <div>
            <h1 className="font-black">3D Models With Neons</h1>
            <p className="text-gray-500 text-[14px]">23 may 2024</p>
          </div>
        </div>
        <h1 className="text-[14px] text-gray-500">Bags</h1>
      </div>
      <p className="px-10 mt-5 text-gray-600">
        Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere
        cubilia curae; Nulla efficitur neque sit amet risus congue vestibulum.
      </p>
      <div className="flex flex-wrap gap-5 px-10 my-2 text-gray-600">
        <span className="text-[13px] italic text-red-800">#Tanzas</span>
        <span className="text-[13px]  text-green-800">#Tanzas</span>
        <span className="text-[13px] italic text-yellow-800">#Tanzas</span>
      </div>
      <div className="px-2 w-full flex justify-evenly mt-5 border-y-2 border-gray-200 py-7">
        <button className="rounded-full sm:block sm:px-4 px-2 py-[2px] border-2 border-[#ea4335] sm:text-[16px] text-[12px] font-black text-gray-600">
          Message owner
        </button>
        <button className="rounded-full sm:px-4 px-2 py-[2px] bg-[#4285f4] sm:text-[16px] text-[12px] text-white font-black">
          Add to cart
        </button>
        <button className="rounded-full sm:px-4 px-2 py-[2px] border-2 border-[#fbbc05] sm:text-[16px] text-[12px] font-black text-gray-600">
          Checkout
        </button>
      </div>
      <table className="m-10 border-collapse px-10 w-full">
        <tr>
          <th>Name</th>
          <th>Description</th>
        </tr>
        <tr>
          <td>Quantity</td>
          <td>20</td>
        </tr>
        <tr>
          <td>Size</td>
          <td>SKU12</td>
        </tr>
        <tr>
          <td>Color</td>
          <td>Red</td>
        </tr>
        <tr>
          <td>Location</td>
          <td>Atani</td>
        </tr>
        <tr>
          <td>Actual Price</td>
          <td>₦23,000.00</td>
        </tr>
        <tr>
          <td>Sales Price</td>
          <td>₦20,000.00</td>
        </tr>
      </table>
      <hr />
      <h1 className="px-10 font-bold text-[18px] mt-8 font-poppins">
        Items from the same owner
      </h1>
      <div className="flex flex-wrap justify-center gap-3 mt-5">
        {relatedItems.map((item: any) => (
          <div
            key={item++}
            className="sm:w-[200px] w-full flex mx-2 flex-col justify-center items-center sm:h-[250px] h-[300px] rounded-[10px] shadow-lg p-3"
          >
            <img
              className="h-[180px]"
              src="https://m.media-amazon.com/images/I/81vPI6JD09S._AC_SY355_.jpg"
            />
            <hr />
            <div className="flex justify-between items-center border-t-2 ">
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

export default ItemDetails;
