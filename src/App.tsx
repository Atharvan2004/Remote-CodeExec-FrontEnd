import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home.tsx";
import Room from "./Pages/Room.tsx";
import { Toaster } from "react-hot-toast";
import "./index.css";
import SignInPage from "./Pages/SignInPage.tsx";
import SignUpPage from "./Pages/SignUpPage.tsx";
import RestrictedRoute from "./Components/Common/RestrictedRoute/RestrictedRoute.tsx";
import VerifyEmail from "./Pages/VerifyEmail.tsx";
import ForgotPassword from "./Pages/ForgotPassword.tsx";
import ResetPassword from "./Pages/ResetPassword.tsx";
import { useState, useEffect } from "react";
import HashLoader from "react-spinners/HashLoader";

function App() {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
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
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<SignInPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/update-password/:id" element={<ResetPassword />} />

            <Route
              path="/room/:roomId"
              element={
                <RestrictedRoute>
                  <Room />
                </RestrictedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
