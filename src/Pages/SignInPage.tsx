import Template from "../Components/Template"
import loginImg from "../assets/image1.jpg"

function SignInPage() {
  return (
    <Template
      title="Welcome Back"
      description1="Build skills for today, tomorrow, and beyond."
      description2="Education to future-proof your career."
      image={loginImg}
      formType="login"
    />
  )
}

export default SignInPage