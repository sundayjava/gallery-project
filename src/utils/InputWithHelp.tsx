import { IoHelp } from "react-icons/io5";

export const CategorySelect:React.FC<{
    label: string;
}> = (props) => {
  return (
    <div className="flex flex-col gap-[2px] mt-5">
      <label
        htmlFor={props.label}
        className="text-[14px] text-gray-300 tracking-wider"
      >
        {props.label}
      </label>
      <select className="text-[13px] border-2 border-gray-500 outline-none text-gray-200 px-2 py-1 rounded-md">
        <option value="" disabled>
          Choose an option
        </option>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </select>
    </div>
  );
};

const InputWithHelp: React.FC<{
  label: string;
  placeholder: string;
  inputType: string;
  showhelp: boolean;
  error: any
}> = (props) => {
  return (
    <div className="flex flex-col gap-[2px] mt-5">
      <label
        htmlFor={`${props.label}`}
        className="text-[14px] text-gray-300 tracking-wider"
      >
        {props.label}
      </label>
      <div className="flex items-center gap-x-1">
        <input
          type={props.inputType}
          placeholder={props.placeholder}
          className="text-[13px] border-2 border-gray-500 outline-none text-gray-200 px-2 py-1 rounded-md"
        />
        {props.showhelp && (
          <IoHelp className="w-[28px] h-[28px] cursor-help rounded-full bg-gray-400 text-white p-1 font-poppins" />
        )}
      </div>
      <p className="text-red-500 text-xs italic">{props.error}</p>
    </div>
  );
};

export default InputWithHelp;
