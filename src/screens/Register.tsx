import React from "react";
import { appTitle } from "../constant";
import { logo, ceo } from "../assets";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import AuthSDK from "../utils/AuthSDK";

const schema = yup
  .object({
    fullName: yup.string().required("Username cannot be empty"),
    email: yup
      .string()
      .email("Email format is not valid")
      .required("Email is required"),
    password: yup.string().required("Password is required"),
  })
  .required("All fields are required");

type FormValue = {
  fullName: string;
  email: string;
  password: string;
};

const Register: React.FC<{
  show: boolean;
  setShowhan: any;
  setShow: any;
}> = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormValue>({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const registerHandler = async (data: FormValue) => {
    try {
      const sdk = AuthSDK();
      await sdk.register(data.fullName, data.email, data.password);
      setTimeout(() => {
        props.setShowhan(!props.show);
      }, 2000);
    } catch (err) {
      setError("email", {
        type: "manual",
        message: "" + err,
      });

      console.log("Login fail: ", err);
    }
  };
  return (
    <div
      className={`${
        props.show ? "flex" : "hidden"
      } absolute z-[50] bottom-0 top-0 left-0 rounded-[15px] bg-white right-0 m-auto h-[60%] sm:h-[70%] md:w-[100%] lg:w-[87%] xl:w-[76%] 2xl:w-[70%] w-full sm:w-[90%] md:h-[70%] lg:h-[80%] xl:h-[85%] items-center justify-center gap-10 px-8 py-12`}
    >
      <div className="md:flex-1 md:flex flex-col hidden h-full bg-blue-50 p-5 box-border justify-between">
        <div>
          <img
            src={logo}
            alt="app-logo"
            className="w-[25px] h-[25px] sm:w-[30px] sm:h-[30px] lg:mb-8 lg:mt-5 img-rotate"
          />
          <div>
            <h1 className="lg:text-[18px] text-[16px] font-bold mb-4 mt-4 tracking-wider font-poppins">
              Find Help From Licenced Professionals{" "}
              <br className="lg:block hidden" /> From Anywhere
            </h1>
            <p className="lg:text-[14px] text-[12px] tracking-wide">
              Our registration process is easy, we just need to get to know you
              better to match you with the right professional
            </p>
          </div>
        </div>
        <div>
          <div className="flex bg-white object-bottom rounded-[10px] p-2 items-start gap-4">
            <img
              src={ceo}
              alt="Commentary"
              className="w-[50px] h-[50px] rounded-full hidden md:block shadow-lg object-contain"
            />
            <div>
              <h2 className="font-black mb-3 text-gray-800">Sunday David</h2>
              <p className="text-[11px] lg:text-[13px] tracking-wide">
                I recently used {appTitle} and was impressed with the
                convenience and quality of care. It was easy to use and allowed
                me to quickly connect with a doctore for a virtual appointment.
                Highly recommended!"
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="md:flex-1 flex flex-col lg:gap-4">
        <h1 className="sm:text-[22px] text-[20px] sm:mb-1 font-bold font-poppins">
          Get Started
        </h1>
        <h4 className="text-[#858585] sm:text-[16px] text-[14px]">
          Create your account with us to get started
        </h4>
        <form
          onSubmit={handleSubmit(registerHandler)}
          className="flex flex-col sm:gap-8 gap-5 sm:mt-10 mt-5"
        >
          <div className="flex flex-col">
            <label htmlFor="fullname" className="text-[14px]">
              Fullname
            </label>
            <input
              type="text"
              placeholder="sunday david..."
              {...register("fullName")}
              className="border-2 border-blue-200 outline-1 outline-blue-200 rounded-[5px] px-[15px] py-[2px]"
            />
            <p className="text-red-500 text-xs italic">
              {errors.fullName?.message}
            </p>
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="text-[14px]">
              E-mail Address
            </label>
            <input
              type="email"
              placeholder="user@gmail.com"
              {...register("email")}
              className="border-2 border-blue-200 outline-1 outline-blue-200 rounded-[5px] px-[15px] py-[2px]"
            />
            <p className="text-red-500 text-xs italic">
              {errors.email?.message}
            </p>
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="text-[14px]">
              Password
            </label>
            <input
              type="password"
              placeholder="*************"
              {...register("password")}
              className="border-2 border-blue-200 outline-1 outline-blue-200 rounded-[5px] px-[15px] py-[2px]"
            />
            <p className="text-red-500 text-xs italic">
              {errors.password?.message}
            </p>
          </div>
          <button className="bg-[#4285f4] w-full mt-1 rounded-[8px] py-1 text-[16px] text-white font-black">
            signup
          </button>
          <p className="text-center mt-2 text-[14px]">
            Already have an account?{" "}
            <span
              onClick={props.setShow}
              className="text-blue-900 font-bold cursor-pointer font-poppins"
            >
              Sign in
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
