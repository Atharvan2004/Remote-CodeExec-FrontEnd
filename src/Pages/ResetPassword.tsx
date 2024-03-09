/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { resetPassword } from "../services/authApi";
import { useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import Not_Available from '../../public/not_available.jpg'

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { loading } = useSelector((state: any) => state.auth);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword] = useState(false);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const handleOnSubmit = (formData: {
    password: string;
    confirmPassword: string;
  }) => {
    const token = location.pathname.split("/")[2].charAt(-1) || "";

    dispatch<any>(
      resetPassword(
        formData.password,
        formData.confirmPassword,
        token,
        navigate
      )
    );
  };

  return (
    <div>
      <div className="hidden justify-center items-center max-md:flex">
        <img
        src={Not_Available}
        className="h-screen"/>
      </div>

      <div className="flex justify-center items-center h-screen bg-slate-200 max-md:hidden">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="w-[500px] rounded-3xl drop-shadow-2xl bg-white p-6">
          <h1 className=" text-3xl mb-3 font-semibold text-center text-green-700">
            Choose New Password
          </h1>
          <p className=" mb-3 text-orange-500 font-semibold ">
            Almost done. Enter your new password and you're all set.
          </p>

          <form onSubmit={handleSubmit(handleOnSubmit)}>
            <label className="relative text-sm">
              <p className="font-semibold mb-1 text-[0.875rem] leading-[1.375rem]">
                New password <sup className="text-pink-500">*</sup>
              </p>
              <input
                {...register("password", { required: true })}
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-full mt-1 mb-5 rounded-[0.5rem] p-[12px] pr-12 border-2 border-green-700 focus:outline-none "
              />

              <span
                onClick={() => setShowPassword((prevState) => !prevState)}
                className="absolute text-xl top-14 left-[410px]"
              >
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </span>
            </label>

            <label className="relative text-sm">
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] font-semibold">
                Confirm new password <sup className="text-pink-500">*</sup>
              </p>
              <input
                {...register("confirmPassword", { required: true })}
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Renter password"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-full mt-1 rounded-[0.5rem] p-[12px] pr-12 border-2 border-green-700 focus:outline-none "
              />
              {/* <span onClick={()=>setShowConfirmPassword((prevState)=>!prevState)}
                        className='absolute text-xl top-18'>
                        {showConfirmPassword?
                        <AiOutlineEyeInvisible/>
                        :<AiOutlineEye/>}
                    </span> */}
            </label>

            <button
              type="submit"
              className="mt-6 w-full mb-3 rounded-[8px] font-semibold bg-orange-500 text-white py-[8px] px-[12px]"
            >
              Reset Password
            </button>

            <Link to={"/login"} className="flex items-center text-sm gap-1 font-medium">
              <BiArrowBack />
              <p>Back to login</p>
            </Link>
          </form>
        </div>
      )}
      </div>
    </div>

    
  );
};

export default ResetPassword;
