import AppProviders from '../providers/AppProviders.jsx';
import StudyLoopNavbar from '../components/Header/MainNavbar/StudyLoopNavbar.jsx';
import SearchCard from '../components/SearchPage/SearchPage.jsx';
import LandingPageFooter from "../components/LandingPageFooter/LandingPageFooter";


function SearchPage(){

    return (
        <AppProviders>
           <StudyLoopNavbar />
            <SearchCard />
            <LandingPageFooter />
        </AppProviders>
    )
}

export default SearchPage;