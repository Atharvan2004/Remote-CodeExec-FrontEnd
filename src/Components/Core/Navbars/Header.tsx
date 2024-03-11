import { Link } from "react-router-dom";
import Logo from '/logo1.png'

function Header() {
  return (
    <div className=" flex items-center justify-between sm:px-12 px-2 md:px-24  ">
      <Link to={"/"} className=" flex items-center justify-center h-20">
        <img src={Logo} alt="logo" height={300} width={300} />
      </Link>
      <button className="text-white bg-orange-500 px-2 py-1 sm:px-4 rounded-md text-sm font-medium hover:bg-white hover:border-orange-500 hover:text-orange-500 hover:border-2 border-2 border-transparent ">
        Sign In
      </button>
    </div>
  );
}

export default Header;
