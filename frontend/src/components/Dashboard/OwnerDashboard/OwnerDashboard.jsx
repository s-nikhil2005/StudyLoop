import { useEffect, useState } from "react";
import "./OwnerDashboard.css";
import Logo from "../../../assets/Logo.png";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../../../services/userService";
import SettingsPage from "./SettingsPage/SettingsPage";
import EditProfilePage from "./EditProfilePage/EditProfilePage";
import { useAuth } from "../../../hooks/useAuth";
import { getProfile } from "../../../services/profileService";
import SkillsEditPage from "./SkillsEdit/SkillsEditPage";
import ProfilePreviewCard from "./ProfilePreviewCard/ProfilePreviewCard";
import CardsManager from "./CardsManager/CardsManager";
import { getUserCards } from "../../../services/cardServices";
import { getUserOverallRating } from "../../../services/ratingServices";


export default function OwnerDashboard() {
  const { user , setUser } = useAuth();
   const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [cards, setCards] = useState([]);
  const [userRating, setUserRating] = useState(null);

useEffect(() => {
  const fetchDashboardData = async () => {
    try {
      const profileRes = await getProfile();
      setProfile(profileRes.profile);

      const cardsRes = await getUserCards();
      setCards(cardsRes.cards || []);

      // 🔥 NEW: Fetch overall rating
      const ratingRes = await getUserOverallRating(user._id);
      setUserRating(ratingRes);

    } catch (err) {
      console.error(err);
    }
  };

  if (user?._id) {
    fetchDashboardData();
  }
}, [user]);

  const handleLogout = async () => {
    try {
      await logoutUser();
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  /* ========= helper to flatten subjects ========= */

  const buildRows = (subjects) => {
    if (!subjects) return [];

    return subjects.flatMap((item) =>
      item.topics.map((topic) => ({
        subject: item.subject,
        topic: topic,
        level: item.level
      }))
    );
  };

  const renderMainContent = () => {

    if (activeMenu === "settings") {
      return <SettingsPage />;
    }

    if (activeMenu === "editProfile") {
      return (
        <EditProfilePage
          profile={profile}
          setProfile={setProfile}
          user={user}
        />
      );
    }

    if (activeMenu === "skills") {
      return <SkillsEditPage profile={profile} setProfile={setProfile} />;
    }

    if (activeMenu === "cards") {
      return (
        <CardsManager
          profile={profile}
          // setProfile={setProfile}
        />
      );
    }

    /* ===== build rows for dashboard ===== */

    const teachRows = buildRows(profile?.subjectsKnown).slice(0, 4);
    const learnRows = buildRows(profile?.subjectsToLearn).slice(0, 4);

    return (
      <>
        {/* ================= TEACH SECTION ================= */}

        <div className="card">
          <h4>Subjects I Teach</h4>

          <div className="dashboard-table">

            {teachRows.length > 0 ? (
              teachRows.map((row) => (
                <div key={`${row.subject}-${row.topic}`} className="dashboard-row">

                  <div className="col subject-badge">
                    {row.subject}
                  </div>

                  <div className="col topic-badge">
                    {row.topic}
                  </div>

                  <div className={`col level-badge ${row.level?.toLowerCase()}`}>
                    {row.level}
                  </div>

                </div>
              ))
            ) : (
              <p className="empty-small">No subjects added yet.</p>
            )}

          </div>
        </div>


        {/* ================= LEARN SECTION ================= */}

        <div className="card">
          <h4>Subjects I Need Help In</h4>

          <div className="dashboard-table">

            {learnRows.length > 0 ? (
              learnRows.map((row) => (
                <div key={`${row.subject}-${row.topic}`} className="dashboard-row">

                  <div className="col subject-badge learn-subject">
                    {row.subject}
                  </div>

                  <div className="col topic-badge">
                    {row.topic}
                  </div>

                  <div className={`col level-badge ${row.level?.toLowerCase()}`}>
                    {row.level}
                  </div>

                </div>
              ))
            ) : (
              <p className="empty-small">No learning goals added yet.</p>
            )}

          </div>
        </div>

        <div className="card"><h4>Total Earnings (Donut Chart)</h4></div>
        <div className="card"><h4>Sessions Completed</h4></div>
        <div className="card"><h4>Recent Doubts</h4></div>
        <div className="card"><h4>Rating & Reviews</h4></div>
      </>
    );
  };

  return (
    <div className="dashboard-container">

      {/* SIDEBAR */}

      <div className="sidebar">

      <div className="profile-box">
  <div className="mini-avatar">
    {profile?.profilePhoto ? (
      <img
        src={profile.profilePhoto}
        alt="Profile"
        className="avatar-img"
      />
    ) : (
      (profile?.fullName ||user?.username || "U")
        .split(" ")
        .map(word => word[0])
        .join("")
        .toUpperCase()
    )}
  </div>

  <h4>{user?.username}</h4>
  <p className="user-email">{user?.email}</p>
</div>

        <div className="menu-section">
          <h5>MENU</h5>

          <p
            className={activeMenu === "dashboard" ? "active-menu" : ""}
            onClick={() => setActiveMenu("dashboard")}
          >
            Dashboard
          </p>

          <p
            className={activeMenu === "skills" ? "active-menu" : ""}
            onClick={() => setActiveMenu("skills")}
          >
            Skills & Goals
          </p>

          <p>My Sessions</p>
          <p>My Earnings</p>
          <p>My Doubts</p>
        </div>

        <div className="menu-section">
          <h5>PREFERENCE</h5>

          <p
            className={activeMenu === "settings" ? "active-menu" : ""}
            onClick={() => setActiveMenu("settings")}
          >
            Settings
          </p>

          <p>Help Center</p>
        </div>

        {/* <button className="logout-btn">Logout</button> */}
         <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>

      </div>


      {/* MIDDLE SECTION */}

      <div className="main-content">
        {renderMainContent()}
      </div>


      {/* RIGHT PANEL */}

      <div className="right-panel">

        <div className="big-avatar">
          {profile?.profilePhoto ? (
            <img src={profile.profilePhoto} alt="Profile" />
          ) : (
            (profile?.fullName || user?.username || "U")
              .split(" ")
              .map(word => word[0])
              .join("")
              .toUpperCase()
          )}
        </div>

        <h3>{profile?.fullName || user?.username}</h3>

        <p className="exam-info">
          {profile?.examTarget || "Complete your profile"}
        </p>

        <p className="bio">
          {profile?.headline || "Add a headline in your profile settings."}
        </p>

        <div className="stats">
          <div>
           <h4>{userRating?.avgRating || "0.0"}</h4>
              <span>Rating ({userRating?.totalReviews || 0})</span>
          </div>
          <div>
            <h4>{profile?.teachingConfig?.totalSessions || "0"}</h4>
            <span>Sessions</span>
          </div>
        </div>

        <button
          className="edit-btn"
          onClick={() => setActiveMenu("editProfile")}
        >
          Edit Profile
        </button>

        <div className="card">
          <h4>My Public Profile Preview</h4>

         <ProfilePreviewCard
  profile={profile}
  cardCount={cards.length}
  onEditCards={() => setActiveMenu("cards")}
/>

        </div>

      </div>
          
    </div>
  );
}