import { useState, useRef, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bell, Heart } from "lucide-react";
import Logo from "../../../assets/Logo.png";
import ExploreDropdown from "../../exploreData/ExploreDropdown";
import { logoutUser } from "../../../services/userService";
import { getUnreadCount } from "../../../services/chatServices";
import { getCurrentUser } from "../../../services/userService";
import { useAuth } from "../../../hooks/useAuth";
import "./StudyLoopNavbar.css";

function StudyLoopNavbar() {

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isExploreOpen, setIsExploreOpen] = useState(false);

  const [notificationCount, setNotificationCount] = useState(0);

  // ⭐ Added: state for current user id
  const [currentUser, setCurrentUser] = useState(null);

  const closeTimeoutRef = useRef(null);
  const navigate = useNavigate();

  const { user, setUser } = useAuth();


  /* ================================
     FETCH CURRENT USER
  ================================= */

  useEffect(() => {

    const fetchUser = async () => {

      try {

        const res = await getCurrentUser();

        setCurrentUser(res.user._id);

      } catch (err) {

        console.error("User fetch error:", err);

      }

    };

    fetchUser();

  }, []);


  /* ================================
     FETCH UNREAD NOTIFICATION COUNT
  ================================= */

  useEffect(() => {

    if (!currentUser) return;

    const fetchUnread = async () => {

      try {

        const res = await getUnreadCount(currentUser);

        setNotificationCount(res.count);

      } catch (error) {

        console.error("Unread count error:", error);

      }

    };

    fetchUnread();

  }, [currentUser]);


  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    setIsProfileOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setIsProfileOpen(false);
    }, 300);
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="w-full bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center">

        {/* LEFT SECTION */}
        <div className="flex items-center gap-6">
          <Link to="/main">
            <img
              src={Logo}
              alt="StudyLoop"
              className="h-9 w-auto object-contain"
            />
          </Link>

          <div
            className="relative"
            onMouseEnter={() => setIsExploreOpen(true)}
            onMouseLeave={() => setIsExploreOpen(false)}
          >
            <span className="text-sm font-medium text-gray-700 hover:text-indigo-600 cursor-pointer">
              Explore
            </span>
            {isExploreOpen && <ExploreDropdown />}
          </div>

          <Link
            to="/subscribe"
            className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition"
          >
            Subscribe
          </Link>
        </div>

        {/* CENTER SEARCH */}
        <div className="hidden md:flex flex-1 mx-10">
          <input
            type="text"
            placeholder="Search students, skills, or topics"
            className="w-full px-6 py-2.5 rounded-full border border-gray-300 text-sm focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* HOST + TEACH SECTION */}
        {user && (
          <div className="hidden lg:flex items-center gap-6 mr-6">
            <button
              onClick={() => navigate("/host")}
              className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition"
            >
              Host
            </button>

            <button
              onClick={() => navigate("/teach")}
              className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition"
            >
              Teach on StudyLoop
            </button>
          </div>
        )}

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-6 ml-auto">

          <Link to="/wishlist">
            <Heart className="w-5 h-5 text-gray-700 hover:text-indigo-600 transition" />
          </Link>

          {/* 🔔 Notification Bell */}
          <div
            className="relative cursor-pointer"
            onClick={() => navigate('/chat')}
          >
            <Bell className="w-5 h-5 text-gray-700 hover:text-indigo-600 transition" />

            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">
                {notificationCount}
              </span>
            )}
          </div>

          {/* PROFILE */}
          {user && (
            <div
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div
                className="w-9 h-9 bg-indigo-600 text-white flex items-center justify-center rounded-full text-sm font-semibold cursor-pointer"
                onClick={() => navigate("/owner-dashboard")}
              >
                {user.username
                  ?.split(" ")
                  .map(word => word[0])
                  .join("")
                  .toUpperCase()}
              </div>

              {isProfileOpen && (
                <div className="absolute right-0 top-12 w-64 bg-white border border-gray-200 rounded-xl shadow-lg py-3 text-sm">

                  <div
                    className="px-4 pb-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition"
                    onClick={() => navigate("/owner-dashboard")}
                  >
                    <p className="font-semibold text-gray-900">
                      {user.username}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {user.email}
                    </p>
                  </div>

                  <div className="py-2">
                    <Link to="/owner-dashboard" className="block px-4 py-2 hover:bg-gray-100">
                      User Profile
                    </Link>

                    <Link to="/my-learning" className="block px-4 py-2 hover:bg-gray-100">
                      My Learning
                    </Link>

                    <Link to="/messages" className="block px-4 py-2 hover:bg-gray-100">
                      Messages
                    </Link>
                  </div>

                  <div className="border-t border-gray-100 my-2"></div>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                  >
                    Logout
                  </button>

                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </nav>
  );
}

export default StudyLoopNavbar;