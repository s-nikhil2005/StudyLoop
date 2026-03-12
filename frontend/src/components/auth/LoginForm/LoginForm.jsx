import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser, getCurrentUser } from "../../../services/userService";
import { useAuth } from "../../../hooks/useAuth";

function LoginForm({ switchMode }) {
  const navigate = useNavigate();
  const { setUser } = useAuth(); // ✅ global auth

  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.identifier.trim()) {
      newErrors.identifier = "Email or Username is required";
    }

    if (!formData.password.trim()) {
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

      let loginPayload = {
        password: formData.password,
      };

      if (formData.identifier.includes("@")) {
        loginPayload.email = formData.identifier;
      } else {
        loginPayload.username = formData.identifier;
      }

      // 🔥 Step 1: Login
      await loginUser(loginPayload);

      // 🔥 Step 2: Fetch logged-in user
      const res = await getCurrentUser();

      // 🔥 Step 3: Update global state
      setUser(res.user);

      // 🔥 Step 4: Navigate
      navigate("/main", { replace: true });

    } catch (error) {
      setServerError(
        error.response?.data?.message || "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white px-6 pt-6 pb-12 flex justify-center">
      <div className="w-full max-w-md">

        <h2 className="text-3xl font-semibold text-gray-900 mb-3 text-center">
          Welcome Back
        </h2>

        <p className="text-gray-500 text-base text-center mb-8">
          Log in to continue learning
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <input
              type="text"
              name="identifier"
              placeholder="Email or Username"
              value={formData.identifier}
              onChange={handleChange}
              className={`w-full px-5 py-4 text-base border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ${
                errors.identifier ? "border-red-400" : "border-gray-300"
              }`}
            />
            {errors.identifier && (
              <p className="text-red-500 text-sm mt-2">
                {errors.identifier}
              </p>
            )}
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-5 py-4 text-base border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition pr-12 ${
                errors.password ? "border-red-400" : "border-gray-300"
              }`}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-indigo-600"
            >
              {showPassword ? "Hide" : "Show"}
            </button>

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

          <div className="flex justify-end">
            <Link
              to="/forgot-password"
              className="text-sm text-indigo-600 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-4 rounded-lg text-base font-semibold hover:bg-indigo-700 transition active:scale-[0.99] disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <p className="text-base text-gray-600 mt-8 text-center">
          Don't have an account?{" "}
          <span
            onClick={switchMode}
            className="text-indigo-600 font-medium cursor-pointer hover:underline"
          >
            Create one
          </span>
        </p>

      </div>
    </div>
  );
}

export default LoginForm;