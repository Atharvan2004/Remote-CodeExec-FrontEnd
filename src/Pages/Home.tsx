import Navbar from "../Components/Core/Navbars/Navbar";
import WorkSpace from "../Components/Core/WorkSpace/WorkSpace";
import not_available from "../assets/not_available.jpg";
import HashLoader from "react-spinners/HashLoader";
import { useState, useEffect } from "react";

export default function Home() {
  const [loading, setLoading] = useState(false);
    useEffect(() => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }, []);
  return (
    <>
       {loading ? (
        <HashLoader
          color="#36d64f"
          size={100}
          aria-label="Loading Spinner"
          data-testid="loader"
          cssOverride={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            width: "100vw",
          }}
        />
      ) : (
    <div className="h-screen">
      <div className="hidden justify-center items-center max-md:flex">
        <img src={not_available} className="h-screen" />
      </div>

      <div className="max-md:hidden">
        <Navbar />
        <WorkSpace />
      </div>
    </div>
      )}
      </>
  );
}
