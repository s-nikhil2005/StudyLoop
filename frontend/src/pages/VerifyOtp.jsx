import AppProviders from "../providers/AppProviders";
import OTP from "../components/OTP/OTP";
import LandingPageFooter from "../components/LandingPageFooter/LandingPageFooter";
import Auth2Navbar from "../components/Header/Auth2Navbar/authNavbar";

function VerifyOtpPage() {
  return (
    <AppProviders>
      <Auth2Navbar />
        <OTP />
      <LandingPageFooter />
    </AppProviders>
  );
}

export default VerifyOtpPage;