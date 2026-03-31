import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../../services/userService";

function RegisterForm({ switchMode }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({ ...prev, [name]: "" }));
    setServerError("");
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);
    setServerError("");

    if (Object.keys(validationErrors).length !== 0) return;

    try {
      setLoading(true);

      await registerUser(formData);

      navigate("/verify-otp", {
        state: {
          value: formData.email,
          type: "register",
        },
      });

    } catch (error) {
      const message =
        error.response?.data?.message || "Registration failed";

      // attach error to correct field
      if (message.toLowerCase().includes("email")) {
        setErrors((prev) => ({ ...prev, email: message }));
      } else if (message.toLowerCase().includes("username")) {
        setErrors((prev) => ({ ...prev, username: message }));
      } else {
        setServerError(message);
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white px-6 pt-10 pb-16 flex justify-center">
      <div className="w-full max-w-xl">

        <h2 className="text-4xl font-bold text-gray-900 mb-3 text-center">
          Create your account
        </h2>

        <p className="text-gray-500 text-base text-center mb-10">
          Start learning together with StudyLoop
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Username */}
          <div>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className={`w-full px-6 py-5 text-lg rounded-2xl border ${
                errors.username ? "border-red-400" : "border-gray-300"
              }`}
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-2">
                {errors.username}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-6 py-5 text-lg rounded-2xl border ${
                errors.email ? "border-red-400" : "border-gray-300"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-2">
                {errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-6 py-5 text-lg rounded-2xl border ${
                errors.password ? "border-red-400" : "border-gray-300"
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-2">
                {errors.password}
              </p>
            )}
          </div>

          {serverError && (
            <p className="text-red-500 text-sm text-center">
              {serverError}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-semibold text-lg"
          >
            {loading ? "Sending OTP..." : "Create Account"}
          </button>

        </form>

        <p className="text-base text-gray-600 mt-8 text-center">
          Already have an account?{" "}
          <span
            onClick={switchMode}
            className="text-indigo-600 font-semibold cursor-pointer hover:underline"
          >
            Log in
          </span>
        </p>

      </div>
    </div>
  );
}

export default RegisterForm;
