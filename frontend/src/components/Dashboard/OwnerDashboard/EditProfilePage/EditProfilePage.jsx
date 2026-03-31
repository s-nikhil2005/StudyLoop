import { useState } from "react";
import ProfileInfo from "./ProfileInfo";
import ProfilePhoto from "./ProfilePhoto";
import AcademicInfo from "./AcademicInfo";
import "./EditProfilePage.css";

function EditProfilePage({ profile, setProfile, user }) {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="edit-container">
      <h2>Edit Profile</h2>
      <p className="sub-text">Manage your profile information.</p>

      <div className="edit-tabs">
        <span
          className={activeTab === "profile" ? "active-tab" : ""}
          onClick={() => setActiveTab("profile")}
        >
          Profile Info
        </span>

        <span
          className={activeTab === "photo" ? "active-tab" : ""}
          onClick={() => setActiveTab("photo")}
        >
          Profile Photo
        </span>

           <span
  className={activeTab === "academic" ? "active-tab" : ""}
  onClick={() => setActiveTab("academic")}
>
  Academic Info
</span>
      </div>

      <hr />

      <div className="edit-content">
        {activeTab === "profile" && (
          <ProfileInfo
            profile={profile}
            setProfile={setProfile}
          />
        )}

        {activeTab === "photo" && (
          <ProfilePhoto
            profile={profile}
            setProfile={setProfile}
            user={user}
          />
        )}

         {activeTab === "academic" && (
    <AcademicInfo />
  )}

      </div>
    </div>
  );
}

export default EditProfilePage;