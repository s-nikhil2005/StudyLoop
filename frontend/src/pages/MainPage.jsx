import AppProviders from '../providers/AppProviders.jsx';
import StudyLoopNavbar from '../components/Header/MainNavbar/StudyLoopNavbar.jsx';
import HomeSections from "../components/HomeSections/HomeSections.jsx";
import LandingPageFooter from "../components/LandingPageFooter/LandingPageFooter";


function MainPage(){

    return (
        <AppProviders>
           <StudyLoopNavbar />
            <HomeSections />
            <LandingPageFooter />
        </AppProviders>
    )
}

export default MainPage;