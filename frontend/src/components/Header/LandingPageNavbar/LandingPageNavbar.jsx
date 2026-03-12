import Logo from "../../../assets/Logo.png";
import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import AuthButton from "../../Ui/AuthButton";




function Header() {
  return (
    <header className="sticky top-0 z-50">
      <div className="flex h-16 w-full">

        {/* LEFT: LOGO */}
        <div className="w-1/2 bg-white flex items-center px-16 md:px-8 lg:px-12">
          <Link to="/">
            <img
              src={Logo}
              alt="StudyLoop"
              className="h-12 md:h-14 w-auto object-contain"
            />
          </Link>
        </div>

        {/* RIGHT: NAV */}
        <div className="w-1/2 bg-indigo-500 flex items-center justify-end px-6 md:px-8 lg:px-12">


          <nav className="flex items-center gap-12 text-white text-sm font-medium">

            <Link to="/" className="hover:opacity-90 transition">
              Home
            </Link>

            <ScrollLink
                to="about"
              smooth
              offset={-64}
              duration={500}
              className="cursor-pointer hover:opacity-90 transition"
            >
              About Us
            </ScrollLink>

            <ScrollLink
             to="contact"
              smooth
              offset={-64}
              duration={500}
              className="cursor-pointer hover:opacity-90 transition"
            >
              Contact Us
            </ScrollLink>

            {/* REUSABLE AUTH BUTTON */}
            <AuthButton to="/login" label="Sign in" 
            className="h-10 px-6 rounded-md bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700"
            />

          </nav>
        </div>

      </div>
    </header>
  );
}

export default Header;
