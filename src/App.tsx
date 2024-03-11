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
    </>
  );
}

export default App;
