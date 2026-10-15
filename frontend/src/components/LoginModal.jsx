import { useState } from "react";
import api from "../services/api";

function LoginModal({ onClose, onVerified,redirectAfterLogin = "/",}) {
  const [method, setMethod] = useState("phone");

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [name, setName] = useState("");

  const [step, setStep] = useState("login");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // =====================================================
  // PHONE — SEND OTP
  // =====================================================

  const handlePhoneContinue = async () => {
    setError("");

    const cleanPhone = phone.replace(/\D/g, "");

    if (cleanPhone.length !== 10) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    try {
      setLoading(true);
 console.log("🟣 API BASE URL:", api.defaults.baseURL);
    console.log(
      "🟣 OTP URL:",
      `${api.defaults.baseURL}/otp/send`
    );
      const response = await api.post("/otp/send", {
        identifier: cleanPhone,
        type: "phone",
      });

      if (response.data.success) {
        setStep("phone-otp");
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
  // PHONE — VERIFY OTP
  // =====================================================

  const handleVerifyPhone = async () => {
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

      console.log("OTP VERIFY:", response.data);

      if (!response.data.success) {
        setError(
          response.data.message || "Invalid OTP."
        );
        return;
      }

      // =================================================
      // NEW USER
      // =================================================

      if (response.data.isNewUser === true) {
        setStep("phone-name");
        setName("");
        return;
      }

      // =================================================
      // EXISTING USER
      // =================================================

      if (response.data.isNewUser === false) {
        const token = response.data.token;
        const user = response.data.user;

        if (!token || !user) {
          setError(
            "Login successful, but account information was not received."
          );
          return;
        }

        // Save authentication
        localStorage.setItem("token", token);

        // Save user locally for quick UI access
        localStorage.setItem(
          "user",
          JSON.stringify(user)
        );

        // Tell parent that authentication succeeded
        if (onVerified) {
          onVerified(user);
        }

        onClose();

        return;
      }

      setError("Something went wrong. Please try again.");

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
  // NEW PHONE USER — CREATE PROFILE
  // =====================================================

  const handleCreateAccount = async () => {
    setError("");

    const cleanName = name.trim();
    const cleanPhone = phone.replace(/\D/g, "");

    if (!cleanName) {
      setError("Please enter your name.");
      return;
    }

    if (cleanName.length < 2) {
      setError("Please enter a valid name.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post(
        "/otp/complete-profile",
        {
          identifier: cleanPhone,
          type: "phone",
          name: cleanName,
        }
      );

      console.log(
        "CREATE ACCOUNT:",
        response.data
      );

      if (!response.data.success) {
        setError(
          response.data.message ||
            "Unable to create your account."
        );
        return;
      }

      const token = response.data.token;
      const user = response.data.user;

      if (!token || !user) {
        setError(
          "Account created, but account information was not received."
        );
        return;
      }

      // =================================================
      // SAVE AUTHENTICATION
      // =================================================

      localStorage.setItem("token", token);

      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );

      // =================================================
      // CONTINUE
      // =================================================

      if (onVerified) {
        onVerified(user);
      }

      onClose();

    } catch (error) {
      console.error(
        "Create account error:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Unable to create account."
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

    /*
      IMPORTANT:

      Google authentication happens on the backend.

      Backend:
      /api/auth/google
          ↓
      Google
          ↓
      /api/auth/google/callback
          ↓
      creates/finds User
          ↓
      creates RESHAA JWT
          ↓
      redirects to:
      /google-success?token=...
    */

   const googleLoginUrl =
    `http://192.168.1.29:5001/api/auth/google?redirect=${encodeURIComponent(
      redirectAfterLogin
    )}`;

  window.location.href = googleLoginUrl;
};
  // =====================================================
  // BACK
  // =====================================================

  const handleBack = () => {
    if (loading) return;

    setError("");
    setOtp("");
    setName("");
    setStep("login");
  };

  // =====================================================
  // LOGIN SCREEN
  // =====================================================

  const renderLoginScreen = () => {
    return (
      <>
        {/* METHOD SWITCH */}

        <div
          className="
            grid
            grid-cols-2
            gap-2
            mt-8
            p-1
            rounded-full
            bg-[#eee7df]
          "
        >
          <button
            type="button"
            onClick={() => {
              setMethod("phone");
              setError("");
            }}
            className={`
              py-2.5
              rounded-full
              text-sm
              transition
              ${
                method === "phone"
                  ? "bg-[#241f1d] text-white"
                  : "text-[#665f5b]"
              }
            `}
          >
            Phone
          </button>

          <button
            type="button"
            onClick={() => {
              setMethod("google");
              setError("");
            }}
            className={`
              py-2.5
              rounded-full
              text-sm
              transition
              ${
                method === "google"
                  ? "bg-[#241f1d] text-white"
                  : "text-[#665f5b]"
              }
            `}
          >
            Gmail
          </button>
        </div>

        {/* PHONE */}

        {method === "phone" && (
          <div className="mt-7">

            <label className="
              block
              text-sm
              text-[#241f1d]
              mb-2
            ">
              Phone Number
            </label>

            <div className="
              flex
              border
              border-[#d5cdc5]
              rounded-xl
              overflow-hidden
              bg-white/60
            ">

              <span className="
                px-4
                flex
                items-center
                text-sm
                text-[#665f5b]
                border-r
                border-[#d5cdc5]
              ">
                +91
              </span>

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
                placeholder="XXXXX XXXXX"
                maxLength="10"
                inputMode="numeric"
                disabled={loading}
                className="
                  flex-1
                  px-4
                  py-3
                  bg-transparent
                  outline-none
                  text-sm
                "
              />

            </div>

            <button
              type="button"
              onClick={handlePhoneContinue}
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
                ? "SENDING OTP..."
                : "CONTINUE WITH PHONE"}
            </button>

            <p className="
              text-xs
              text-center
              text-[#827872]
              mt-4
            ">
              We'll send you a one-time OTP.
            </p>

          </div>
        )}

        {/* GOOGLE */}

        {method === "google" && (
          <div className="mt-7">

            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={loading}
              className="
                w-full
                h-12
                rounded-full
                bg-[#241f1d]
                text-white
                text-sm
                font-medium
                hover:bg-[#bd6670]
                transition
                disabled:opacity-60
              "
            >
              CONTINUE WITH GOOGLE
            </button>

            <p className="
              text-xs
              text-center
              text-[#827872]
              mt-4
            ">
              You'll be securely verified by Google.
            </p>

          </div>
        )}

        {error && (
          <p className="
            text-sm
            text-[#bd6670]
            text-center
            mt-4
          ">
            {error}
          </p>
        )}
      </>
    );
  };

  // =====================================================
  // PHONE OTP SCREEN
  // =====================================================

  const renderPhoneOtpScreen = () => {
    return (
      <div className="mt-8">

        <button
          type="button"
          onClick={handleBack}
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

          <div className="
            w-14
            h-14
            mx-auto
            rounded-full
            bg-[#f1e9e1]
            flex
            items-center
            justify-center
            text-xl
          ">
            ✦
          </div>

          <h3 className="
            font-serif
            text-2xl
            text-[#241f1d]
            mt-5
          ">
            Verify your number
          </h3>

          <p className="
            text-sm
            text-[#827872]
            mt-2
            leading-6
          ">
            Enter the 6-digit OTP sent to
            <br />

            <span className="
              text-[#241f1d]
              font-medium
            ">
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
          maxLength="6"
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
          "
        />

        <button
          type="button"
          onClick={handleVerifyPhone}
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

        {error && (
          <p className="
            text-sm
            text-[#bd6670]
            text-center
            mt-4
          ">
            {error}
          </p>
        )}

      </div>
    );
  };

  // =====================================================
  // NAME SCREEN
  // =====================================================

  const renderNameScreen = () => {
    return (
      <div className="mt-8">

        <div className="text-center">

          <div className="
            w-14
            h-14
            mx-auto
            rounded-full
            bg-[#f1e9e1]
            flex
            items-center
            justify-center
            text-xl
          ">
            ♡
          </div>

          <h3 className="
            font-serif
            text-2xl
            text-[#241f1d]
            mt-5
          ">
            What's your name?
          </h3>

          <p className="
            text-sm
            text-[#827872]
            mt-2
            leading-6
          ">
            Just one last thing before we create
            <br />
            your RESHAA account.
          </p>

        </div>

        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setError("");
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleCreateAccount();
            }
          }}
          placeholder="Enter your name"
          disabled={loading}
          className="
            w-full
            mt-7
            px-4
            py-4
            border
            border-[#d5cdc5]
            rounded-xl
            bg-white/60
            outline-none
            text-sm
          "
        />

        <button
          type="button"
          onClick={handleCreateAccount}
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
            ? "CREATING ACCOUNT..."
            : "CREATE MY ACCOUNT →"}
        </button>

        {error && (
          <p className="
            text-sm
            text-[#bd6670]
            text-center
            mt-4
          ">
            {error}
          </p>
        )}

      </div>
    );
  };

  // =====================================================
  // MAIN
  // =====================================================

  return (
    <div className="
      fixed
      inset-0
      z-50
      flex
      items-center
      justify-center
      bg-black/40
      px-5
    ">

      <div className="
        relative
        w-full
        max-w-md
        max-h-[90vh]
        overflow-y-auto
        rounded-3xl
        bg-[#f8f6f0]
        p-7
        sm:p-9
        shadow-2xl
      ">

        {/* CLOSE */}

        <button
          type="button"
          onClick={onClose}
          disabled={loading}
          className="
            absolute
            top-5
            right-5
            text-xl
            text-[#827872]
            hover:text-[#241f1d]
          "
        >
          ×
        </button>

        {/* HEADER */}

        <div className="text-center">

          <p className="
            font-serif
            text-3xl
            text-[#241f1d]
          ">
            RESHAA
          </p>

          <h2 className="
            font-serif
            text-3xl
            text-[#241f1d]
            mt-6
          ">
            {step === "login" &&
              "Welcome ♡"}

            {step === "phone-otp" &&
              "Almost there ♡"}

            {step === "phone-name" &&
              "Welcome to RESHAA ♡"}
          </h2>

          <p className="
            text-sm
            text-[#827872]
            mt-2
          ">
            {step === "login" &&
              "Login or create your account to continue."}

            {step === "phone-otp" &&
              "Verify your phone to continue."}

            {step === "phone-name" &&
              "Let's create your account."}
          </p>

        </div>

        {/* CONTENT */}

        {step === "login" &&
          renderLoginScreen()}

        {step === "phone-otp" &&
          renderPhoneOtpScreen()}

        {step === "phone-name" &&
          renderNameScreen()}

        {/* TERMS */}

        <p className="
          text-[11px]
          text-center
          text-[#a09791]
          mt-7
        ">
          By continuing, you agree to RESHAA's
          terms and privacy policy.
        </p>

      </div>

    </div>
  );
}

export default LoginModal;