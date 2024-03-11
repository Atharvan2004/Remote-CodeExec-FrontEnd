import { useContext } from "react";
import { FiLogOut } from "react-icons/fi";
import { Link } from "react-router-dom";
import Client from "../../Common/Layouts/Client";
import toast from "react-hot-toast";
import { ClientsContext } from "../../../Pages/Room";
import copy from 'copy-to-clipboard'
import Logo from '/logo1.png'

interface Client {
  socketId: string;
  username: string;
}

const RoomNavbar = () => {
  const { clients } = useContext(ClientsContext);
  const copyRoomId = async () => {
    try {
      copy(
        window.location.pathname.split("/")[2]
      );
      toast.success("Room ID Copied");
    } catch (error) {
      toast.error("Failed to copy Room ID");
    }
  };

  return (
    <nav className=" flex h-[70px] w-full shrink-0 items-center px-5 border-2 border-green-700">
      <div className={`flex w-full items-center justify-between`}>
        <div className="flex justify-center items-center gap-4 border-2 rounded p-1">
          {clients.map((client) => (
            <Client key={client.socketId} username={client.username} />
          ))}
        </div>
        <div>
          <img src={Logo} alt="Logo" height={100} width={100} />
        </div>
        <div className="flex items-center space-x-7 mr-2 justify-end">
          <button
            className="bg-orange-500 text-white py-1.5 px-3 cursor-pointer rounded hover:bg-orange-600 "
            onClick={()=>copyRoomId()}
          >
            Copy ROOM ID
          </button>
          <Link to="/" replace={true} state={""}>
            <button className="bg-slate-200 py-1.5 px-3 cursor-pointer rounded text-green-700 border-2 border-green-700 group">
              <FiLogOut />
              <div
                className="absolute top-[60px] right-2  mx-auto bg-slate-200 text-brand-orange p-2 rounded shadow-lg 
              z-40 group-hover:scale-100 scale-0 text-green-700
              transition-all duration-300 ease-in-out"
              >
                <p className="text-sm font-semibold">{"Leave room?"}</p>
              </div>
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default RoomNavbar;
