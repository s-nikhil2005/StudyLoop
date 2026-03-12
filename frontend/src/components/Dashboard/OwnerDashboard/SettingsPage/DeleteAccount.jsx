import { useState } from "react";
import { deleteAccount } from "../../../../services/userService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../hooks/useAuth";
import "./SettingsPage.css";

export default function DeleteAccount() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleDelete = async () => {
    try {
      setError("");

      if (!password) {
        setError("Password is required");
        return;
      }

      setLoading(true);

      const res = await deleteAccount(password);

      if (res.success) {
        setUser(null);
        localStorage.clear();
        navigate("/", { replace: true }); // redirect to home/login
      }

    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Failed to delete account"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="form-section danger-zone">
        <h4>Delete Account</h4>

        <p className="danger-warning">
          <strong>Warning:</strong> This action is permanent. 
          You will lose access to your account and all associated data.
        </p>

        <button
          className="delete-btn"
          onClick={() => setIsModalOpen(true)}
        >
          Delete My Account
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-container">

            <div className="modal-header">
              <h3>Confirm Account Deletion</h3>
              <button
                className="close-btn"
                onClick={() => setIsModalOpen(false)}
              >
                ×
              </button>
            </div>

            {error && (
              <div className="form-error">
                {error}
              </div>
            )}

            <p className="modal-description">
              Please enter your password to confirm account deletion.
            </p>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="modal-footer">
              <button
                className="delete-btn"
                onClick={handleDelete}
                disabled={loading}
              >
                {loading ? "Deleting..." : "Confirm Delete"}
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}