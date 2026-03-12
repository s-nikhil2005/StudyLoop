import AppProviders from "../providers/AppProviders";
import ResetPassword from "../components/ResetPassword/ResetPassword";
import LandingPageFooter from "../components/LandingPageFooter/LandingPageFooter";
import Auth2Navbar from "../components/Header/Auth2Navbar/authNavbar";


function UpdatePasswordPage() {
  return (
    <AppProviders>
      <Auth2Navbar />
        <ResetPassword />
      <LandingPageFooter />
    </AppProviders>
  );
}

export default UpdatePasswordPage;