import Template from '../Components/Template'
import signupImg from '../assets/image2.jpg'

const SignUpPage = () => {
  return (
    <Template
      title="Join the millions learning to code with CodeX for free"
      description1="Build skills for today, tomorrow, and beyond."
      description2="Education to future-proof your career."
      image={signupImg}
      formType="signup"
    />
  )  
}

export default SignUpPage