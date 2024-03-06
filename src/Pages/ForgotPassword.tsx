/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { resetPasswordToken } from '../services/authApi';
import { Link } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
import { useForm } from 'react-hook-form';

const ForgotPassword = () => {
    const dispatch=useDispatch();
    const [email]=useState('');
    const [emailSent,setEmailSent]=useState(false);
    const {loading}=useSelector((state:any)=>state.auth);

    const{register,handleSubmit}=useForm({
        defaultValues:{
            email:''
        }
    })

    const handleOnSubmit=(formData:{email:string})=>{

      dispatch<any>(resetPasswordToken(formData.email,setEmailSent));

    }



  return (
    <div className='flex justify-center items-center w-full h-screen my-auto bg-slate-200'>
      <div className='w-[30%] bg-white p-8 rounded-lg'>
      {
        loading?<div className='spinner'></div>
        :<div>
            {emailSent?<h1 className='text-3xl text-green-700'>Check Email</h1>:<h1 className='text-3xl text-green-700'>Reset Your Password</h1>}
            {emailSent?<p className=' font-semibold'>We have sent the reset email to {email}</p>:
            <p className='font-semibold mt-2'>Have no fear. We'll email you instructions to reset your password.
            If you dont have access to your email we can try account recovery</p>}
            
            <form onSubmit={handleSubmit(handleOnSubmit)}>
            {emailSent?<div></div>:
            
                <label>
                    <p className='mt-2 text-orange-500 font-semibold'>Email Address <sup className='text-pink-500'>*</sup></p>
                    <input
                        type='email'
                        {...register('email',{required:true})}
                        placeholder='Enter email address'
                        style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                        className="w-full mt-4 rounded-[0.5rem] border-green-700 border-2 p-[12px] pr-12 "
                    />
                </label>
            }
                <button
                type="submit"
                className="mt-5 w-full mb-2 rounded-[8px] font-semibold bg-orange-500 py-[8px] px-[12px] text-white">
                {emailSent?"Resend Email":"Send Email"}      
                </button>
            
            </form>
            
            
            

            <Link to={"/login"} className='flex items-center text-sm text-richblack-200 gap-1'>
                <BiArrowBack/>
                <p>Back to login</p> 
            </Link>
        </div>
      }
      </div>
      
    </div>
  )
}

export default ForgotPassword