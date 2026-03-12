import AppProviders from '../providers/AppProviders.jsx';
import StudyLoopNavbar from '../components/Header/MainNavbar/StudyLoopNavbar.jsx';
import MainChatComponents from '../components/MainChatComponents/MainChatComponents.jsx';

function ChatPage(){

  return (
    <AppProviders>
      <StudyLoopNavbar />
      <MainChatComponents />
    </AppProviders>
  );

}

export default ChatPage;