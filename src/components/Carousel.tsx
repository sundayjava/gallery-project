import React, { ReactNode, useEffect, useState } from "react";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";

type SliceElement = {
  id: string;
  filename: string;
  url: string;
}[];

export const CustomCarousel: React.FC<{ slice: SliceElement, autoSlide:boolean, autoSlideInterval: number }> = (props) => {
  const [curr, setCurr] = useState(0);

  const prev = () =>
    setCurr((curr) => (curr === 0 ? props.slice.length - 1 : curr - 1));
  const next = () =>
    setCurr((curr) => (curr === props.slice.length - 1 ? 0 : curr + 1));

    useEffect(() => {
        if(props.autoSlide === false) return;

        const slideInterval = setInterval(next, props.autoSlideInterval)
        return () => clearInterval(slideInterval)
    },[])

  return (
    <div className="relative overflow-hidden">
      <div
        className="flex justify-center transition-transform ease-in duration-500"
        style={{
          transform: `translateX(-${curr * 100}%)`,
        }}
      >
        {props.slice.map((s) => (
          <img src={s.url} className="w-full" />
        ))}
        {/* {[...props.slice.map((s) => (
          <img src={s.url} className="w-full" />
        )), <video src={} autoPlay muted loop/>]} */}
      </div>
      <div className="absolute inset-0 flex items-center justify-between">
        <FaChevronCircleLeft
          onClick={prev}
          size={30}
          className=" text-gray-400 shadow-xl hover:text-yellow-800 cursor-pointer"
        />

        <FaChevronCircleRight
          onClick={next}
          size={30}
          className=" text-gray-400 shadow-xl hover:text-yellow-800 cursor-pointer"
        />
      </div>
      <div className="absolute bottom-4 right-0 left-0">
        <div className="flex items-center justify-center gap-2">
            {
                props.slice.map((_, i) => (
                    <div className={
                        `transition-all w-3 h-3 bg-white rounded-full ${curr === i ? 'p-2' : 'bg-opacity-50'}`
                    }/>
                ))
            }
        </div>
      </div>
    </div>
  );
};
