import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function HostSessionComponent() {
  // ✅ GET CODE FROM URL (single source of truth)
  const { roomCode: urlCode } = useParams();
  const roomCode = urlCode || "";

  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  // 🔥 GENERATE + STORE IN URL
  const generateCode = () => {
    const code = Math.floor(100000 + Math.random() * 900000);
    navigate(`/create-class/${code}`);
    setCopied(false);
  };

  const startSession = () => {
    if (!roomCode) return;
    navigate(`/study-room/${roomCode}`);
  };

  const sendToChat = () => {
    const link = `${window.location.origin}/study-room/${roomCode}`;

    navigate("/chat", {
      state: { meetingLink: link }
    });
  };

  const copyCode = async () => {
    if (!roomCode) return;
    await navigator.clipboard.writeText(roomCode);
    setCopied(true);
  };

  const copyLink = async () => {
    const link = `${window.location.origin}/study-room/${roomCode}`;
    await navigator.clipboard.writeText(link);
    setCopied(true);
  };

  const goBack = () => {
    navigate("/host");
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>

        <h2 style={styles.title}>Create Meeting</h2>

        {!roomCode ? (
          <button style={styles.primaryBtn} onClick={generateCode}>
            Generate Meeting Code
          </button>
        ) : (
          <>
            <p style={styles.label}>Your Meeting Code</p>

            <h1 style={styles.code}>{roomCode}</h1>

            {copied && <p style={styles.success}>✔ Copied</p>}

            {/* ACTION BUTTONS */}
            <div style={styles.actions}>
              <button style={styles.secondaryBtn} onClick={copyCode}>
                Copy Code
              </button>

              <button style={styles.secondaryBtn} onClick={copyLink}>
                Copy Link
              </button>

              <button style={styles.secondaryBtn} onClick={sendToChat}>
                Send to Chat
              </button>
            </div>

            {/* PRIMARY CTA */}
            <button style={styles.startBtn} onClick={startSession}>
              Start Session
            </button>

            {/* BACK */}
            <button style={styles.backBtn} onClick={goBack}>
              ← Back
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default HostSessionComponent;

// 🎨 UI (UNCHANGED)
const styles = {
  page: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f4f6fb",
    fontFamily: "Arial, sans-serif"
  },

  card: {
    width: "420px",
    padding: "32px",
    borderRadius: "14px",
    background: "#fff",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
    textAlign: "center"
  },

  title: {
    marginBottom: "20px",
    fontWeight: "600"
  },

  label: {
    color: "#777",
    marginBottom: "5px"
  },

  code: {
    color: "#2563eb",
    letterSpacing: "4px",
    marginBottom: "10px"
  },

  success: {
    color: "green",
    fontSize: "14px",
    marginBottom: "10px"
  },

  actions: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginBottom: "20px"
  },

  primaryBtn: {
    padding: "12px",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "500"
  },

  secondaryBtn: {
    padding: "10px",
    background: "#f1f5f9",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer"
  },

  startBtn: {
    width: "100%",
    padding: "12px",
    background: "#22c55e",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontWeight: "600",
    marginBottom: "10px",
    cursor: "pointer"
  },

  backBtn: {
    background: "none",
    border: "none",
    color: "#666",
    cursor: "pointer"
  }
};