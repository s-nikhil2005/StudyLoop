import Logo from "../../../assets/Logo.png";
import { NavLink } from "react-router-dom";
import "./Auth2Navbar.css";

function authNavbar() {
  return (
          <header className="auth-header">
               
               {/* Left Logo */}
               <div className="logo-container">
                 <NavLink to="/">
                   <img src={Logo} alt="Logo" />
                 </NavLink>
               </div>
          </header>
  )
};

export default authNavbar;