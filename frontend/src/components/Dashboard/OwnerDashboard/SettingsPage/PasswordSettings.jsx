import { useState } from "react";
import { editAccount } from "../../../../services/userService";
import "./SettingsPage.css";

export default function PasswordSettings() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");   // ✅ NEW
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setError("");
      setSuccess("");

      if (!currentPassword || !newPassword || !confirmPassword) {
        setError("All fields are required.");
        return;
      }

      if (newPassword !== confirmPassword) {
        setError("New password and confirm password must match.");
        return;
      }

      setLoading(true);

      const response = await editAccount({
        currentPassword,
        newPassword,
        confirmPassword
      });

      if (response.success) {
        setSuccess("Password updated successfully");  // ✅ SHOW GREEN
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
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
    <div className="form-section">
      <h4>Update Password</h4>

      {/* 🔴 ERROR */}
      {error && (
        <div className="form-error">
          <span className="error-icon">!</span>
          {error}
        </div>
      )}

      {/* 🟢 SUCCESS */}
      {success && (
        <div className="form-success">
          <span className="success-icon">✓</span>
          {success}
        </div>
      )}

      <input
        type="password"
        placeholder="Current Password"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
      />

      <input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />

      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <button
        className="primary-btn"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Updating..." : "Update Password"}
      </button>
    </div>
  );
}