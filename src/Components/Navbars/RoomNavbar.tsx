import React, { useState } from "react";
import { FiLogOut } from "react-icons/fi";
import { Link } from "react-router-dom";
import Client from "../Client";
import toast from "react-hot-toast";
import {
  useLocation,
  Navigate,
  useParams,
} from "react-router-dom";

interface Client {
  socketId: string;
  username: string;
}

const RoomNavbar: React.FC = () => {

  const location = useLocation();
  const { roomId } = useParams(); // params.roomId
  const [clients, setClients] = useState<Client[]>([
    { socketId: "1", username: "User1" },
    { socketId: "2", username: "User2" },
    { socketId: "3", username: "User3" },
  ]);


  const copyRoomId = async () => {
    try {
      await navigator.clipboard.writeText(
        window.location.pathname.split("/")[2]
      );
      toast.success("Room ID Copied");
    } catch (error) {
      toast.error("Failed to copy Room ID");
      console.log(error);
    }
  };
  if (!location.state?.username) return <Navigate to="/" />;

  return (
    <nav className=" flex h-[70px] w-full shrink-0 items-center px-5 border-2 border-green-700">
      <div className={`flex w-full items-center justify-between`}>
        <div className="flex justify-center items-center gap-4 border-2 rounded p-1">
          {clients.map((client) => (
            <Client key={client.socketId} username={client.username} />
          ))}
        </div>
        <div>
          <img src="/logo1.png" alt="Logo" height={100} width={100} />
        </div>
        <div className="flex items-center space-x-7 mr-2 justify-end">
          <button
            className="bg-orange-500 text-white py-1.5 px-3 cursor-pointer rounded hover:bg-orange-600 "
            onClick={copyRoomId}
          >
            Copy ROOM ID
          </button>
          {/* <div className="cursor-pointer group relative">
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
          </div> */}
          <button className="bg-slate-200 py-1.5 px-3 cursor-pointer rounded text-green-700 border-2 border-green-700 group">
            <Link to="/">
              <FiLogOut />
            </Link>
            <div
              className="absolute top-[60px] right-2  mx-auto bg-slate-200 text-brand-orange p-2 rounded shadow-lg 
                        z-40 group-hover:scale-100 scale-0 text-green-700
                        transition-all duration-300 ease-in-out"
            >
              <p className="text-sm">{"Leave room?"}</p>
            </div>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default RoomNavbar;
