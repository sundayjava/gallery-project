import { IoAdd } from "react-icons/io5";
import { useFieldArray, useForm } from "react-hook-form";
import InputWithHelp, { CategorySelect } from "../utils/InputWithHelp";
import * as yup from 'yup'

const schema = yup.object({
  caption: yup.string().required("Caption is required"),
  description: yup.string().required('description is required'),
  thumbnail: yup.object().required("Please add one or more images to give more insight"),
  tag: yup.object().required("Provide some tags"),
  category: yup.string().required("Please select a category"),
  price: yup.string().required("Enter your selling price"),
  slash_price: yup.string().required("This field cannot be empty")
})
type FormValue = {
  tags: { tag: string }[];
};

const NewItem = () => {
  const { control, register } = useForm<FormValue>({
    defaultValues: {
      tags: [{ tag: "" }],
    },
  });
  const { fields, append, remove } = useFieldArray({ 
    name: "tags",
    control,
  });
  return (
    <div className="w-full relative h-screen">
      <div className="absolute m-auto px-3 flex flex-col justify-center items-center gap-4 right-0 left-0 top-0 bottom-0 w-full sm:w-[900px] z-[10]">
        <div className="opacity-100 h-full overflow-scroll bg-gray-600 w-full py-5 sm:px-14 px-5 rounded-[4px] shadow">
          <div className="bg-gray-400 w-20 h-20 flex justify-center items-center rounded-[10px]">
            <IoAdd size={40} className="text-white" />
          </div>
          <form className="flex flex-col">
            <div className="flex gap-6 flex-wrap sm:flex-row justify-between flex-col">
              <InputWithHelp
                label="Item name"
                placeholder="3D logo for business"
                inputType="text"
                showhelp={true}
              />
              <CategorySelect label="Category" />
              <InputWithHelp
                label="Actual price"
                placeholder="₦23000.00"
                inputType="text"
                showhelp={true}
              />
              <InputWithHelp
                label="Quantity"
                placeholder="How many is avialable"
                inputType="number"
                showhelp={true}
              />
              <CategorySelect label="Color" />
              <InputWithHelp
                label="Size"
                placeholder="S112"
                inputType="text"
                showhelp={true}
              />
              <InputWithHelp
                label="Sales price"
                placeholder="₦23000.00"
                inputType="text"
                showhelp={true}
              />
              <InputWithHelp
                label="Location"
                placeholder="Ebebit"
                inputType="text"
                showhelp={true}
              />
              <div>
                <label
                  htmlFor="tag"
                  className="text-[14px] text-gray-300 tracking-wider"
                >
                  Add tags
                </label>
                <div className="flex flex-wrap items-center">
                  {fields.map((field, index) => (
                    <div className="flex items-center" key={field.id}>
                      <input
                        type="text"
                        {...register(`tags.${index}.tag` as const)}
                        className="text-[13px] border-2 border-gray-500 outline-none text-gray-200 px-2 py-1 rounded-md"
                      />
                      {index > 0 && (
                        <button
                          type="button"
                          className="text-white font-poppins text-[20px] ps-2"
                          onClick={() => remove(index)}
                        >
                          -
                        </button>
                      )}
                    </div>
                  ))}
                  <IoAdd className="text-white text-[22px] cursor-pointer" onClick={() => append({ tag: "" })} />
                </div>
              </div>
            </div>
            <div className="flex flex-col mt-5">
              <label
                htmlFor="caption"
                className="text-[14px] text-gray-300 tracking-wider"
              >
                Caption
              </label>
              <textarea
                rows={5}
                placeholder="Add a description about you item"
                className="text-[13px] border-2 border-gray-500 outline-none text-gray-200 px-2 py-1 rounded-md"
              />
            </div>
          </form>
        </div>
      </div>
      <div className="bg-black/5 backdrop-blur-lg fixed h-screen w-screen left-0 z-0" />
      <div className=" absolute z-[0] w-[80%] h-[80%] rounded-full top-0 left-0 right-0 bottom-0 white__gradient" />
      <div className=" absolute z-[0] w-[40%] h-[35%] -top-10 right-0 blue__gradient" />
      <div className=" absolute z-[0] w-[40%] h-[35%] bottom-0 left-4 blue__gradient" />
      <div className=" absolute z-[0] w-[30%] h-[30%] right-0 bottom-0 pink__gradient" />
      <div className=" absolute z-[0] w-[30%] h-[30%] left-0 -top-10 pink__gradient" />
    </div>
  );
};

export default NewItem;
