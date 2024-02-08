import Header from "../Components/Navbars/Header"

type Props = {}

function Auth({}: Props) {
  return (
    <div className=" bg-gradient-to-t from-gray-600 to-black ">
      <div className=" max-w-7xl mx-auto">
        <Header/>
        <div className=" flex justify-center items-center h-[calc(100vh-5rem)] pointer-events-none select-none">
          <img src="/companies.png" alt="companies pic" />
        </div>
        </div>
    </div>
  )
}

export default Auth