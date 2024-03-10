import Template from "../Components/Common/Layouts/Template";
import loginImg from "../assets/image1.jpg";
import Not_Available from "../assets/not_available.jpg";

function SignInPage() {
  return (
    <div>
      <div className="hidden justify-center items-center max-md:flex">
        <img src={Not_Available} className="h-screen" />
      </div>

      <div className="max-md:hidden">
        <Template
          title="Welcome Back"
          description1="Build skills for today, tomorrow, and beyond."
          description2="Education to future-proof your career."
          image={loginImg}
          formType="login"
        />
      </div>
    </div>
  );
}

export default SignInPage;
