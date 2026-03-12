import AppProviders from '../providers/AppProviders.jsx';
import Navbar from '../components/Header/LandingPageNavbar/LandingPageNavbar.jsx';
import HeroSection from '../components/HeroSection/HeroSection.jsx';
import StatsSection from '../components/StatsSection/StatsSection.jsx';
import HowItWork from '../components/HowItWork/HowItWork.jsx';
import SecondaryHero from '../components/LearningProcess/LearningProcess.jsx';
import WhyPeerLearning from '../components/WhyPeerLearning/WhyPeerLearning.jsx';
import WhoIsThisFor from '../components/WhoIsThisFor/WhoIsThisFor.jsx';
import FeaturesBento from '../components/FeaturesBento/FeaturesBento.jsx';
import AboutPreview from '../components/AboutPreview/AboutPreview.jsx';
import WhatMakesThisDifferent from '../components/WhatMakeThisDifference/WhatMakeThisDifference.jsx';
import SimpleAndSafe from '../components/SimpleAndSafe/SimpleAndSafe.jsx';
import FinalCTA from '../components/FinalCTA/FinalCTA.jsx';
import LandingPageFooter from '../components/LandingPageFooter/LandingPageFooter.jsx';
import ContactSection from '../components/ContactSection/ContactSection.jsx';
function LandingPage() {
  return (
    <AppProviders>
      <Navbar />    
      <HeroSection />
      <StatsSection />
      <HowItWork />
      <SecondaryHero />
      <WhyPeerLearning />
      <WhoIsThisFor />
      <FeaturesBento />
      <AboutPreview />
      <WhatMakesThisDifferent />
      <SimpleAndSafe />
      <ContactSection />
      <FinalCTA />
      <LandingPageFooter />
     </AppProviders>
  );
}

export default LandingPage;