import { appTitle } from "../constant";
import { logo } from "../assets";
import { FaKey, FaGoogle, FaFacebook } from "react-icons/fa6";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import AuthSDK from "../utils/AuthSDK";
import { showToast } from "../contexts/ToastCotext";
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { slideIn } from "../utils/motion";
import Register from "./Register";

const schema = yup
  .object({
    email: yup
      .string()
      .email("Email format is not valid")
      .required("Email is required"),
    password: yup.string().required("Password is required"),
  })
  .required("All fields are required");

type FormValue = {
  email: string;
  password: string;
};

export const Login = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const [showOtherOption, setShowOtherOption] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  function setShowSignup() {
    return setShowRegister(!showRegister);
  }

  if (!authContext) {
    return null;
  }

  const { dispatch } = authContext;
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormValue>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormValue) => {
    try {
      const sdk = AuthSDK();
      const response = await sdk.login(data.email, data.password);

      dispatch({
        type: "LOGIN",
        payload: {
          user: response.data,
          token: response.authToken,
        },
      });
      showToast(dispatch, "Login successfull");
      navigate("/dashboard");
    } catch (err) {
      setError("email", {
        type: "manual",
        message: "Incorrect email or password",
      });

      console.log("Login fail: ", err);
    }
  };

  return (
    <div className="w-full relative h-screen">
      <div className="absolute m-auto px-3 flex flex-col justify-center items-center gap-4 right-0 left-0 top-0 bottom-0 w-full sm:w-[500px] h-[50%] lg:h-[50%] md:h-[60%] z-[10]">
        <div className=" bg-white opacity-100  w-full py-5 px-14 rounded-[4px] shadow">
          <div className="flex justify-start items-center gap-3">
            <img
              src={logo}
              className="img-rotate w-[30px] h-[30px] object-contain"
            />
            <span className="font-normal">{appTitle}</span>
          </div>
          <h2 className="font-comforta font-black mt-7 text-[20px]">Sign in</h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5 mt-10"
          >
            <div className="w-full mb-2 flex flex-col gap-2">
              <input
                type="email"
                placeholder="🧑‍🦲 Email or username"
                {...register("email")}
                className="outline-none border-b-2 border-blue-100 font-bold text-[15px]"
              />
              <p className="text-red-500 text-xs italic">
                {errors.email?.message}
              </p>
            </div>
            <div className="w-full mb-2 flex flex-col gap-2">
              <input
                type="password"
                placeholder="🔐 password"
                {...register("password")}
                className="outline-none border-b-2 border-blue-100 font-bold text-[15px]"
              />
              <p className="text-red-500 text-xs italic">
                {errors.password?.message}
              </p>
            </div>
            <p className="font-bold text-[15px] mt-4">
              No account?{" "}
              <span
                className="cursor-pointer text-[#4285f4]"
                onClick={setShowSignup}
              >
                Create new!
              </span>
            </p>
            <p className="text-[#4285f4] font-bold text-[16px] cursor-pointer">
              Can`t access your account?
            </p>
            <div className="w-full flex justify-end mt-10">
              <button className=" bg-[#4285f4] text-white px-4 py-1 text-[14px] rounded-[5px] font-bold">
                Sign in
              </button>
            </div>
          </form>
        </div>
        <div className=" bg-white opacity-100 w-full px-14 py-[3px] flex justify-start items-center">
          <FaKey color="gray" className=" me-2" />
          <h4
            className="text-[14px] hover:text-[#4285f4] cursor-pointer"
            onClick={() => setShowOtherOption((prev) => !prev)}
          >
            {" "}
            Sign-in options
          </h4>
          {showOtherOption ? (
            <motion.div
              variants={slideIn("left", "tween", 0.2, 1)}
              className="flex items-center gap-7 ms-10"
            >
              <FaGoogle color="#4285f4" size={25} className=" cursor-pointer" />
              <FaFacebook color="#4285f4" size={26} className=" cursor-pointer" />
            </motion.div>
          ) : null}
        </div>
      </div>

      <div className="bg-black/5 backdrop-blur-lg fixed h-screen w-screen left-0 z-0" />
      <div className=" absolute z-[0] w-[80%] h-[80%] rounded-full top-0 left-0 right-0 bottom-0 white__gradient" />
      <div className=" absolute z-[0] w-[40%] h-[35%] -top-10 right-0 blue__gradient" />
      <div className=" absolute z-[0] w-[40%] h-[35%] bottom-0 left-4 blue__gradient" />
      <div className=" absolute z-[0] w-[30%] h-[30%] right-0 bottom-0 pink__gradient" />
      <div className=" absolute z-[0] w-[30%] h-[30%] left-0 -top-10 pink__gradient" />
      <Register setShow={setShowSignup} show={showRegister} setShowhan={setShowRegister}/>
      <div
        onClick={setShowSignup}
        className={`${
          showRegister ? "bottom-0" : "bottom-full"
        } bg-black/5 backdrop-blur-lg fixed h-screen w-screen left-0 z-[12]`}
      />
    </div>
  );
};
