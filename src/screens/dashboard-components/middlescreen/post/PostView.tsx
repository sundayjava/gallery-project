import {
  FaEllipsisVertical,
  FaEye,
  FaPaperPlane,
  FaRegHeart,
} from "react-icons/fa6";
import { IoChatbox } from "react-icons/io5";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../contexts/redux/app/hooks";
import { useEffect, useState } from "react";
import { fetchItems } from "../../../../contexts/redux/features/items/ItemSlice";
import MomentTimeDisplay from "../../../../utils/MomentTimeDisplay";
import { CustomCarousel } from "../../../../components/Carousel";

type User = {
  id: string;
  email: string;
  fullName: string;
  password: string;
  role: string;
};

type TypeOfData = {
  id: number;
  user: User;
  createdAt: string;
  caption: string;
  description: string;
  thumbnails: {
    id:string;
    url: string;
  }[];
  feedback: {
    userId: number;
    comment: string;
  }[];
  tag: string[];
  likes: number[];
  views: number;
  rating: number;
};

const PostCard = (data: TypeOfData) => {
  console.log(data);
  return (
    <div
      className="p-3 bg-gray-100 flex flex-col gap-3 rounded-[20px] shadow-md"
      key={data.id}
    >
      <div className="flex justify-between items-center">
        <div className="flex gap-3 items-center">
          <img
            src="https://th.bing.com/th?id=OIP.IGNf7GuQaCqz_RPq5wCkPgAAAA&w=204&h=306&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2"
            alt="profileImg"
            className="h-[60px] w-[60px] rounded-full p-1 object-cover"
          />
          <div className="">
            <h1 className="font-bold font-poppins">{data.user.fullName}</h1>
            <MomentTimeDisplay timestamp={data.createdAt} />
          </div>
        </div>
        <div className="rounded-full border-2 border-[#c8c9ca] w-8 h-8 flex flex-col items-center justify-center gap-1 cursor-pointer">
          <FaEllipsisVertical />
        </div>
      </div>
      <h4 className="text-[12px] tracking-wider">
        {data.caption} <br />
        {data.tag && data.tag.slice(0, 1).map((tag, index) => (
          <span key={index} className="text-[#ea4335] font-bold">
            #{tag}
          </span>
        ))}{" "}
        {data.tag && data.tag.slice(1, 2).map((tag, index) => (
          <span key={index} className="text-[#fbbc05] font-bold">
            #{tag}
          </span>
        ))}
      </h4>

      <div className="w-full">
        <CustomCarousel slice={data.thumbnails} autoSlide={true} autoSlideInterval={3000}/>
      </div>
      {/* <div className=" overflow-x-auto whitespace-nowrap bg-white ps-10">
        <div className="flex p-2 justify-center items-center bg-black">
          {data.thumbnails.map(({ filename, url }, index) => (
            <img
              key={index}
              src={url}
              alt={filename}
              className="object-contain h-[230px] w-[200px] rounded-[20px] me-6"
            />
          ))}
        </div>
      </div> */}

      <p className="text-[14px] tracking-wider mt-3">{data.description}</p>

      <div className="flex justify-between items-center mt-5">
        <div className="flex items-center justify-start gap-4">
          <p className="flex items-center gap-1 cursor-pointer text-[12px] sm:text-[16px] text-gray-500">
            <FaEye size={22} />
            {data.views > 0 ? data.views : 0}
          </p>
          <p className="flex items-center gap-1 cursor-pointer text-[12px] sm:text-[16px] text-[#ea4335]">
            <FaRegHeart size={22} />
            {!data.likes === null ? data.likes.length : 0}
          </p>
          <p className="flex items-center gap-1 cursor-pointer text-[12px] sm:text-[16px] text-gray-500">
            <IoChatbox size={22} />
            {!data.feedback === null ? data.feedback.length : 0}
          </p>
        </div>
        <div className="flex justify-start items-center gap-3 text-[12px] text-gray-500 pr-5">
          <p className="text-white bg-[#ea4335] rounded-full px-3 py-1 cursor-pointer">
            ❤️‍🔥 Woow!!
          </p>
          <FaPaperPlane size={20} className="text-blue-500 cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

const PostView = () => {
  const items = useAppSelector((state) => state.item);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchItems());
  }, []); 

  return (
    <div className="py-12 flex flex-col gap-5 scroll-pt-20">
      {/* {items.loading && <div>Loading...</div>} */}
      {/* {!items.loading && items.errer ? <div>Error: {items.errer}</div> : null} */}

      {items.items &&
        items.items.map((item, index) => <PostCard key={index} {...item} />)}
    </div>
  );
};

export default PostView;
