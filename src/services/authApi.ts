import toast from "react-hot-toast";
import { LOGIN_URL, RESETPASSWORDTOKEN_URL, RESETPASSWORD_URL, SENDOTP_URL, SIGNUP_URL } from "../config";
import { setLoading, setToken } from "../slices/authSlice"
import ApiConnector from "./ApiConnector";
import { Dispatch } from "redux";
import { setUser } from "../slices/profileSlice";
import { NavigateFunction } from "react-router-dom";
import { AppThunk } from "../main";


interface SignupProps {
    userName:string,
    email:string,
    password:string,
    otp:string
}

interface LoginProps {
    custom:string,
    password:string
}

export function sendOTP(email:string,navigate: NavigateFunction){
    return async (dispatch:Dispatch)=>{
        dispatch(setLoading(true));

        try {
            const response = await ApiConnector({ method: "POST", url: SENDOTP_URL, bodyData: { email } });
            console.log("SEND OTP API RESPONSE....", response);
            console.log(response.data);

            if (!response.data) {
                throw new Error(response.data.message);
            }

            toast.success("OTP sent successfully");
            navigate("/verify-email");
        } catch (error) {
            console.log("SEND OTP Error...",error);
            toast.error("Could not send otp");
        }

        dispatch(setLoading(false));
    }

}

export const signUpUser = (data: SignupProps, navigate: NavigateFunction): AppThunk => async (dispatch: Dispatch) => {
    
        dispatch(setLoading(true));

        try {
            const response = await ApiConnector({ method: "POST", url: SIGNUP_URL, bodyData: data });

            if (!response.data) {
                throw new Error(response.data.message);
            }
            toast.success("Account created successfully");
            navigate("/login");
        } catch (error) {
            toast.error("Could not sign up");
            navigate('/sign-up');
        }

        dispatch(setLoading(false));
    
}

export function login(data:LoginProps,navigate:NavigateFunction){
    return async (dispatch:Dispatch)=>{
        dispatch(setLoading(true));
        

        try {
            const response=await ApiConnector({method:"POST",url:LOGIN_URL,bodyData:data})
            console.log("LOGIN API RESPONSE....",response);
            console.log(response.data);

            if(!response.data){
                throw new Error(response.data.message)
            }

            toast.success("Login successfully");
            dispatch(setToken(response.data.token));

            const userImage=response.data?.user?.image?
            response.data.user.image:
            `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`;

            dispatch(setUser({...response.data.user,image:userImage}));
            localStorage.setItem("user",JSON.stringify(response.data.user));
            localStorage.setItem("token",JSON.stringify(response.data.token));

            navigate("/");

        } catch (error) {
            console.log("Login error...",error);
            toast.error("Could not login");
            navigate("/login")
        }

        dispatch(setLoading(false));
    }
}

export function resetPasswordToken(email:string,setEmailSent:React.Dispatch<React.SetStateAction<boolean>>){
    
    return async (dispatch:Dispatch)=>{
        // const toastID=toast.loading("Loading....");
        dispatch(setLoading(true));

        try {
            const response=await ApiConnector({method:"POST",url:RESETPASSWORDTOKEN_URL,bodyData:{
                email                
            }})
            console.log("Reset token API RESPONSE....",response);
            console.log(response.data);

            if(!response.data){
                throw new Error(response.data.message)
            }

            toast.success("Email sent successfully");
            setEmailSent(true);
        } catch (error) {
            console.log("SEND OTP Error...",error);
            toast.error("Could not send otp");
        }

        dispatch(setLoading(false));
        // toast.dismiss(toastID);
    }

}

export function resetPassword(password:string, confirmPassword:string, token:string,navigate: NavigateFunction) {
    return async(dispatch:Dispatch) => {
      dispatch(setLoading(true));
      try{
        const response = await ApiConnector({method:"POST", url:RESETPASSWORD_URL, bodyData:{password, confirmPassword, token}});
  
        console.log("RESET Password RESPONSE ... ", response);
  
  
        if(!response.data.success) {
          throw new Error(response.data.message);
        }
  
        toast.success("Password has been reset successfully");
        navigate("/login");
      }
      catch(error) {
        console.log("RESET PASSWORD TOKEN Error", error);
        toast.error("Unable to reset password");
      }
      dispatch(setLoading(false));
    }
}

export function logout(navigate:NavigateFunction){
    return async(dispatch:Dispatch)=>{
        dispatch(setLoading(true));
        dispatch(setToken(null));
        dispatch(setUser(null));

        localStorage.removeItem("token");
        localStorage.removeItem("user");
        toast.success("Logged Out");
        navigate("/")
        dispatch(setLoading(false));
    }
}