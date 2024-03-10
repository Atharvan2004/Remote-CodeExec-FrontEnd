import Navbar from "../Components/Core/Navbars/Navbar";
import WorkSpace from "../Components/Core/WorkSpace/WorkSpace";
import not_available from "../assets/not_available.jpg";

export default function Home() {
  return (
    <div className="h-screen">
      <div className="hidden justify-center items-center max-md:flex">
        <img src={not_available} className="h-screen" />
      </div>

      <div className="max-md:hidden">
        <Navbar />
        <WorkSpace />
      </div>
    </div>
  );
}
