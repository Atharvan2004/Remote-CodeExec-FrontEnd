import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home.tsx";
import Auth from "./Pages/Auth.tsx";
import Room from "./Pages/Room.tsx";
import { Toaster } from "react-hot-toast";
import "./index.css";

function App() {
  return (
    <>
      <div>
        <Toaster
          position="top-center"
          toastOptions={{
            success: {
              iconTheme: {
                primary: "green",
                secondary: "white",
              },
            },
          }}
        ></Toaster>
      </div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/room/:roomId" element={<Room />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
