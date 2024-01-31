import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { FaCamera } from "react-icons/fa6";
import { IoAdd } from "react-icons/io5";
import * as yup from "yup";

const schema = yup
  .object({
    caption: yup.string().required("Caption is required"),
    description: yup.string().required("description is required"),
    location: yup.string().default("Please fill the space"),
    tags: yup.array().required("Provide some tags"),
  })
  .required("All fields are required");

type ImageValue = {
  filename: string;
  url: string;
}[];

type FormValue = {
  caption: string;
  description: string;
  location: string;
  tags: { tag: string }[];
};

const Addnew = () => {
  const [images, setImages] = useState<ImageValue | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
      const selectedImages: ImageValue = Array.from(files).map((file) => ({
        filename: file.name,
        url: URL.createObjectURL(file),
      }));

      setImages(selectedImages);
    }
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

  const submit = (data: FormValue) => {
    console.log(data);
  };

  console.log(images);

  return (
    <div className="flex justify-center items-center w-full">
      <div className="bg-gray-50 p-10 w-[97%] sm:w-[50%]">
        <h1 className="m-6">Add new post / item</h1>
        <form className="flex flex-col gap-6">
          <div className="flex flex-wrap gap-3">
            {images?.length ? (
              images.length < 5 &&
              images.map((img) => (
                <img
                  src={img.url}
                  className="w-[120px] h-[120px] object-cover"
                />
              ))
            ) : (
              <span>Maximum of 5</span>
            )}
            <div className="w-[120px] h-[120px] cursor-pointer flex justify-center items-center bg-gray-200">
              <label htmlFor="file">
                <FaCamera size={30} className="text-gray-400 cursor-pointer" />
              </label>
            </div>
          </div>

          <input
            type="file"
            id="file"
            onChange={handleFileChange}
            multiple
            className="hidden"
          />

          <div className="flex flex-col gap-1">
            <label className="text-gray-500 text-[15px] tracking-wider">
              Item Caption
            </label>
            <input
              type="text"
              placeholder="3D logo for business"
              className="outline-none border-2 border-gray-300 px-3 py-[2px] rounded-lg"
            />
            <p className="text-red-500 text-xs italic"></p>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-gray-500 text-[15px] tracking-wider">
              Description
            </label>
            <textarea
              rows={4}
              placeholder="3D logo for business"
              className="outline-none border-2 border-gray-300 px-3 py-[4px] rounded-lg"
            />
            <p className="text-red-500 text-xs italic"></p>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-gray-500 text-[15px] tracking-wider">
              Location
            </label>
            <input
              type="text"
              placeholder="3D logo for business"
              className="outline-none border-2 border-gray-300 px-3 py-[2px] rounded-lg"
            />
            <p className="text-red-500 text-xs italic"></p>
          </div>

          <div>
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
                    className="outline-none border-2 border-gray-300 px-3 py-[2px] rounded-lg"
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
          </div>
        </form>
      </div>
    </div>
  );
};

export default Addnew;
