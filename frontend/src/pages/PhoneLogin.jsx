import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function PhoneLogin() {
  const navigate = useNavigate();

  const [loginType, setLoginType] = useState("phone");

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");

  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // =====================================================
  // SEND PHONE OTP
  // =====================================================

  const sendOTP = async () => {
    setError("");

    const cleanPhone = phone.replace(/\D/g, "");

    if (cleanPhone.length !== 10) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/otp/send", {
        identifier: cleanPhone,
        type: "phone",
      });

      if (response.data.success) {
        setOtpSent(true);
        setOtp("");
      } else {
        setError(
          response.data.message || "Unable to send OTP."
        );
      }

    } catch (error) {
      console.error("Send OTP error:", error);

      setError(
        error.response?.data?.message ||
          "Unable to send OTP. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // VERIFY PHONE OTP
  // =====================================================

  const verifyOTP = async () => {
    setError("");

    if (otp.length !== 6) {
      setError("Please enter the 6-digit OTP.");
      return;
    }

    const cleanPhone = phone.replace(/\D/g, "");

    try {
      setLoading(true);

      const response = await api.post("/otp/verify", {
        identifier: cleanPhone,
        otp,
        type: "phone",
      });

      console.log("OTP VERIFY RESPONSE:", response.data);

      if (!response.data.success) {
        setError(
          response.data.message || "Invalid OTP."
        );
        return;
      }

      // =================================================
      // SAVE JWT
      // =================================================

      if (response.data.token) {
        localStorage.setItem(
          "token",
          response.data.token
        );
      }

      // =================================================
      // SAVE USER
      // =================================================

      if (response.data.user) {
        localStorage.setItem(
          "user",
          JSON.stringify(response.data.user)
        );
      }

      // =================================================
      // CONTINUE
      // =================================================

      navigate("/cart");

    } catch (error) {
      console.error("Verify OTP error:", error);

      setError(
        error.response?.data?.message ||
          "Invalid OTP. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // GOOGLE LOGIN
  // =====================================================

  const handleGoogleLogin = () => {
    setError("");

    // IMPORTANT:
    // This must point to your BACKEND Google login route.

    window.location.href =
      "http://localhost:5001/api/auth/google";
  };

  // =====================================================
  // CHANGE METHOD
  // =====================================================

  const changeMethod = () => {
    setOtpSent(false);
    setOtp("");
    setError("");
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <main
      className="
        min-h-screen
        bg-[#f8f6f0]
        flex
        items-center
        justify-center
        px-5
        py-12
      "
    >

      <div className="w-full max-w-md">

        {/* BRAND */}

        <div className="text-center mb-10">

          <p
            className="
              text-xs
              tracking-[0.3em]
              uppercase
              text-[#bd6670]
              mb-4
            "
          >
            RESHAA
          </p>

          <h1
            className="
              font-serif
              text-5xl
              leading-tight
              text-[#241f1d]
            "
          >
            {otpSent
              ? "Verify Your Number"
              : "Welcome to RESHAA"}
          </h1>

          <p
            className="
              mt-3
              text-sm
              text-[#827872]
            "
          >
            {otpSent
              ? `Enter the OTP sent to +91 ${phone}`
              : "Continue with your phone number or Google."}
          </p>

        </div>

        {/* LOGIN CARD */}

        <div
          className="
            bg-white/60
            border
            border-[#e2dad2]
            rounded-3xl
            p-7
            sm:p-9
          "
        >

          {!otpSent ? (

            <>
              {/* LOGIN TYPE SWITCH */}

              <div
                className="
                  flex
                  p-1
                  rounded-full
                  bg-[#eee8e1]
                  mb-7
                "
              >

                {/* PHONE */}

                <button
                  type="button"
                  onClick={() => {
                    setLoginType("phone");
                    setError("");
                  }}
                  className={`
                    flex-1
                    py-3
                    rounded-full
                    text-sm
                    transition
                    ${
                      loginType === "phone"
                        ? "bg-[#241f1d] text-white"
                        : "text-[#827872]"
                    }
                  `}
                >
                  📱 Phone
                </button>

                {/* GOOGLE */}

                <button
                  type="button"
                  onClick={() => {
                    setLoginType("google");
                    setError("");
                  }}
                  className={`
                    flex-1
                    py-3
                    rounded-full
                    text-sm
                    transition
                    ${
                      loginType === "google"
                        ? "bg-[#241f1d] text-white"
                        : "text-[#827872]"
                    }
                  `}
                >
                  🔵 Google
                </button>

              </div>

              {/* =================================================
                  PHONE LOGIN
              ================================================= */}

              {loginType === "phone" && (

                <>
                  <label
                    className="
                      block
                      text-sm
                      font-medium
                      text-[#241f1d]
                      mb-2
                    "
                  >
                    Phone Number
                  </label>

                  <div className="flex gap-2">

                    <div
                      className="
                        h-12
                        px-4
                        flex
                        items-center
                        rounded-lg
                        border
                        border-[#cfc7bf]
                        bg-[#f8f6f0]
                        text-[#827872]
                      "
                    >
                      +91
                    </div>

                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => {
                        setPhone(
                          e.target.value
                            .replace(/\D/g, "")
                            .slice(0, 10)
                        );

                        setError("");
                      }}
                      placeholder="9876543210"
                      maxLength={10}
                      inputMode="numeric"
                      disabled={loading}
                      className="
                        flex-1
                        h-12
                        px-4
                        rounded-lg
                        border
                        border-[#cfc7bf]
                        bg-[#f8f6f0]
                        outline-none
                        focus:border-[#bd6670]
                      "
                    />

                  </div>

                  {/* ERROR */}

                  {error && (
                    <p
                      className="
                        text-sm
                        text-[#bd6670]
                        mt-3
                      "
                    >
                      {error}
                    </p>
                  )}

                  {/* SEND OTP */}

                  <button
                    type="button"
                    onClick={sendOTP}
                    disabled={loading}
                    className="
                      w-full
                      h-14
                      mt-6
                      rounded-full
                      bg-[#241f1d]
                      text-white
                      font-medium
                      tracking-wide
                      hover:bg-[#bd6670]
                      transition
                      disabled:opacity-60
                    "
                  >
                    {loading
                      ? "SENDING OTP..."
                      : "SEND OTP →"}
                  </button>

                  <p
                    className="
                      text-xs
                      text-center
                      text-[#827872]
                      mt-4
                    "
                  >
                    We'll send you a one-time OTP.
                  </p>

                </>
              )}

              {/* =================================================
                  GOOGLE LOGIN
              ================================================= */}

              {loginType === "google" && (

                <div className="mt-7">

                  <button
                    type="button"
                    onClick={handleGoogleLogin}
                    disabled={loading}
                    className="
                      w-full
                      h-14
                      rounded-full
                      bg-[#241f1d]
                      text-white
                      font-medium
                      tracking-wide
                      hover:bg-[#bd6670]
                      transition
                      disabled:opacity-60
                      flex
                      items-center
                      justify-center
                      gap-3
                    "
                  >
                    <span className="text-lg">
                      G
                    </span>

                    CONTINUE WITH GOOGLE
                  </button>

                  <p
                    className="
                      text-xs
                      text-center
                      text-[#827872]
                      mt-4
                    "
                  >
                    You'll be securely verified by Google.
                  </p>

                </div>

              )}

              {/* ERROR */}

              {error && loginType === "google" && (
                <p
                  className="
                    text-sm
                    text-[#bd6670]
                    text-center
                    mt-4
                  "
                >
                  {error}
                </p>
              )}

            </>

          ) : (

            /* =================================================
               OTP SCREEN
            ================================================= */

            <>
              <button
                type="button"
                onClick={changeMethod}
                disabled={loading}
                className="
                  text-sm
                  text-[#827872]
                  hover:text-[#241f1d]
                "
              >
                ← Change phone number
              </button>

              <div className="text-center mt-7">

                <div
                  className="
                    w-14
                    h-14
                    mx-auto
                    rounded-full
                    bg-[#f1e9e1]
                    flex
                    items-center
                    justify-center
                    text-xl
                  "
                >
                  ✦
                </div>

                <h3
                  className="
                    font-serif
                    text-2xl
                    text-[#241f1d]
                    mt-5
                  "
                >
                  Verify your number
                </h3>

                <p
                  className="
                    text-sm
                    text-[#827872]
                    mt-2
                    leading-6
                  "
                >
                  Enter the 6-digit OTP sent to
                  <br />

                  <span className="text-[#241f1d] font-medium">
                    +91 {phone}
                  </span>
                </p>

              </div>

              <input
                type="text"
                value={otp}
                onChange={(e) => {
                  setOtp(
                    e.target.value
                      .replace(/\D/g, "")
                      .slice(0, 6)
                  );

                  setError("");
                }}
                placeholder="Enter 6-digit OTP"
                maxLength={6}
                inputMode="numeric"
                autoFocus
                disabled={loading}
                className="
                  w-full
                  mt-7
                  px-4
                  py-4
                  text-center
                  tracking-[0.4em]
                  text-lg
                  border
                  border-[#d5cdc5]
                  rounded-xl
                  bg-white/60
                  outline-none
                  focus:border-[#bd6670]
                "
              />

              {error && (
                <p
                  className="
                    text-sm
                    text-[#bd6670]
                    text-center
                    mt-4
                  "
                >
                  {error}
                </p>
              )}

              <button
                type="button"
                onClick={verifyOTP}
                disabled={loading}
                className="
                  w-full
                  mt-5
                  h-12
                  rounded-full
                  bg-[#bd6670]
                  text-white
                  text-sm
                  font-medium
                  hover:bg-[#a95560]
                  transition
                  disabled:opacity-60
                "
              >
                {loading
                  ? "VERIFYING..."
                  : "VERIFY & CONTINUE"}
              </button>

            </>
          )}

        </div>

        {/* TERMS */}

        <p
          className="
            text-[11px]
            text-center
            text-[#a09791]
            mt-7
          "
        >
          By continuing, you agree to RESHAA's
          terms and privacy policy.
        </p>

      </div>

    </main>
  );
}

export default PhoneLogin;