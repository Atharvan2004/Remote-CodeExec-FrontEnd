/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { useState } from "react";
import NewRoomModal from "../Modals/NewRoomModal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../main";
import { logout } from "../../services/authApi";

const Navbar = () => {
  const [isRoomModalOpen, setIsRoomModalOpen] = useState(false);
  const { user } = useSelector((state: RootState) => state.profile);
  const { token }=useSelector((state:RootState)=>state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <nav className=" flex h-[70px] w-full shrink-0 items-center px-5 border-2 border-green-700">
      <div className={`flex w-full items-center justify-between`}>
        {user && (
          <button
            onClick={() => setIsRoomModalOpen(true)}
            className="bg-orange-600 py-2 px-3 cursor-pointer rounded text-slate-200 hover:bg-orange-500"
          >
            Code With Friends ?
          </button>
        )}

        <div>
          <Link to="/" className=" ">
            <img src="/logo1.png" alt="Logo" height={100} width={100} />
          </Link>
        </div>

        <div className="flex items-center space-x-3  justify-end">
          {!token && !user && (
            <>
              <Link to="/login">
                <button className="bg-green-700 py-2 px-3 cursor-pointer rounded text-slate-200">
                  Log in
                </button>
              </Link>

                <Link to="/sign-up">
                  <button className="bg-green-700 py-2 px-3 cursor-pointer rounded text-slate-200">
                    Sign Up
                  </button>
                </Link>
              </>
            )
          }
         

          
          
          {
            user && token && (
              <>
                <div className="">
                  <img src={user?.image} width={35} height={35} className="rounded-full"/>
                </div>
              </div>
              <button
                className="bg-slate-200 py-1.5 px-3 cursor-pointer rounded text-green-700 border-2 border-green-700"
                onClick={() => dispatch<any>(logout(navigate))}
              >
                <FiLogOut />
              </button>
            </>
          )}
        </div>
      </div>
      {isRoomModalOpen && (
        <NewRoomModal
          isRoomModalOpen={isRoomModalOpen}
          setIsRoomModalOpen={setIsRoomModalOpen}
        />
      )}
    </nav>
  );
};

export default Navbar;
