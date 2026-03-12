import { useState } from "react";
import { createCard } from "../../../../services/cardServices";
import "./TeachLearnCards.css";

export default function CreateCard({ profile, onCreate }) {

  const teachSkills = profile?.subjectsKnown || [];
  const learnSkills = profile?.subjectsToLearn || [];

  const uniqueTeachSubjects = [...new Set(teachSkills.map(s => s.subject))];
  const uniqueLearnSubjects = [...new Set(learnSkills.map(s => s.subject))];

  const [mode, setMode] = useState("skills");

  const [teachTopics, setTeachTopics] = useState([]);
  const [learnTopics, setLearnTopics] = useState([]);

  const [form, setForm] = useState({
    teachSubject: "",
    teachTopic: "",
    teachLevel: "",
    learnSubject: "",
    learnTopic: "",
    learnLevel: "",
    description: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  /* RESET FORM WHEN MODE CHANGES */

  const handleModeChange = (newMode) => {

    setMode(newMode);

    setForm({
      teachSubject: "",
      teachTopic: "",
      teachLevel: "",
      learnSubject: "",
      learnTopic: "",
      learnLevel: "",
      description: ""
    });

    setTeachTopics([]);
    setLearnTopics([]);

    setError("");
    setSuccess("");
  };

  /* ================= TEACH SUBJECT ================= */

  const handleTeachSubject = (e) => {

    const subject = e.target.value;

    const skills = teachSkills.filter(
      (item) => item.subject === subject
    );

    const topics = skills.flatMap(item => item.topics);

    setTeachTopics(topics);

    if (topics.length === 1) {
      setForm({
        ...form,
        teachSubject: subject,
        teachTopic: topics[0],
        teachLevel: skills[0].level
      });
    } else {
      setForm({
        ...form,
        teachSubject: subject,
        teachTopic: "",
        teachLevel: ""
      });
    }
  };

  /* ================= TEACH TOPIC ================= */

  const handleTeachTopic = (e) => {

    const topic = e.target.value;

    const skill = teachSkills.find(
      item =>
        item.subject === form.teachSubject &&
        item.topics.includes(topic)
    );

    setForm({
      ...form,
      teachTopic: topic,
      teachLevel: skill?.level || ""
    });
  };

  /* ================= LEARN SUBJECT ================= */

  const handleLearnSubject = (e) => {

    const subject = e.target.value;

    const skills = learnSkills.filter(
      (item) => item.subject === subject
    );

    const topics = skills.flatMap(item => item.topics);

    setLearnTopics(topics);

    if (topics.length === 1) {
      setForm({
        ...form,
        learnSubject: subject,
        learnTopic: topics[0],
        learnLevel: skills[0].level
      });
    } else {
      setForm({
        ...form,
        learnSubject: subject,
        learnTopic: "",
        learnLevel: ""
      });
    }
  };

  /* ================= LEARN TOPIC ================= */

  const handleLearnTopic = (e) => {

    const topic = e.target.value;

    const skill = learnSkills.find(
      item =>
        item.subject === form.learnSubject &&
        item.topics.includes(topic)
    );

    setForm({
      ...form,
      learnTopic: topic,
      learnLevel: skill?.level || ""
    });
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = async () => {

    setError("");
    setSuccess("");

  if (
  !form.teachSubject ||
  !form.teachTopic ||
  !form.teachLevel ||
  !form.learnSubject ||
  !form.learnTopic ||
  !form.learnLevel ||
  !form.description.trim()
) {
  setError("All fields including description are required.");
  return;
}
    const payload = {
      type: "skill",
      teach: {
        subject: form.teachSubject,
        topic: form.teachTopic,
        level: form.teachLevel
      },
      learn: {
        subject: form.learnSubject,
        topic: form.learnTopic,
        level: form.learnLevel
      },
      description: form.description
    };

    try {

      const res = await createCard(payload);

      if (onCreate) {
        onCreate(res.card);
      }

      setSuccess("Card created successfully!");

      setForm({
        teachSubject: "",
        teachTopic: "",
        teachLevel: "",
        learnSubject: "",
        learnTopic: "",
        learnLevel: "",
        description: ""
      });

      setTeachTopics([]);
      setLearnTopics([]);

    } catch (error) {

      console.error(error);

      setError("Failed to create card. Please try again.");

    }

  };

  return (

    <div className="create-card-wrapper">

      <h3>Create New Card</h3>

      {error && (
        <div className="form-error">
          {error}
        </div>
      )}

      {success && (
        <div className="form-success">
          {success}
        </div>
      )}

      <div className="card-mode">

        <label>
          <input
            type="radio"
            value="skills"
            checked={mode === "skills"}
            onChange={() => handleModeChange("skills")}
          />
          Import From Skills
        </label>

        <label>
          <input
            type="radio"
            value="custom"
            checked={mode === "custom"}
            onChange={() => handleModeChange("custom")}
          />
          Custom Card
        </label>

      </div>

      {/* ================= TEACH ================= */}

      <div className="card-section">

        <h4>Teach</h4>

        <div className="form-row">

          {mode === "skills" ? (

            <select
              name="teachSubject"
              value={form.teachSubject}
              onChange={handleTeachSubject}
            >
              <option value="">Select Subject</option>

              {uniqueTeachSubjects.map((subject, index) => (
                <option key={index} value={subject}>
                  {subject}
                </option>
              ))}

            </select>

          ) : (

            <input
              type="text"
              name="teachSubject"
              placeholder="Subject"
              value={form.teachSubject}
              onChange={handleChange}
            />

          )}

          {mode === "skills" ? (

            <select
              name="teachTopic"
              value={form.teachTopic}
              onChange={handleTeachTopic}
            >
              <option value="">Select Topic</option>

              {teachTopics.map((topic, index) => (
                <option key={index} value={topic}>
                  {topic}
                </option>
              ))}

            </select>

          ) : (

            <input
              type="text"
              name="teachTopic"
              placeholder="Topic"
              value={form.teachTopic}
              onChange={handleChange}
            />

          )}

          {mode === "skills" ? (
            <input value={form.teachLevel} readOnly />
          ) : (
            <select
              name="teachLevel"
              value={form.teachLevel}
              onChange={handleChange}
            >
              <option value="">Level</option>
              <option>Basic</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          )}

        </div>

      </div>

      {/* ================= LEARN ================= */}

      <div className="card-section">

        <h4>Learn</h4>

        <div className="form-row">

          {mode === "skills" ? (

            <select
              name="learnSubject"
              value={form.learnSubject}
              onChange={handleLearnSubject}
            >
              <option value="">Select Subject</option>

              {uniqueLearnSubjects.map((subject, index) => (
                <option key={index} value={subject}>
                  {subject}
                </option>
              ))}

            </select>

          ) : (

            <input
              type="text"
              name="learnSubject"
              placeholder="Subject"
              value={form.learnSubject}
              onChange={handleChange}
            />

          )}

          {mode === "skills" ? (

            <select
              name="learnTopic"
              value={form.learnTopic}
              onChange={handleLearnTopic}
            >
              <option value="">Select Topic</option>

              {learnTopics.map((topic, index) => (
                <option key={index} value={topic}>
                  {topic}
                </option>
              ))}

            </select>

          ) : (

            <input
              type="text"
              name="learnTopic"
              placeholder="Topic"
              value={form.learnTopic}
              onChange={handleChange}
            />

          )}

          {mode === "skills" ? (
            <input value={form.learnLevel} readOnly />
          ) : (
            <select
              name="learnLevel"
              value={form.learnLevel}
              onChange={handleChange}
            >
              <option value="">Level</option>
              <option>Basic</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          )}

        </div>

      </div>

      {/* ================= DESCRIPTION ================= */}

      <div className="card-section">

        <h4>Description</h4>

        <textarea
          name="description"
          placeholder="Explain how you can help solve doubts or what you teach..."
          value={form.description}
          onChange={handleChange}
          className="description-input"
          maxLength="200"
        />

      </div>

      <button
        className="create-card-btn"
        onClick={handleSubmit}
      >
        Create Card
      </button>

    </div>
  );
}