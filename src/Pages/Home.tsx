import Navbar from "../Components/Navbars/Navbar";
import WorkSpace from "../Components/WorkSpace/WorkSpace";

export default function Home() {
  return (
    <div className="h-screen">
      <div className="hidden justify-center items-center max-md:flex">
        <img
        className="h-screen"/>
      </div>

      <div className="max-md:hidden">
        <Navbar/>
        <WorkSpace />
      </div>
      
    </div>
  );
}
