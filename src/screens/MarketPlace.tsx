const MarketPlace = () => {
  return (
    <div>
      <div>
        <img
          src="https://www.suntecindia.com/blog/wp-content/uploads/2016/11/product-image-5.jpg"
          alt="carousel image"
          className="w-full mt-10 px-2 h-[30%]"
        />
      </div>
      <div>
        <div className="w-full border-2 border-gray-200 items-center whitespace-nowrap overflow-x-auto mt-4">
          <div className="flex justify-center gap-10 py-2 items-center">
            <button className="rounded-full px-2 border-2 border-gray-300">
              Clothing
            </button>
            <button>Automobile</button>
            <button>Clothing</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketPlace;
