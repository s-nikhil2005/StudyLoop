import AppProviders from "../providers/AppProviders";
import Auth2Navbar from "../components/Header/Auth2Navbar/authNavbar";
import LandingPageFooter from "../components/LandingPageFooter/LandingPageFooter";
import ForgotPasswordForm from "../components/Forgetpassword/Forgetpassword";

function ForgetPasswordPage() {
  return (
    <AppProviders>
      <Auth2Navbar />
      <ForgotPasswordForm />
      <LandingPageFooter />
    </AppProviders>
  );
}

export default ForgetPasswordPage;