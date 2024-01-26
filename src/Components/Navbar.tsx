import { Link } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";

type Props = {};

const Navbar = ({}: Props) => {
  return (
    <nav className=" flex h-[70px] w-full shrink-0 items-center px-5 border-2 border-green-700">
      <div className={`flex w-full items-center justify-between`}>
        <Link to="/" className="flex-1 ">
          <img src="/logo1.png" alt="Logo" height={100} width={100} />
        </Link>

        <div className="flex items-center space-x-7 flex-1 justify-end">
          <Link to="/auth">
            <button className="bg-green-700 py-1 px-2 cursor-pointer rounded text-slate-200">
              SignIn
            </button>
          </Link>

          <div className="cursor-pointer group relative">
            <img
              src="/avatar.png"
              alt="Avatar"
              width={30}
              height={30}
              className="rounded-full border-2 border-green-700"
            />
            <div
              className="absolute top-10 left-2/4 -translate-x-2/4  mx-auto bg-slate-200 text-brand-orange p-2 rounded shadow-lg 
                        z-40 group-hover:scale-100 scale-0 text-green-700
                        transition-all duration-300 ease-in-out"
            >
              <p className="text-sm">{"Email"}</p>
            </div>
          </div>
          <button className="bg-slate-200 py-1.5 px-3 cursor-pointer rounded text-green-700 border-2 border-green-700">
            <FiLogOut />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
