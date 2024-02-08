import { useState } from "react";
import { v4 as uuid } from "uuid";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

type Props = {
  isRoomModalOpen: boolean;
  setIsRoomModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function NewRoomModal({ setIsRoomModalOpen }: Props) {
  const [roomId, setRoomId] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const navigate = useNavigate();

  const createNewRoom = (e: React.MouseEvent) => {
    e.preventDefault();
    const id = uuid();
    setRoomId(id);
    toast.success("New Room Created");
  };
  const handleJoinRoom = () => {
    if (roomId === "" || username === "") {
      toast.error("Please Enter Room ID and Username");
      return;
    }
    navigate(`/room/${roomId}`, { state: { username: username } });
    setIsRoomModalOpen(false);
  };
  const handleKeyEnter = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleJoinRoom();
    }
  };
  return (
    <div className="z-50">
      <div
        aria-modal="true"
        role="dialog"
        className="fixed inset-0 overflow-y-auto "
      >
        <div className=" min-h-screen flex items-center justify-center text-white ">
          <div
            className="opacity-100"
            onClick={() => setIsRoomModalOpen(false)}
          >
            <div className="fixed inset-0 bg-[rgb(38,38,38)] opacity-70"></div>
          </div>
          <div className=" rounded-[13px] my-8 inline-block min-w-[35vw] p-6 shadow-lg  bg-[rgb(40,40,40)] z-40">
            <h1 className="text-center border-b border-orange-500 px-5 py-4 text-lg font-medium">
              Want to <span className="text-orange-500">Code</span> with{" "}
              <span className="text-orange-500">Friends !</span>
            </h1>
            <h3 className=" mb-5 mt-3">
              Paste invitation <span className="text-green-600">ROOM ID</span>
            </h3>
            <div className=" flex flex-col my-2">
              <input
                type="text"
                placeholder="ROOM ID"
                className=" p-2 rounded-md outline-none border-none mb-5 font-bold text-base text-black"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                onKeyUp={handleKeyEnter}
              />
              <input
                type="text"
                placeholder="USERNAME"
                className=" p-2 rounded-md outline-none border-none mb-5 font-bold text-base text-black"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyUp={handleKeyEnter}
              />
              <button
                onClick={handleJoinRoom}
                className="bg-green-600 p-2 rounded-md text-xl font-medium cursor-pointer hover:bg-green-700 w-28 self-end transition-all"
              >
                Join
              </button>
              <span className=" my-0 mx-auto mt-5">
                If you don't have a room ID, create one! &nbsp;
                <a
                  href="#"
                  onClick={createNewRoom}
                  className=" text-orange-500 border-b border-orange-500 hover:text-orange-600 hover:border-orange-600"
                >
                  New Room
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewRoomModal;
