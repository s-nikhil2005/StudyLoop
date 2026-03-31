import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./JoinSessionComponent.css";

function JoinSessionComponent() {
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  const joinSession = () => {
    if (!code.trim()) return;
    navigate(`/study-room/${code}`);
  };

  const handleCancel = () => {
    navigate("/host");
  };

  return (
    <div className="join-container">
      <div className="join-box">
        <h2>Join Meeting</h2>

        <input
          type="text"
          placeholder="Meeting ID or Session Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />

        <div className="button-group">
          <button className="cancel-btn" onClick={handleCancel}>
            Cancel
          </button>

          <button
            className="join-btn"
            onClick={joinSession}
            disabled={!code.trim()}
          >
            Join
          </button>
        </div>
      </div>
    </div>
  );
}

export default JoinSessionComponent;