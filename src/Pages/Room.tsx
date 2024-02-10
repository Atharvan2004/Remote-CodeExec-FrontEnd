import { createContext, useState } from "react";
import Client from "../Components/Client";
import RoomNavbar from "../Components/Navbars/RoomNavbar";
import RoomWorkSpace from "../Components/WorkSpace/RoomWorkspace";

interface Client {
  socketId: string;
  username: string;
}

interface ClientsContextType {
  clients: Client[];
  setClients: React.Dispatch<React.SetStateAction<Client[]>>;
}

// Create the context
const ClientsContext = createContext<ClientsContextType>({
  clients: [],
  setClients: () => {}, // Placeholder function
});

const Room: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  return (
    <>
      <ClientsContext.Provider value={{clients, setClients}}>
        <RoomNavbar />
        <RoomWorkSpace />
      </ClientsContext.Provider>
    </>
  );
};

export default Room;
export { ClientsContext };
