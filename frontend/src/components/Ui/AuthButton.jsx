import { NavLink } from "react-router-dom";

function AuthButton({
  label,
  to,
  className = "",
}) {
  return (
    <NavLink
      to={to}
      className={`inline-flex items-center justify-center transition cursor-pointer ${className}`}
    >
      {label}
    </NavLink>
  );
}

export default AuthButton;
