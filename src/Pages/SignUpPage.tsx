import Template from "../Components/Template";
import signupImg from "../assets/image2.jpg";

const SignUpPage = () => {
  return (
    <div >
      <Template
        title="Join the millions learning to Code with CodeX for Free"
        description1="Build skills for today, tomorrow, and beyond."
        description2="Education to future-proof your career."
        image={signupImg}
        formType="signup"
      />
    </div>
  );
};

export default SignUpPage;
