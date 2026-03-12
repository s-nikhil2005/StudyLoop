import Logo from "../../../assets/Logo.png";
import { NavLink } from "react-router-dom";
import "./AuthNavbar.css";

function AuthHeader() {
  return (
    <header className="auth-header">
      
      {/* Left Logo */}
      <div className="logo-container">
        <NavLink to="/">
          <img src={Logo} alt="Logo" />
        </NavLink>
      </div>

      {/* Center Toggle */}
      <div className="toggle-container">
        <NavLink
          to="/register"
          className={({ isActive }) =>
            isActive ? "toggle-btn active" : "toggle-btn"
          }
        >
          Sign Up
        </NavLink>

        <NavLink
          to="/login"
          className={({ isActive }) =>
            isActive ? "toggle-btn active" : "toggle-btn"
          }
        >
          Login
        </NavLink>
      </div>

      {/* Empty right side (balance) */}
      <div className="right-space"></div>

    </header>
  );
}

export default AuthHeader;