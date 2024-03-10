/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { sendOTP, signUpUser } from '../services/authApi';
import OTPInput from 'react-otp-input';
import {BiArrowBack} from 'react-icons/bi';
import {RxCountdownTimer} from 'react-icons/rx';
import Not_Available from '../assets/not_available.jpg';


const VerifyEmail = () => {
  const[otp,setOtp]=useState("");
  const{loading,signUpData}=useSelector((state:any)=>state.auth);
  const dispatch=useDispatch();
  const navigate=useNavigate();

  useEffect(() => {
      if (!signUpData) {
        navigate("/sign-up");
      }
    }, []);

  const handleOnSubmit=(e: React.FormEvent<HTMLFormElement>)=>{
      e.preventDefault();     

      const { userName, email, password } = signUpData;

      dispatch<any>(signUpUser(
        {
          userName,
          email,
          password,
          otp
        },
        navigate
      ));

  }

return (
  <div className='flex justify-center items-center h-[100vh] bg-slate-200'>
    <div className="hidden justify-center items-center max-md:flex">
        <img
        src={Not_Available}
        className="h-screen"/>
      </div>

    <div className=' w-[520px] flex justify-center items-center bg-white px-6 py-10 rounded-lg max-md:hidden'>
  {
    loading?(<div className='spinner'></div>)
    :(
        <div>
            <h1 className='text-2xl font-semibold text-center text-green-700'>Verify Email..</h1>
            <p className='mt-4 mb-4 font-semibold'>A verification code has been sent to you.<br></br> Enter the code below:
            </p>

            <form onSubmit={handleOnSubmit}>
                <OTPInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                renderSeparator={<span className='invisible'>ab</span>}
                renderInput={(props) => <input
                {...props}                    
                style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-[40px] lg:w-[54px] text-2xl border-2 rounded-[0.5rem] aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50 border-green-700"
                />}                    
                />
                <button
                type="submit"
                className="mt-6 mb-4 w-full rounded-[8px] font-semibold bg-orange-500 py-[8px] px-[20px] text-white">
                Verify & Register     
                </button>
            </form>

            <div className='flex justify-between '>
                <Link to={"/sign-up"} className='flex items-center text-sm gap-1'>
                    <BiArrowBack/>
                    <p>Back to signup</p> 
                </Link>

                <button className='flex items-center gap-1 text-sm ' onClick={()=>dispatch<any>(sendOTP(signUpData.email,navigate))}>
                <RxCountdownTimer/>
                <p>Resend it</p>
                </button>
            </div>

            
        </div>
    )
  }
    </div>
  </div>
  
)
}

export default VerifyEmail