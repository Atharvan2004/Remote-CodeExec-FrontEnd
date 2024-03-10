import { useSelector } from "react-redux";
import SignupForm from "../Forms/SignupForm";
import frameImg from "../../../assets/frame.png";
import LoginForm from "../Forms/LoginupForm";

interface PropsType {
  title: string;
  description1: string;
  description2: string;
  image: string;
  formType: string;
}

interface RootState {
  auth: {
    loading: boolean;
  };
}

const Template = ({
  title,
  description1,
  description2,
  image,
  formType,
}: PropsType) => {
  const { loading } = useSelector((state: RootState) => state.auth);

  return (
    <div className="flex overflow-y-hidden h-[100vh] justify-center items-center  bg-slate-200">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div
          className="flex w-[80vw] py-20 flex-col-reverse justify-around rounded-3xl drop-shadow-2xl
           bg-white px-10 gap-y-12 md:flex-row md:gap-y-0 md:gap-x-12"
        >
          <div className="mx-auto w-11/12 max-w-[500px] md:mx-0">
            <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-green-800">
              {title}
            </h1>
            <p className="mt-5 text-[1.125rem] leading-[1.625rem] mb-5">
              <span className="">{description1}</span>
              <br />
              <span className="  font-bold italic text-orange-500 ">
                {description2}
              </span>
            </p>
            {formType === "signup" ? <SignupForm /> : <LoginForm />}
          </div>
          <div className="relative mx-auto my-auto w-11/12 max-w-[450px] md:mx-0 max-xl:hidden">
            <img
              src={frameImg}
              alt="Pattern"
              width={558}
              height={504}
              loading="lazy"
            />
            <img
              src={image}
              alt="Students"
              loading="lazy"
              className="absolute -top-3 right-3 z-10 w-[558px] h-[404px]"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Template;
