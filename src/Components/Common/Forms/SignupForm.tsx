import { useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLoading, setSignUpData } from "../../../slices/authSlice";
import { sendOTP } from "../../../services/authApi";
import { useState } from "react";

function SignupForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      userName: "",
      email: "",
      password: "",
    },
  });

  const handleOnSubmit = async (formData: {
    userName: string;
    email: string;
    password: string;
  }) => {
    const data = {
      userName: formData.userName,
      email: formData.email,
      password: formData.password,
    };
    setLoading(true);
    dispatch(setSignUpData(data));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dispatch<any>(sendOTP(data.email, navigate)); // Fix: Add type annotation to dispatch
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(handleOnSubmit)}
        className="flex w-full flex-col gap-y-4"
      >
        <label>
          <p className="mb-1 text-[0.875rem] leading-[1.375rem] font-semibold">
            User Name <sup className="text-pink-200">*</sup>
          </p>
          <input
            type="text"
            {...register("userName", { required: true })}
            placeholder="Enter user-name"
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className="w-full rounded-[0.5rem] border-green-700 border-2 p-[12px] focus:outline-none "
          />
        </label>

        <label className="w-full">
          <p className="mb-1 text-[0.875rem] leading-[1.375rem] font-semibold">
            Email Address <sup className="text-pink-200">*</sup>
          </p>
          <input
            type="text"
            {...register("email", { required: true })}
            placeholder="Enter email address"
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className="w-full rounded-[0.5rem]  border-green-700 border-2 p-[12px] focus:outline-none  "
          />
        </label>

        <label className="relative">
          <p className="mb-1 text-[0.875rem] leading-[1.375rem] font-semibold ">
            Create Password <sup className="text-pink-200">*</sup>
          </p>
          <input
            type={showPassword ? "text" : "password"}
            {...register("password", { required: true })}
            placeholder="Enter Password"
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className="w-full rounded-[0.5rem]  border-green-700 border-2 p-[12px] pr-10 focus:outline-none "
          />
          <span
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-[38px] z-[10] cursor-pointer"
          >
            {showPassword ? (
              <AiOutlineEyeInvisible fontSize={24} />
            ) : (
              <AiOutlineEye fontSize={24} />
            )}
          </span>
        </label>

        <button
          type="submit"
          className="mt-6 rounded-[8px] py-[10px] px-[12px]  bg-orange-500 text-white font-semibold"
        >
          Create Account
        </button>
      </form>
    </div>
  );
}

export default SignupForm;
