import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../../services/userService";

function ForgotPassword() {
  const navigate = useNavigate();

  const generateCaptchaString = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@$#%&*!";
    let result = "";
    for (let i = 0; i < 5; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const [generatedCaptcha, setGeneratedCaptcha] = useState(
    generateCaptchaString()
  );
  const [identifier, setIdentifier] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCaptchaChange = (e) => {
    const value = e.target.value;
    if (value.length <= 5) {
      setCaptchaInput(value);
    }
  };

  const refreshCaptcha = () => {
    setGeneratedCaptcha(generateCaptchaString());
    setCaptchaInput("");
  };

  const isValid =
    identifier.trim() !== "" &&
    captchaInput.length === 5 &&
    captchaInput === generatedCaptcha;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid) return;

    try {
      setLoading(true);
      setError("");

      // ✅ FIXED HERE
      const response = await forgotPassword({
        identifier: identifier.trim(),
      });

      // Use email returned from backend
      const emailFromBackend = response.data.email;

      navigate("/verify-otp", {
        state: {
          value: emailFromBackend,
          type: "forgot",
        },
      });

    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
      refreshCaptcha();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white pt-8 pb-16 flex justify-center">
      <div className="w-full max-w-md">
        <h2 className="text-3xl font-semibold text-gray-900 text-center mb-3">
          Recover Password
        </h2>

        <p className="text-gray-500 text-center mb-8">
          To recover the password for your account, please provide your account details.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">

          <input
            type="text"
            placeholder="Username or Email"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            className="w-full px-5 py-4 text-base border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition"
          />

          <div className="flex items-center justify-between bg-gray-100 px-4 py-3 rounded-lg text-2xl font-bold tracking-widest select-none">
            <span>{generatedCaptcha}</span>

            <button
              type="button"
              onClick={refreshCaptcha}
              className="text-indigo-600 text-sm hover:underline"
            >
              Refresh
            </button>
          </div>

          <input
            type="text"
            placeholder="Write Captcha here"
            value={captchaInput}
            onChange={handleCaptchaChange}
            maxLength={5}
            className="w-full px-5 py-4 text-base border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition"
          />

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          <button
            type="submit"
            disabled={!isValid || loading}
            className={`w-full py-4 rounded-lg text-base font-semibold transition ${
              isValid && !loading
                ? "bg-indigo-600 text-white hover:bg-indigo-700"
                : "bg-indigo-300 text-white cursor-not-allowed"
            }`}
          >
            {loading ? "Sending OTP..." : "PROCEED"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;