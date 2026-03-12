import { useLocation, useNavigate } from "react-router-dom";
import AuthHeader from "../components/Header/AuthNavbar/AuthNavbar.jsx";
import LandingPageFooter from "../components/LandingPageFooter/LandingPageFooter.jsx";
import LoginForm from "../components/auth/LoginForm/LoginForm.jsx";
import RegisterForm from "../components/auth/RegisterForm/RegisterForm.jsx";

function AuthPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const isRegister = location.pathname === "/register";

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">

      {/* Header */}
      <AuthHeader />

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center py-12">
        {isRegister ? (
          <RegisterForm switchMode={() => navigate("/login")} />
        ) : (
          <LoginForm switchMode={() => navigate("/register")} />
        )}
      </div>

      {/* Footer */}
      <LandingPageFooter />
    </div>
  );
}

export default AuthPage;