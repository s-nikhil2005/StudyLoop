import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { resetPassword } from "../../services/userService";

function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();

  const { email } = location.state || {};

  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // 🔐 Prevent direct access
  if (!email) {
    navigate("/login", { replace: true });
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(
        formData.newPassword
      )
    ) {
      newErrors.newPassword =
        "8+ chars, include upper, lower, number & special character";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm your password";
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length !== 0) return;

    try {
      setLoading(true);
      setServerError("");

      await resetPassword({
        email,
        newPassword: formData.newPassword,
      });

      // ✅ After success → go to login
      navigate("/login", { replace: true });

    } catch (error) {
      setServerError(
        error.response?.data?.message ||
        "Password reset failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white pt-10 pb-16 flex justify-center">
      <div className="w-full max-w-md">

        <h2 className="text-3xl font-semibold text-gray-900 text-center mb-3">
          Reset Your Password
        </h2>

        <p className="text-gray-500 text-center mb-8">
          Enter your new password below
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">

          <div>
            <input
              type={showPassword ? "text" : "password"}
              name="newPassword"
              placeholder="New Password"
              value={formData.newPassword}
              onChange={handleChange}
              className={`w-full px-5 py-4 text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ${
                errors.newPassword ? "border-red-400" : "border-gray-300"
              }`}
            />
            {errors.newPassword && (
              <p className="text-red-500 text-sm mt-2">
                {errors.newPassword}
              </p>
            )}
          </div>

          <div>
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full px-5 py-4 text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ${
                errors.confirmPassword ? "border-red-400" : "border-gray-300"
              }`}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-2">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              onChange={() => setShowPassword(!showPassword)}
              className="cursor-pointer"
            />
            <span className="text-sm text-gray-600">
              Show Password
            </span>
          </div>

          {serverError && (
            <p className="text-red-500 text-sm">
              {serverError}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-4 rounded-lg text-base font-semibold hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {loading ? "Updating..." : "Reset Password"}
          </button>

        </form>

      </div>
    </div>
  );
}

export default ResetPassword;