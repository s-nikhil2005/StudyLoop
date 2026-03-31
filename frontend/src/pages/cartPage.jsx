import AppProviders from '../providers/AppProviders.jsx';
import StudyLoopNavbar from '../components/Header/MainNavbar/StudyLoopNavbar.jsx';
import Cart from '../components/cart/cart.jsx';
import LandingPageFooter from "../components/LandingPageFooter/LandingPageFooter";


function CartPage(){

    return (
        <AppProviders>
           <StudyLoopNavbar />
            <Cart />
            <LandingPageFooter />
        </AppProviders>
    )
}

export default CartPage;