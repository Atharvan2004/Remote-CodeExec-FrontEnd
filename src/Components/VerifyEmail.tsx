/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { sendOTP, signUpUser } from '../services/authApi';
import OTPInput from 'react-otp-input';
import {BiArrowBack} from 'react-icons/bi';
import {RxCountdownTimer} from 'react-icons/rx'


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
  <div className='flex justify-center items-center my-auto'>
      <div className='text-richblack-5 w-[27%] '>
    {
      loading?(<div className='spinner'></div>)
      :(
          <div>
              <h1 className='text-2xl font-semibold'>Verify Email</h1>
              <p className='mt-3 mb-3 text-richblack-200'>A verification code has been sent to you. Enter the code below</p>

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
                  className="w-[40px] lg:w-[54px] text-2xl border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
                  />}                    
                  />
                  <button
                  type="submit"
                  className="mt-6 mb-4 w-full rounded-[8px] font-semibold bg-yellow-50 py-[8px] px-[20px] text-richblack-900">
                  Verify & Register     
                  </button>
              </form>

              <div className='flex justify-between '>
                  <Link to={"/signup"} className='flex items-center text-sm gap-1'>
                      <BiArrowBack/>
                     <p>Back to signup</p> 
                  </Link>

                  <button className='flex items-center gap-1 text-sm text-richblue-100' onClick={()=>dispatch<any>(sendOTP(signUpData.email,navigate))}>
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