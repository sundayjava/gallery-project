import React, { useState } from "react";
import { CgClose } from "react-icons/cg";
import { appTitle } from "../constant";
import { BiEdit } from "react-icons/bi";
import Cropper from "react-easy-crop";

type ImageValue = {
  url: string;
}[];

const ProductImagePopup: React.FC<{
  isOpen: boolean;
  setIsOpen: any;
  myRef: any;
}> = (props) => {
  const [images, setImages] = useState<ImageValue | null>(null);
  const [imageToCrop, setImageToCrop] = useState("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [aspectRatio, setAspectRatio] = useState(16 / 9);
  const [croppedArea, setCroppedArea] = useState(null);
  const [imgAfterCrop, setImgAfterCrop] = useState("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
      const loadedImgs: ImageValue = Array.from(files).map((file) => ({
        url: URL.createObjectURL(file),
      }));
      setImages(loadedImgs);
      setEditingIndex(null);
    }
  };

  const handleEditClick = (index: number) => {
    setEditingIndex(index);
    setImageToCrop(images?.[index]?.url || "");
  };

  const onAspectRatioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newAspectRatio = parseFloat(event.target.value);
    if (!isNaN(newAspectRatio)) {
      setAspectRatio(newAspectRatio);
    }
  };

  const onCropCancel = () => {
    setImageToCrop("");
  };

  const onCropComplete = (
    croppedAreaPercentage: any,
    croppedAreaPixels: any
  ) => {
    setCroppedArea(croppedAreaPixels);
  };

  const onCropDone = (imgCroppedArea: any) => {
    if (editingIndex !== null) {
      const canvasEle = document.createElement("canvas");
      canvasEle.width = imgCroppedArea.width;
      canvasEle.height = imgCroppedArea.height;

      const context = canvasEle.getContext("2d");

      let imageObj1 = new Image();
      imageObj1.src = imageToCrop;
      imageObj1.onload = function () {
        context?.drawImage(
          imageObj1,
          imgCroppedArea.x,
          imgCroppedArea.y,
          imgCroppedArea.width,
          imgCroppedArea.height,
          0,
          0,
          imgCroppedArea.width,
          imgCroppedArea.height
        );
        const dataURL = canvasEle.toDataURL("image/jpeg");

        // setImgAfterCrop(dataURL);

        const updatedImages = [...images!];
        updatedImages[editingIndex] = { url: dataURL };
        setImages(updatedImages);
        setImageToCrop("");
      };
    }
  };

  return (
    <div
      className={`z-20 bg-white ${
        props.isOpen ? "absolute" : "hidden"
      } top-0 bottom-0 left-0 right-0 m-auto lg:w-[70%] xl:[65%] w-full h-[85%] shadow-lg rounded-[10px]`}
    >
      <div className="w-full h-[40px] border-b-2 flex justify-between items-center px-4">
        <h1>Best Editor</h1>
        <CgClose
          className="text-[20px] text-gray-400 cursor-pointer"
          onClick={props.setIsOpen}
        />
      </div>
      {images?.length ? (
        <div className="h-[88%] w-full flex justify-center items-center box-border sm:flex-row flex-col">
          <div className="flex flex-[1.3] border-e-2 h-full p-5">
            <div className="bg-gray-400 w-full h-full">
              {imageToCrop && (
                <Cropper
                  image={imageToCrop}
                  aspect={aspectRatio}
                  crop={crop}
                  zoom={zoom}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={onCropComplete}
                  style={{
                    containerStyle: {
                      width: "60%",
                      height: "100%",
                      backgroundColor: "#fff",
                    },
                  }}
                />
              )}
            </div>
          </div>
          <div className="flex flex-1 h-full overflow-auto flex-wrap gap-5 p-5 md:p-3 justify-center items-center">
            {imageToCrop ? (
              <div>
                <div
                  className="flex flex-wrap items-center justify-center gap-2 text-[16px] cursor-pointer font-bold"
                  onChange={onAspectRatioChange}
                >
                  <input
                    type="radio"
                    className=" cursor-pointer"
                    value={1 / 1}
                    name="ratio"
                  />
                  1:1
                  <input
                    type="radio"
                    className=" cursor-pointer"
                    value={5 / 4}
                    name="ratio"
                  />
                  5:4
                  <input
                    type="radio"
                    className=" cursor-pointer"
                    value={4 / 3}
                    name="ratio"
                  />
                  4:3
                  <input
                    type="radio"
                    className=" cursor-pointer"
                    value={3 / 2}
                    name="ratio"
                  />
                  3:2
                  <input
                    type="radio"
                    className=" cursor-pointer"
                    value={5 / 3}
                    name="ratio"
                  />
                  5:3
                  <input
                    type="radio"
                    className=" cursor-pointer"
                    value={16 / 9}
                    name="ratio"
                  />
                  16:9
                  <input
                    type="radio"
                    className=" cursor-pointer"
                    value={3 / 1}
                    name="ratio"
                  />
                  3:1
                </div>
                <div className="flex items-center justify-center">
                  <button
                    className="flex items-center justify-center"
                    onClick={onCropCancel}
                  >
                    Cancel
                  </button>
                  <button
                    className="text-[16px] font-semibold text-white bg-blue-600 px-6 py-2 rounded-md cursor-pointer m-4"
                    onClick={() => onCropDone(croppedArea)}
                  >
                    Crop & Apply
                  </button>
                </div>
              </div>
            ) : (
              images?.map((url, index) => (
                <div className="relative">
                  <img
                    src={url.url}
                    alt={`${index}Images`}
                    className="md:w-[200px] md:h-[200px] border-2 rounded-md p-[2px] border-gray-800 w-full h-[250px] shadow-xl object-cover"
                  />
                  <BiEdit
                    size={23}
                    onClick={() => handleEditClick(index)}
                    className="absolute top-3 right-3 text-gray-400 cursor-pointer hover:text-gray-800"
                  />
                </div>
              ))
            )}
          </div>
        </div>
      ) : (
        <div className="h-[88%] w-full flex flex-col justify-center items-center">
          <h1 className="text-[22px] font-black tracking-wider">
            Select a file to begin
          </h1>
          <p className="tracking-wider text-[15px]">
            Share images or a single video defining your post
          </p>
          <button
            className="bg-blue-700 text-[14px] rounded-full px-5 py-1 text-white font-bold mt-4"
            onClick={() => props.myRef.current.click()}
          >
            Choose from Device
          </button>
        </div>
      )}
      <div className="w-full flex justify-end items-center pb-3 gap-10 px-10">
        <button
          className="text-[14px] px-4 rounded-full border-2 border-blue-400"
          onClick={() => {
            props.setIsOpen();
            setImages([]);
          }}
        >
          Close
        </button>
        <button className="text-[14px] px-6 py-[2px] rounded-full bg-blue-700 text-white font-bold">
          Next
        </button>
      </div>
      <input
        type="file"
        ref={props.myRef}
        multiple
        className="hidden"
        onChange={handleImageChange}
      />
    </div>
  );
};

export default ProductImagePopup;
