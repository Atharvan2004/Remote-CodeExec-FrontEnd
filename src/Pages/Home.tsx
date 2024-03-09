import Navbar from "../Components/Navbars/Navbar";
import WorkSpace from "../Components/WorkSpace/WorkSpace";
import Not_Available from '../../public/not_available.jpg'

export default function Home() {
  return (
    <div className="h-screen">
      <div className="hidden justify-center items-center max-md:flex">
        <img
        src={Not_Available}
        className="h-screen"/>
      </div>

      <div className="max-md:hidden">
        <Navbar/>
        <WorkSpace />
      </div>
      
    </div>
  );
}
