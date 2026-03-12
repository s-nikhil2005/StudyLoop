import { useState } from "react";
import { Pencil } from "lucide-react";
import { useAuth } from "../../../../hooks/useAuth";
import { editAccount } from "../../../../services/userService";
import { useNavigate } from "react-router-dom";
import "./SettingsPage.css";

export default function EmailSettings() {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      setError("");

      // basic frontend validation
      if (!newEmail || !password) {
        setError("All fields are required.");
        return;
      }

      setLoading(true);

      const response = await editAccount({
        email: newEmail,
        currentPassword: password
      });

     if (response.success) {
  setIsModalOpen(false);

  navigate("/verify-otp", {
    state: {
      value: newEmail,
      type: "updateEmail"
    }
  });
}

    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* READ ONLY DISPLAY */}
      <div className="email-display">
        <div>
          <label className="email-label">Email:</label>
          <div className="email-box">
            Your email address is <strong>{user?.email}</strong>
          </div>
        </div>

        <button
          className="edit-email-btn"
          onClick={() => {
            setIsModalOpen(true);
            setError("");
          }}
        >
          <Pencil size={20} />
        </button>
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-container">

            <div className="modal-header">
              <h3>Change your email</h3>
              <button
                className="close-btn"
                onClick={() => setIsModalOpen(false)}
              >
                ×
              </button>
            </div>

            {/* ERROR MESSAGE */}
            {error && (
              <div className="form-error">
                <span className="error-icon">!</span>
                {error}
              </div>
            )}

            <p className="modal-description">
              Please enter the new email address you want to use.
              We will send you a confirmation code to confirm the address.
            </p>

            <div className="form-group">
              <label>Enter your email</label>
              <input
                type="email"
                className={error ? "input-error" : ""}
                placeholder="Enter the new email address"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>
                Password <span className="required">Required</span>
              </label>
              <input
                type="password"
                className={error ? "input-error" : ""}
                placeholder="Enter your current password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <p className="security-note">
              For your security, if you change your email address your saved
              credit card information will be deleted.
            </p>

            <div className="modal-footer">
              <button
                className="primary-btn"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Please wait..." : "Verify my new email"}
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}