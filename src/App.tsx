import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home.tsx";
import Auth from "./Pages/Auth.tsx";
import "./index.css"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
