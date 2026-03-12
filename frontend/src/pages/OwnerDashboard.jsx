import AppProviders from '../providers/AppProviders.jsx';
import StudyLoopNavbar from '../components/Header/MainNavbar/StudyLoopNavbar.jsx';
import OwnerDashboard from '../components/Dashboard/OwnerDashboard/OwnerDashboard.jsx';
import LandingPageFooter from "../components/LandingPageFooter/LandingPageFooter";


function OwnerDashboardPage(){

    return (
        <AppProviders>
           <StudyLoopNavbar />
            <OwnerDashboard />
            <LandingPageFooter />
        </AppProviders>
    )
}

export default OwnerDashboardPage;