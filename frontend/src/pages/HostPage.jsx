import { useNavigate } from "react-router-dom";
import Auth2Navbar from "../components/Header/Auth2Navbar/authNavbar";
import "./HostPage.css";

function HostPage() {
  const navigate = useNavigate();

  const handleCreate = () => {
    navigate("/create-class");
  };

  const handleJoin = () => {
    navigate("/join-class");
  };

  return (
    <>
      {/* ✅ Navbar added here */}
      <Auth2Navbar />

      <div className="host-container">
        <div className="host-box">
          <h1 className="logo">StudyLoop</h1>
          <h2 className="subtitle">Start or Join a Study Session</h2>

          <div className="button-group">
            <button className="join-btn" onClick={handleJoin}>
              Join Meeting
            </button>

            <button className="create-btn" onClick={handleCreate}>
              Create Meeting
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default HostPage;