import { useEffect, useState } from "react";
import { getProfile, updateProfileInfo } from "../../../../services/profileService";
import "./AcademicInfo.css";

export default function AcademicInfo() {

  const [classLevel, setClassLevel] = useState("");
  const [examTarget, setExamTarget] = useState("");

  // 🔥 SAVE FUNCTION
  const handleSave = async () => {
    try {
      const data = {
        classLevel,
        examTarget
      };
       console.log({ classLevel, examTarget });
      const res = await updateProfileInfo(data);

      console.log("Academic Updated:", res);

    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  // 🔥 FETCH EXISTING DATA
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getProfile();
        const profile = res.profile;

        setClassLevel(profile.classLevel || "");
        setExamTarget(profile.examTarget || "");

      } catch (err) {
        console.error(err);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="academic-container">

      {/* CLASS LEVEL */}
      <div className="form-section">
        <label className="section-title">Class Level</label>

        <select
          className="profile-select"
          value={classLevel}
          onChange={(e) => setClassLevel(e.target.value)}
        >
          <option value="">Select Class</option>
          <option value="11th">11th</option>
          <option value="12th">12th</option>
          <option value="Dropper">Dropper</option>
        </select>
      </div>

      {/* EXAM TARGET */}
      <div className="form-section">
        <label className="section-title">Exam Target</label>

        <select
          className="profile-select"
          value={examTarget}
          onChange={(e) => setExamTarget(e.target.value)}
        >
          <option value="">Select Exam</option>
          <option value="JEE">JEE</option>
          <option value="NEET">NEET</option>
          <option value="Both">Both</option>
        </select>
      </div>

      {/* SAVE BUTTON */}
      <button className="profile-save-btn" onClick={handleSave}>
        Save Changes
      </button>

    </div>
  );
}