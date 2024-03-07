import { useRef } from "react";
import { TfiGallery } from "react-icons/tfi";
import ProductImagePopup from "../../components/ProductImagePopup";
import { MutableRefObject, useState } from "react";
import { IoAdd } from "react-icons/io5";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, useFieldArray } from "react-hook-form";
import { storage } from "../../config/firebase-config";
import {
  StorageReference,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import AuthSDK from "../../utils/AuthSDK";

const schema = yup
  .object({
    caption: yup.string().required("Caption is required"),
    description: yup.string().required("description is required"),
    location: yup.string().default("Please fill the space"),
    tags: yup.array().required("Provide some tags"),
  })
  .required("All fields are required");

type FormValue = {
  caption: string;
  description: string;
  location: string;
  tags: { tag: string }[];
};

type ImageValue = {
  url: string;
}[];

const NewItem = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [receivedImages, setReceivedImages] = useState<ImageValue | null>(null);

  const handleImagesFromChild = (images: any) => {
    setReceivedImages(images);
  };

  const myRef: MutableRefObject<HTMLInputElement | null> = useRef(null);

  const handleImageDialog = () => {
    return setIsOpen(!isOpen);
  };

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormValue>({
    defaultValues: {
      caption: "",
      description: "",
      location: "",
      tags: [{ tag: "" }],
    },
    resolver: yupResolver(schema),
  });

  const { fields, append, remove } = useFieldArray({
    name: "tags",
    control,
  });

  const convertToImageValue = (downloadURLs: string[]): ImageValue => {
    return downloadURLs.map((url) => ({ url }));
  };

  const submit = async (data: FormValue) => {
    try {
      const downloadURLs = await Promise.all(
        (receivedImages || []).map(async (file) => {
          const response = await fetch(file.url);
          const blob = await response.blob();

          const fileRef: StorageReference = ref(storage, file.url);
          await uploadBytes(fileRef, blob);
          return getDownloadURL(fileRef);
        })
      );

      const tagStrings: string[] = data.tags.map((tagObject) => tagObject.tag);

      const sdk = AuthSDK();
      await sdk.createItem(
        data.caption,
        data.description,
        data.location,
        convertToImageValue(downloadURLs),
        tagStrings
      );

      console.log("Download URLs:", downloadURLs);
    } catch (error: any) {
      console.error("Error uploading files:", error.message);
    }
  };

  const openfileExplorer = () => {
    myRef.current?.click();
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen overflow-hidden">
      <div className="md:w-[55%] w-full h-auto border-2 border-gray-200 p-5 rounded-lg shadow-lg">
        <h1 className="font-black text-[16px] tracking-wider border-b-2 border-gray-200">
          Add new item to showcase your expertise
        </h1>
        <form
          onSubmit={handleSubmit(submit)}
          className="mt-8 flex flex-col gap-5"
        >
          <div className="flex gap-5 bg-gray-200 rounded-[5px] p-4 justify-start">
            <div className="flex flex-wrap gap-5 w-full justify-center items-center">
              {receivedImages?.map((urls) => (
                <img
                  src={urls.url}
                  className="w-[120px] h-[120px] object-cover rounded-[10px] bg-gray-50 p-1"
                />
              ))}
              <div className="w-[120px] h-[120px] rounded-[10px] items-center justify-center flex bg-gray-100 cursor-pointer">
                <TfiGallery
                  size={70}
                  className="text-gray-50 cursor-pointer"
                  onClick={() => {
                    handleImageDialog();
                    openfileExplorer();
                  }}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-gray-500 text-[15px] tracking-wider">
              Item Caption
            </label>
            <input
              type="text"
              placeholder="3D logo for business"
              {...register("caption")}
              className="outline-none border-2 border-gray-300 px-3 py-[2px] rounded-lg text-[14px]"
            />
            <p className="text-red-500 text-xs italic">
              {errors.caption?.message}
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-gray-500 text-[15px] tracking-wider">
              Description
            </label>
            <textarea
              rows={4}
              placeholder="Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old."
              {...register("description")}
              className="outline-none border-2 border-gray-300 px-3 py-[4px] rounded-lg text-[14px]"
            />
            <p className="text-red-500 text-xs italic">
              {errors.description?.message}
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-gray-500 text-[15px] tracking-wider">
              Location
            </label>
            <input
              type="text"
              placeholder="Uyo, Nigeria"
              {...register("location")}
              className="outline-none border-2 border-gray-300 px-3 py-[2px] rounded-lg text-[14px]"
            />
            <p className="text-red-500 text-xs italic">
              {errors.location?.message}
            </p>
          </div>

          <div className="flex flex-col justify-start items-start">
            <label
              htmlFor="tag"
              className="text-gray-500 text-[15px] tracking-wider"
            >
              Add tags
            </label>
            <div className="flex flex-wrap gap-3 sm:justify-center justify-start items-center">
              {fields.map((field, index) => (
                <div className="flex items-center" key={field.id}>
                  <input
                    type="text"
                    {...register(`tags.${index}.tag` as const)}
                    placeholder="pashion"
                    className="outline-none border-2 border-gray-300 px-3 py-[2px] rounded-lg text-[14px]"
                  />
                  {index > 0 && (
                    <button
                      type="button"
                      className="font-poppins text-[20px] ps-2 text-gray-500"
                      onClick={() => remove(index)}
                    >
                      -
                    </button>
                  )}
                </div>
              ))}
              <IoAdd
                className="text-[22px] cursor-pointer text-gray-500"
                onClick={() => append({ tag: "" })}
              />
            </div>
            <p className="text-red-500 text-xs italic">
              {errors.tags?.message}
            </p>
          </div>
          <div className="flex justify-center mt-5">
            <button className="text-white rounded-full py-1 px-4 bg-blue-600 font-black tracking-wider w-[200px]">
              Submit
            </button>
          </div>
        </form>
      </div>

      <ProductImagePopup
        isOpen={isOpen}
        myRef={myRef}
        setIsOpen={handleImageDialog}
        sendImagesToParent={handleImagesFromChild}
      />
      <div
        className={`${
          isOpen ? "bottom-0" : "bottom-full"
        } h-screen w-screen fixed bg-black/20 backdrop-blur-lg left-0 z-0`}
      />
    </div>
  );
};

export default NewItem;
