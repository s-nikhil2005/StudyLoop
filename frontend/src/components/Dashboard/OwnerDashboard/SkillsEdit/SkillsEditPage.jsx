import { useState } from "react";
import LearnSkills from "./LearnSkills";
import TeachSkills from "./TeachSkills";
import "./SkillsEditPage.css";

export default function SkillsEditPage({ profile, setProfile }) {
  const [activeTab, setActiveTab] = useState("learn");

  return (
    <div className="skills-wrapper">
      <h2>Skills & Goals</h2>
      <p className="skills-subtitle">
        Manage what you want to learn and what you can teach.
      </p>

      <div className="skills-tabs">
        <span
          className={activeTab === "learn" ? "active-tab" : ""}
          onClick={() => setActiveTab("learn")}
        >
          What I Want To Learn
        </span>

        <span
          className={activeTab === "teach" ? "active-tab" : ""}
          onClick={() => setActiveTab("teach")}
        >
          What I Want To Teach
        </span>
      </div>

      <hr />

      <div className="skills-content">
        {activeTab === "learn" && (
          <LearnSkills profile={profile} setProfile={setProfile} />
        )}

        {activeTab === "teach" && (
          <TeachSkills profile={profile} setProfile={setProfile} />
        )}
      </div>
    </div>
  );
}