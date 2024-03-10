import Template from "../Components/Common/Layouts/Template";
import signupImg from "../assets/image2.jpg";
import Not_Available from "../assets/not_available.jpg";

const SignUpPage = () => {
  return (
    <div>
      <div className="hidden justify-center items-center max-md:flex">
        <img src={Not_Available} className="h-screen" />
      </div>

      <div className="max-md:hidden">
        <Template
          title="Join the millions learning to Code with CodeX for Free"
          description1="Build skills for today, tomorrow, and beyond."
          description2="Education to future-proof your career."
          image={signupImg}
          formType="signup"
        />
      </div>
    </div>
  );
};

export default SignUpPage;
