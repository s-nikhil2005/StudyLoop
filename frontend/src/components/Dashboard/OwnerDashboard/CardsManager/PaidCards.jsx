import { useState } from "react";
import { createCard } from "../../../../services/cardServices";
import "./PaidCards.css";

export default function PaidCard({ profile, onCreate }) {

  const teachSkills = profile?.subjectsKnown || [];
  const uniqueTeachSubjects = [...new Set(teachSkills.map(s => s.subject))];

  const [mode, setMode] = useState("skills");
  const [teachTopics, setTeachTopics] = useState([]);

  const [form, setForm] = useState({
    subject: "",
    topic: "",
    level: "",
    currency: "₹",
    price: "",
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

  const handleModeChange = (newMode) => {

    setMode(newMode);

    setForm({
      subject: "",
      topic: "",
      level: "",
      currency: "₹",
      price: "",
      description: ""
    });

    setTeachTopics([]);
    setError("");
    setSuccess("");
  };

  const handleSubject = (e) => {

    const subject = e.target.value;

    const skills = teachSkills.filter(
      item => item.subject === subject
    );

    const topics = skills.flatMap(item => item.topics);

    setTeachTopics(topics);

    if (topics.length === 1) {
      setForm({
        ...form,
        subject: subject,
        topic: topics[0],
        level: skills[0].level
      });
    } else {
      setForm({
        ...form,
        subject: subject,
        topic: "",
        level: ""
      });
    }
  };

  const handleTopic = (e) => {

    const topic = e.target.value;

    const skill = teachSkills.find(
      item =>
        item.subject === form.subject &&
        item.topics.includes(topic)
    );

    setForm({
      ...form,
      topic: topic,
      level: skill?.level || ""
    });
  };

  const handleSubmit = async () => {

    setError("");
    setSuccess("");

    if (
      !form.subject ||
      !form.topic ||
      !form.level ||
      !form.price ||
      !form.description.trim()
    ) {
      setError("All fields including description are required.");
      return;
    }

    if (isNaN(form.price) || Number(form.price) <= 0) {
      setError("Please enter a valid price amount.");
      return;
    }

    const payload = {
      type: "paid",
      teach: {
        subject: form.subject,
        topic: form.topic,
        level: form.level
      },
      price: {
        currency: form.currency,
        amount: form.price
      },
      description: form.description.trim()
    };

    try {

      const res = await createCard(payload);

      if (onCreate) {
        onCreate(res.card);
      }

      setSuccess("Paid card created successfully!");

      setForm({
        subject: "",
        topic: "",
        level: "",
        currency: "₹",
        price: "",
        description: ""
      });

      setTeachTopics([]);

    } catch (error) {

      console.error(error);

      setError("Failed to create paid card. Please try again.");

    }

  };

  return (
    <div className="paid-card-wrapper">

      <h3>Create Paid Card</h3>

      <div className="card-mode">

        <label>
          <input
            type="radio"
            checked={mode === "skills"}
            onChange={() => handleModeChange("skills")}
          />
          Import From Skills
        </label>

        <label>
          <input
            type="radio"
            checked={mode === "custom"}
            onChange={() => handleModeChange("custom")}
          />
          Custom Card
        </label>

      </div>

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

      <div className="paid-section">

        <h4>Teach</h4>

        <div className="form-row">

          {mode === "skills" ? (

            <select
              name="subject"
              value={form.subject}
              onChange={handleSubject}
            >
              <option value="">Select Subject</option>

              {uniqueTeachSubjects.map((subject, i) => (
                <option key={i} value={subject}>
                  {subject}
                </option>
              ))}

            </select>

          ) : (

            <input
              name="subject"
              placeholder="Subject"
              value={form.subject}
              onChange={handleChange}
            />

          )}

          {mode === "skills" ? (

            <select
              name="topic"
              value={form.topic}
              onChange={handleTopic}
            >
              <option value="">Select Topic</option>

              {teachTopics.map((topic, i) => (
                <option key={i} value={topic}>
                  {topic}
                </option>
              ))}

            </select>

          ) : (

            <input
              name="topic"
              placeholder="Topic"
              value={form.topic}
              onChange={handleChange}
            />

          )}

          {mode === "skills" ? (

            <input
              value={form.level}
              readOnly
            />

          ) : (

            <select
              name="level"
              value={form.level}
              onChange={handleChange}
            >
              <option value="">Level</option>
              <option>Basic</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>

          )}

        </div>

        {/* PRICE SECTION */}

        <div className="price-row">

          <select
            name="currency"
            value={form.currency}
            onChange={handleChange}
          >
            <option value="₹">₹ INR</option>
            <option value="$">$ USD</option>
          </select>

          <input
            type="number"
            name="price"
            placeholder="Enter amount"
            value={form.price}
            onChange={handleChange}
          />

        </div>

        {/* DESCRIPTION */}

        <div className="card-section">

          <h4>Description</h4>

          <textarea
            name="description"
            placeholder="Explain how you help solve doubts..."
            value={form.description}
            onChange={handleChange}
            className="description-input"
            maxLength="200"
          />

        </div>

      </div>

      <button
        className="create-paid-btn"
        onClick={handleSubmit}
      >
        Create Paid Card
      </button>

    </div>
  );
}