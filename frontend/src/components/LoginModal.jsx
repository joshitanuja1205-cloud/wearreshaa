import { useState } from "react";

function LoginModal({ onClose, onVerified }) {
  const [method, setMethod] = useState("phone");

  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [otp, setOtp] = useState("");

  const [step, setStep] = useState("login");

  const [error, setError] = useState("");

  // =====================================================
  // PHONE
  // =====================================================

  const handlePhoneContinue = () => {
    setError("");

    const cleanPhone = phone.replace(/\D/g, "");

    if (cleanPhone.length !== 10) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    // Temporary frontend OTP flow
    setStep("phone-otp");
  };

  // =====================================================
  // VERIFY PHONE OTP
  // =====================================================

  const handleVerifyPhone = () => {
    setError("");

    if (otp.length !== 6) {
      setError("Please enter the 6-digit OTP.");
      return;
    }

    // Temporary verification
    // Real OTP verification will be connected later.

    const verifiedCustomer = {
      method: "phone",
      phone: `+91${phone.replace(/\D/g, "")}`,
      email: "",
    };

    if (onVerified) {
      onVerified(verifiedCustomer);
    }

    onClose();
  };

  // =====================================================
  // GMAIL
  // =====================================================

  const handleEmailContinue = () => {
    setError("");

    if (!email.trim()) {
      setError("Please enter your Gmail address.");
      return;
    }

    if (!email.toLowerCase().endsWith("@gmail.com")) {
      setError("Please enter a valid Gmail address.");
      return;
    }

    // Temporary email verification flow
    setStep("email-verify");
  };

  // =====================================================
  // VERIFY EMAIL
  // =====================================================

  const handleVerifyEmail = () => {
    setError("");

    const verifiedCustomer = {
      method: "email",
      phone: "",
      email: email.trim().toLowerCase(),
    };

    if (onVerified) {
      onVerified(verifiedCustomer);
    }

    onClose();
  };

  // =====================================================
  // BACK
  // =====================================================

  const handleBack = () => {
    setError("");
    setOtp("");
    setStep("login");
  };

  // =====================================================
  // LOGIN SCREEN
  // =====================================================

  const renderLoginScreen = () => {
    return (
      <>
        {/* METHOD */}

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
              setMethod("email");
              setError("");
            }}
            className={`
              py-2.5
              rounded-full
              text-sm
              transition
              ${
                method === "email"
                  ? "bg-[#241f1d] text-white"
                  : "text-[#665f5b]"
              }
            `}
          >
            Gmail
          </button>

        </div>

        {/* ================= PHONE ================= */}

        {method === "phone" && (

          <div className="mt-7">

            <label
              className="
                block
                text-sm
                text-[#241f1d]
                mb-2
              "
            >
              Phone Number
            </label>

            <div
              className="
                flex
                border
                border-[#d5cdc5]
                rounded-xl
                overflow-hidden
                bg-white/60
              "
            >

              <span
                className="
                  px-4
                  flex
                  items-center
                  text-sm
                  text-[#665f5b]
                  border-r
                  border-[#d5cdc5]
                "
              >
                +91
              </span>

              <input
                type="tel"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  setError("");
                }}
                placeholder="XXXXX XXXXX"
                maxLength="10"
                inputMode="numeric"
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
              "
            >
              CONTINUE WITH PHONE
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

          </div>

        )}

        {/* ================= GMAIL ================= */}

        {method === "email" && (

          <div className="mt-7">

            <label
              className="
                block
                text-sm
                text-[#241f1d]
                mb-2
              "
            >
              Gmail Address
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              placeholder="you@gmail.com"
              className="
                w-full
                px-4
                py-3
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
              onClick={handleEmailContinue}
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
              "
            >
              CONTINUE WITH GMAIL
            </button>

            <p
              className="
                text-xs
                text-center
                text-[#827872]
                mt-4
              "
            >
              Your email will be verified securely.
            </p>

          </div>

        )}

        {/* ERROR */}

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
          className="
            text-sm
            text-[#827872]
            hover:text-[#241f1d]
            transition
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
          maxLength="6"
          inputMode="numeric"
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
          "
        >
          VERIFY & CONTINUE
        </button>

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

        <p
          className="
            text-xs
            text-center
            text-[#827872]
            mt-5
          "
        >
          Didn't receive the OTP?{" "}
          <button
            type="button"
            className="
              underline
              text-[#241f1d]
            "
          >
            Resend
          </button>
        </p>

      </div>
    );
  };

  // =====================================================
  // EMAIL VERIFICATION SCREEN
  // =====================================================

  const renderEmailVerifyScreen = () => {
    return (
      <div className="mt-8">

        <button
          type="button"
          onClick={handleBack}
          className="
            text-sm
            text-[#827872]
            hover:text-[#241f1d]
            transition
          "
        >
          ← Change email
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
            ✓
          </div>

          <h3
            className="
              font-serif
              text-2xl
              text-[#241f1d]
              mt-5
            "
          >
            Verify your email
          </h3>

          <p
            className="
              text-sm
              text-[#827872]
              mt-2
              leading-6
            "
          >
            We'll securely verify
            <br />
            <span className="text-[#241f1d] font-medium">
              {email}
            </span>
          </p>

        </div>

        <button
          type="button"
          onClick={handleVerifyEmail}
          className="
            w-full
            mt-7
            h-12
            rounded-full
            bg-[#bd6670]
            text-white
            text-sm
            font-medium
            hover:bg-[#a95560]
            transition
          "
        >
          VERIFY & CONTINUE
        </button>

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

      </div>
    );
  };

  // =====================================================
  // MAIN
  // =====================================================

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/40
        px-5
      "
    >

      <div
        className="
          relative
          w-full
          max-w-md
          rounded-3xl
          bg-[#f8f6f0]
          p-7
          sm:p-9
          shadow-2xl
        "
      >

        {/* CLOSE */}

        <button
          type="button"
          onClick={onClose}
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

          <p
            className="
              font-serif
              text-3xl
              text-[#241f1d]
            "
          >
            RESHAA
          </p>

          <h2
            className="
              font-serif
              text-3xl
              text-[#241f1d]
              mt-6
            "
          >
            {step === "login"
              ? "Welcome ♡"
              : "Almost there ♡"}
          </h2>

          <p
            className="
              text-sm
              text-[#827872]
              mt-2
            "
          >
            {step === "login"
              ? "Login or create your account to continue."
              : "Verify your details to continue."}
          </p>

        </div>

        {/* CONTENT */}

        {step === "login" && renderLoginScreen()}

        {step === "phone-otp" &&
          renderPhoneOtpScreen()}

        {step === "email-verify" &&
          renderEmailVerifyScreen()}

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

    </div>
  );
}

export default LoginModal;