import { useState } from "react";
import { updateLearningSkills } from "../../../../services/profileService";
import "./TeachSkills.css";

export default function LearnSkills({ profile, setProfile }) {

  /* ============================
     DERIVED DATA FROM PROFILE
  ============================ */

  const skills = profile?.subjectsToLearn || [];

  /* ============================
     LOCAL FORM STATE
  ============================ */

  const [subject, setSubject] = useState("");
  const [level, setLevel] = useState("Basic");
  const [topics, setTopics] = useState("");
  const [showModal, setShowModal] = useState(false);

  /* ============================
     ADD SKILL
  ============================ */

  const handleAddSkill = async () => {
    if (!subject) return;

    const topicArray = topics
      .split(",")
      .map(t => t.trim())
      .filter(t => t !== "");

    if (topicArray.length === 0) return;

    const newSkill = {
      subject,
      level,
      topics: topicArray
    };

    const updatedSkills = [...skills, newSkill];

    try {
      const res = await updateLearningSkills(updatedSkills);

      // Update global profile only
      setProfile(res.profile);

      // Reset modal
      setShowModal(false);
      setSubject("");
      setLevel("Basic");
      setTopics("");

    } catch (err) {
      console.error("Add Skill Error:", err);
    }
  };

  /* ============================
     REMOVE SUBJECT ENTRY
  ============================ */

  const handleRemoveSkill = async (index) => {
    const updated = skills.filter((_, i) => i !== index);

    try {
      const res = await updateLearningSkills(updated);
      setProfile(res.profile);
    } catch (err) {
      console.error("Remove Skill Error:", err);
    }
  };

  /* ============================
     RENDER
  ============================ */

  return (
    <div className="teachskills-wrapper">

      <div className="skills-card">

        <div className="skills-header">
          <h3>Skills I Want To Learn</h3>

          <button
            className="add-skill-btn"
            onClick={() => setShowModal(true)}
          >
            Add skills
          </button>
        </div>

        <div className="skills-table">

          {skills.length === 0 && (
            <p className="empty-text">
              No learning goals added yet.
            </p>
          )}

          {skills.map((skill, index) =>
            skill.topics.map((topic, topicIndex) => (
              <div
                key={`${index}-${topicIndex}`}
                className="skills-row"
              >

                <div className="skill-col subject-col">
                  {skill.subject}
                </div>

                <div className="skill-col topic-col">
                  {topic}
                </div>

                <div className="skill-col level-col">
                  {skill.level}
                </div>

                <div
                  className="skill-col remove-col"
                  onClick={() => handleRemoveSkill(index)}
                >
                  ×
                </div>

              </div>
            ))
          )}

        </div>
      </div>

      {/* ============================
           MODAL
      ============================ */}

      {showModal && (
        <div className="skill-modal-overlay">
          <div className="skill-modal">

            <div className="modal-header">
              <h4>Add Learning Goal</h4>

              <span
                className="close-btn"
                onClick={() => setShowModal(false)}
              >
                ×
              </span>
            </div>

            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="skill-input"
            >
              <option value="">Select Subject</option>
              <option value="Physics">Physics</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Maths">Maths</option>
              <option value="Biology">Biology</option>
            </select>

            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="skill-input"
            >
              <option value="Basic">Basic</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>

            <input
              type="text"
              placeholder="Topics (comma separated)"
              value={topics}
              onChange={(e) => setTopics(e.target.value)}
              className="skill-input"
            />

            <div className="modal-actions">
              <button
                className="save-btn"
                onClick={handleAddSkill}
              >
                Save
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}