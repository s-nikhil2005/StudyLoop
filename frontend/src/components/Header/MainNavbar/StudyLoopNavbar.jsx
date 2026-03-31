import { useState, useRef, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bell, Heart } from "lucide-react";
import Logo from "../../../assets/Logo.png";
import ExploreDropdown from "../../exploreData/ExploreDropdown";
import { logoutUser } from "../../../services/userService";
import { getUnreadCount } from "../../../services/chatServices";
import { getCurrentUser } from "../../../services/userService";
import { navbarSearch } from "../../../services/cardServices";
import { useAuth } from "../../../hooks/useAuth";
import "./StudyLoopNavbar.css";

function StudyLoopNavbar() {

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isExploreOpen, setIsExploreOpen] = useState(false);

  const [search, setSearch] = useState("");
const [results, setResults] = useState([]);
const [showResults, setShowResults] = useState(false);

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

  const handleSearch = async (e) => {
  const value = e.target.value;
  setSearch(value);

  // empty input
  if (!value.trim()) {
    setResults([]);
    setShowResults(false);
    return;
  }

  try {
    const data = await navbarSearch(value);

    setResults(data.cards || []);
    setShowResults(true);

  } catch (err) {
    console.error("Search error:", err);
  }
};

  return (
   <nav className="navbar">
  <div className="navbar-container">

    {/* LEFT SECTION */}
    <div className="nav-left">
      <Link to="/main">
        <img src={Logo} alt="StudyLoop" className="logo" />
      </Link>

      <div
        className="nav-item relative"
        onMouseEnter={() => setIsExploreOpen(true)}
        onMouseLeave={() => setIsExploreOpen(false)}
      >
        <span>Explore</span>
        {isExploreOpen && <ExploreDropdown />}
      </div>

      <Link to="/subscribe" className="nav-item">
        Subscribe
      </Link>
    </div>

    {/* CENTER SEARCH */}
    <div className="nav-search">
      <input
        type="text"
        placeholder="Search students, skills, or topics"
        value={search}
        onChange={handleSearch}
        onFocus={() => setShowResults(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            navigate(`/search?q=${search}`);
            setShowResults(false);
          }
        }}
      />

      {showResults && (
        <div className="search-dropdown">
          {results.length > 0 ? (
            results.map((card) => (
              <div
                key={card._id}
                className="search-item"
                onClick={() => window.open(`/card/${card._id}`, "_blank")}
              >
                <p className="search-title">{card.teach.topic}</p>
                <p className="search-sub">
                  {card.teach.subject} • {card.user?.username}
                </p>
              </div>
            ))
          ) : (
            <p className="no-result">No cards available</p>
          )}
        </div>
      )}
    </div>

    <div className="nav-end">
    {/* HOST + TEACH */}
    {user && (
      <div className="nav-actions">
        <button onClick={() => navigate("/host")}>Host</button>
        <button onClick={() => navigate("/teach")}>
          Teach on StudyLoop
        </button>
      </div>
    )}

    {/* RIGHT */}
    <div className="nav-right">
      <Link to="/wishlist">
        <Heart />
      </Link>

      <div className="notification" onClick={() => navigate('/chat')}>
        <Bell />
        {notificationCount > 0 && (
          <span className="badge">{notificationCount}</span>
        )}
      </div>

      {user && (
        <div
          className="profile-wrapper"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div
            className="profile"
            onClick={() => navigate("/owner-dashboard")}
          >
            {user.username
              ?.split(" ")
              .map(word => word[0])
              .join("")
              .toUpperCase()}
          </div>

          {isProfileOpen && (
            <div className="profile-dropdown">
              <div
                className="profile-header"
                onClick={() => navigate("/owner-dashboard")}
              >
                <p className="name">{user.username}</p>
                <p className="email">{user.email}</p>
              </div>

              <Link to="/owner-dashboard">User Profile</Link>
              <Link to="/my-learning">My Learning</Link>
              <Link to="/chat">Messages</Link>

              <button onClick={handleLogout} className="logout">
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </div>

  </div>
  </div>
</nav>
  );
}

export default StudyLoopNavbar;