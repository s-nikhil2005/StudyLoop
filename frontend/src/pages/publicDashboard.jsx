import AppProviders from '../providers/AppProviders.jsx';
import StudyLoopNavbar from '../components/Header/MainNavbar/StudyLoopNavbar.jsx';
import PublicProfile from "../components/Dashboard/PublicDashboard/PublicProfile";
import LandingPageFooter from "../components/LandingPageFooter/LandingPageFooter";


function PublicProfilePage(){

    return (
        <AppProviders>
           <StudyLoopNavbar />
            <PublicProfile />
            <LandingPageFooter />
        </AppProviders>
    )
}

export default PublicProfilePage;   