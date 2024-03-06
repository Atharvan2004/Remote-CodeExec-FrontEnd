import { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setLoading } from '../slices/authSlice';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { login } from '../services/authApi';

const LoginForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [showPassword, setShowPassword] = useState(false);

  const{register,handleSubmit}=useForm({
    defaultValues:{
      custom:'',
      password:''
    }
  });

  const handleOnSubmit = async (formData: { custom:string, password: string }) => {
    const data = {
      custom:formData.custom,
      password: formData.password
    };
    setLoading(true);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dispatch<any>(login(data, navigate)); 
  }


  return (
    <div>
      <form onSubmit={handleSubmit(handleOnSubmit)} className="flex w-full flex-col gap-y-4">

          <label>
            <p className="mb-4 text-[0.875rem] leading-[1.375rem] font-semibold ">
              Username Or Email <sup className="text-pink-500">*</sup>
            </p>
            <input
              type="text"
              {...register('custom',{required:true})}
              placeholder="Enter user-name"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] p-[12px] border-green-700 border-2 select-none"
            />
          </label>
        
          <label className="relative">
            <p className="mb-4 text-[0.875rem] leading-[1.375rem] font-semibold">
              Password <sup className="text-pink-500">*</sup>
            </p>
            <input
              type={showPassword ? "text" : "password"}
              
              {...register('password',{required:true})}
              placeholder="Enter Password"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] p-[12px] pr-10 border-green-700 border-2 select-none"
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-[50px] z-[10] cursor-pointer"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible fontSize={24} />
              ) : (
                <AiOutlineEye fontSize={24} />
              )}
            </span>

            <Link to="/forgot-password">
              <p className="mt-4 ml-auto max-w-max text-s text-black underline">
                Forgot Password..
              </p>
            </Link>
          </label>

        <button
          type="submit"
          className="mt-5 rounded-[8px] bg-orange-500 py-[10px] px-[14px] font-semibold text-white ">
          Login
        </button>
      </form>
    </div>
  )
}

export default LoginForm