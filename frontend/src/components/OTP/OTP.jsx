  import { useLocation, useNavigate } from "react-router-dom";
  import { useState, useEffect, useRef } from "react";
  import {
    verifyRegisterOtp,
    verifyForgotPasswordOTP,
    resendOtp,
    getCurrentUser,
    verifyEmailUpdate
  } from "../../services/userService";
  import { useAuth } from "../../hooks/useAuth";

  function VerifyOtp() {
    const navigate = useNavigate();
    const location = useLocation();
    const { value, type } = location.state || {};

    const { setUser } = useAuth(); // ✅ only for register flow

    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [expiryTime, setExpiryTime] = useState(null);
    const [timer, setTimer] = useState(60);
    const [loading, setLoading] = useState(false);
    const [resendLoading, setResendLoading] = useState(false);
    const [serverError, setServerError] = useState("");

    const inputsRef = useRef([]);

    useEffect(() => {
      if (!value || !type) {
        navigate("/login", { replace: true });
      }
    }, [value, type, navigate]);

    useEffect(() => {
      const savedExpiry = localStorage.getItem(`otpExpiry-${type}-${value}`);
      if (savedExpiry) {
        setExpiryTime(Number(savedExpiry));
      } else {
        const newExpiry = Date.now() + 60000;
        localStorage.setItem(`otpExpiry-${type}-${value}`, newExpiry);
        setExpiryTime(newExpiry);
      }
    }, [type, value]);

    useEffect(() => {
      if (!expiryTime) return;

      const interval = setInterval(() => {
        const remaining = Math.max(
          Math.floor((expiryTime - Date.now()) / 1000),
          0
        );

        setTimer(remaining);

        if (remaining === 0) {
          clearInterval(interval);
        }
      }, 1000);

      return () => clearInterval(interval);
    }, [expiryTime]);

    const handleChange = (val, index) => {
      if (!/^[0-9]?$/.test(val)) return;

      const newOtp = [...otp];
      newOtp[index] = val;
      setOtp(newOtp);

      if (val && index < 5) {
        inputsRef.current[index + 1]?.focus();
      }
    };

    const handleKeyDown = (e, index) => {
      if (e.key === "Backspace" && !otp[index] && index > 0) {
        inputsRef.current[index - 1]?.focus();
      }
    };

    const handlePaste = (e) => {
      const pasteData = e.clipboardData.getData("text").trim();
      if (!/^\d{6}$/.test(pasteData)) return;

      const newOtp = pasteData.split("");
      setOtp(newOtp);
      inputsRef.current[5]?.focus();
    };

    /* ✅ VERIFY */
    const handleVerify = async () => {
      const finalOtp = otp.join("");
      if (finalOtp.length !== 6) return;

      try {
        setLoading(true);
        setServerError("");

        // 🔥 REGISTER FLOW (only here we update auth)
        if (type === "register") {
          await verifyRegisterOtp({
            email: value,
            otp: finalOtp,
          });

          // ✅ Sync frontend state with backend
          const res = await getCurrentUser();
          setUser(res.user);

          localStorage.removeItem(`otpExpiry-${type}-${value}`);
          navigate("/main", { replace: true });
          return;
        }

        // 🔥 FORGOT PASSWORD FLOW (untouched)
        if (type === "forgot") {
          await verifyForgotPasswordOTP({
            email: value,
            otp: finalOtp,
          });

          localStorage.removeItem(`otpExpiry-${type}-${value}`);
          navigate("/reset-password", {
            state: { email: value },
            replace: true,
          });
          return;
        }

        // 🔥 UPDATE EMAIL FLOW (NEW)
      if (type === "updateEmail") {
        await verifyEmailUpdate({
          email: value,
          otp: finalOtp,
        });

        // Refresh logged-in user after email update
        const res = await getCurrentUser();
        setUser(res.user);

        localStorage.removeItem(`otpExpiry-${type}-${value}`);

        navigate("/owner-dashboard", { replace: true });
        return;
      }

      } catch (error) {
        setServerError(
          error.response?.data?.message || "Invalid OTP"
        );
      } finally {
        setLoading(false);
      }
    };

    /* 🔁 RESEND */
    const handleResend = async () => {
      try {
        setResendLoading(true);
        setServerError("");

        await resendOtp({
          email: value,
          type: type,
        });

        const newExpiry = Date.now() + 60000;
        localStorage.setItem(`otpExpiry-${type}-${value}`, newExpiry);
        setExpiryTime(newExpiry);

        setOtp(["", "", "", "", "", ""]);

      } catch (error) {
        setServerError(
          error.response?.data?.message || "Failed to resend OTP"
        );
      } finally {
        setResendLoading(false);
      }
    };

    if (!value || !type) return null;

    return (
      <div className="bg-white pt-12 pb-16 flex justify-center">
        <div className="w-full max-w-md">

          <h2 className="text-3xl font-semibold text-center mb-8">
            Verify your email
          </h2>

          <p className="text-gray-600 mb-3">
            Enter the verification code sent to:
          </p>

          <input
            type="text"
            value={value}
            disabled
            className="w-full px-5 py-4 text-base border border-gray-300 rounded-lg bg-gray-100 text-gray-700 mb-3"
          />

          <p className="text-sm text-gray-600 mb-8">
            This is not your {type === "register" ? "email" : "detail"}?{" "}
            <button
              onClick={() =>
                navigate(
                  type === "register"
                    ? "/register"
                    : "/forgot-password",
                  { replace: true }
                )
              }
              className="text-indigo-600 hover:underline"
            >
              Edit
            </button>
          </p>

          <label className="block text-gray-700 mb-4">
            Enter Code:
          </label>

          <div
            className="flex justify-between gap-3 mb-6"
            onPaste={handlePaste}
          >
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={digit}
                ref={(el) => (inputsRef.current[index] = el)}
                onChange={(e) =>
                  handleChange(e.target.value, index)
                }
                onKeyDown={(e) =>
                  handleKeyDown(e, index)
                }
                className="w-14 h-16 text-xl text-center border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-600 transition"
              />
            ))}
          </div>

          {serverError && (
            <p className="text-red-500 text-sm text-center mb-4">
              {serverError}
            </p>
          )}

          <div className="flex justify-between text-sm mb-8">
            <span className="text-gray-500">
              Not Received? Checked Spam?
            </span>

            {timer > 0 ? (
              <span className="text-gray-400">
                Resend in {timer}s
              </span>
            ) : (
              <button
                onClick={handleResend}
                disabled={resendLoading}
                className="text-indigo-600 hover:underline disabled:opacity-50"
              >
                {resendLoading ? "Sending..." : "Resend Code"}
              </button>
            )}
          </div>

          <button
            onClick={handleVerify}
            disabled={otp.join("").length !== 6 || loading}
            className={`w-full py-4 rounded-lg text-lg font-semibold transition ${
              otp.join("").length === 6
                ? "bg-indigo-600 text-white hover:bg-indigo-700"
                : "bg-indigo-300 text-white cursor-not-allowed"
            }`}
          >
            {loading ? "Verifying..." : "VERIFY"}
          </button>

        </div>
      </div>
    );
  }

  export default VerifyOtp;