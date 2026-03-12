import { useEffect } from "react";
import { getProfile } from "../../../../services/profileService";
import { updateProfileInfo } from "../../../../services/profileService";
import { useState } from "react";
import "./ProfileInfo.css";

export default function ProfileInfo({ username }) {
  const [firstName, setFirstName] = useState(username?.split(" ")[0] || "");
  const [lastName, setLastName] = useState(username?.split(" ")[1] || "");
  const [headline, setHeadline] = useState("");
  const [bio, setBio] = useState("");
  const [language, setLanguage] = useState("English (US)");

 const handleSave = async () => {
  try {
    const fullName = `${firstName} ${lastName}`;

    const data = {
      fullName,
      headline,
      bio,
      languages: [language]
    };

    const response = await updateProfileInfo(data);

    console.log("Updated:", response);

  } catch (error) {
    console.error(error.response?.data || error.message);
  }
};

useEffect(() => {
  const fetchProfile = async () => {
    try {
      const res = await getProfile();
      const profile = res.profile;

      if (profile.fullName) {
        const parts = profile.fullName.split(" ");
        setFirstName(parts[0] || "");
        setLastName(parts[1] || "");
      }

      setHeadline(profile.headline || "");
      setBio(profile.bio || "");
      setLanguage(profile.languages?.[0] || "English (US)");

    } catch (err) {
      console.error(err);
    }
  };

  fetchProfile();
}, []);

  return (
    <div className="profile-container">

      <div className="form-section">
        <label className="section-title">Basics:</label>

        <input
          className="profile-input"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First Name"
        />

        <input
          className="profile-input"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last Name"
        />

        <div className="headline-wrapper">
  <input
    className="profile-input"
    type="text"
    value={headline}
    maxLength={60}
    onChange={(e) => setHeadline(e.target.value)}
    placeholder="e.g., Instructor on StudyLoop | Physics Enthusiast"
  />
  <span className="char-count">{60 - headline.length}</span>
</div>
      </div>

      <div className="form-section">
        <label className="section-title">Biography</label>

        <div className="bio-editor">
          <div className="toolbar">
            <button type="button"><b>B</b></button>
            <button type="button"><i>I</i></button>
          </div>

          <textarea
            className="profile-textarea"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Biography"
          />
        </div>
      </div>

      <div className="form-section">
        <select
          className="profile-select"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option>English (US)</option>
          <option>English (UK)</option>
        </select>
      </div>

      <button className="profile-save-btn" onClick={handleSave}>
        Save Changes
      </button>

    </div>
  );
}