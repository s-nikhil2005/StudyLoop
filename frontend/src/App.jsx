import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import ForgetPasswordPage from "./pages/ForgetPassword";
import VerifyOtpPage from "./pages/VerifyOtp";
import MainPage from "./pages/MainPage";
import UpdatePassword from "./pages/UpdatePassword";
import OwnerDashboardPage from "./pages/OwnerDashboard";
import ChatPage from "./pages/chatPage";

import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";

function App() {
  return (
    <Routes>

      {/* <Route path="/" element={<LandingPage />} /> */}

      {/* Public Routes (block if logged in) */}
    <Route
  path="/"
  element={
    <PublicRoute>
      <LandingPage />
    </PublicRoute>
  }
/>

      <Route
        path="/register"
        element={
          <PublicRoute>
            <AuthPage />
           </PublicRoute>
        }
      />

      <Route
  path="/login"
  element={
    <PublicRoute>
      <AuthPage />
    </PublicRoute>
  }
/>

      <Route
        path="/forgot-password"
        element={
          <PublicRoute>
            <ForgetPasswordPage />
          </PublicRoute>
        }
      />

      <Route
        path="/verify-otp"
        element={
          // <PublicRoute>
            <VerifyOtpPage />
          // </PublicRoute>
        }
      />

      <Route
        path="/reset-password"
        element={
          <PublicRoute>
            <UpdatePassword />
           </PublicRoute>
        }
      />

      {/* Protected Route */}
      <Route
          path="/main"
          element={
            <ProtectedRoute>
              <MainPage />
            </ProtectedRoute>
          }
        />
      <Route
        path="/owner-dashboard"
        element={
          <ProtectedRoute>
            <OwnerDashboardPage />
           </ProtectedRoute>
        }
      />

     <Route
  path="/chat"
  element={
    <ProtectedRoute>
      <ChatPage />
    </ProtectedRoute>
  }
/>


      <Route
   path="/chat/:userId"
  element={
    <ProtectedRoute>
      <ChatPage />
    </ProtectedRoute>
  }
/>

    </Routes>

        
  );
}

export default App;