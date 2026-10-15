import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../services/api";

function GoogleSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [error, setError] = useState("");


  useEffect(() => {

    const completeGoogleLogin = async () => {
      try {
        const token = searchParams.get("token");
        const redirect =
  searchParams.get("redirect") || "/";

        console.log("🔵 GoogleSuccess started");
        console.log("🔵 Token received:", !!token);

        if (!token) {
          throw new Error("Google login failed. No login token received.");
        }

        // Save token FIRST
        localStorage.setItem("token", token);
console.log("🟣 Token length:", token?.length);
console.log(
  "🟣 Authorization header:",
  `Bearer ${token}`
);
        // Verify token with backend
        const response = await api.get("/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("🟢 /auth/me response:", response.data);

        if (!response.data?.success || !response.data?.user) {
          throw new Error("Unable to retrieve your account.");
        }

        const user = response.data.user;

        // Save user
        localStorage.setItem("user", JSON.stringify(user));

        console.log("🟢 Google login successful");
        console.log("🟢 User:", user);
        console.log(
          "🟢 Token exists:",
          !!localStorage.getItem("token")
        );
        
        // Give localStorage/browser state a moment to settle
        setTimeout(() => {
          navigate(redirect, {
            replace: true,
          });
        }, 100);

      } catch (error) {
        console.error("🔴 Google success error:", error);

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setError(
          error.response?.data?.message ||
            error.message ||
            "Google login failed. Please try again."
        );
      }
    };

    completeGoogleLogin();

  }, [navigate, searchParams]);

  if (!error) {
    return (
      <main className="
        min-h-screen
        bg-[#f8f6f0]
        flex
        items-center
        justify-center
        px-5
      ">
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
            ✦
          </div>

          <h1 className="
            font-serif
            text-3xl
            text-[#241f1d]
            mt-6
          ">
            Welcome to RESHAA ♡
          </h1>

          <p className="
            text-sm
            text-[#827872]
            mt-2
          ">
            Completing your sign in...
          </p>

        </div>
      </main>
    );
  }

  return (
    <main className="
      min-h-screen
      bg-[#f8f6f0]
      flex
      items-center
      justify-center
      px-5
    ">
      <div className="
        w-full
        max-w-md
        bg-white
        rounded-3xl
        p-8
        text-center
        shadow-sm
      ">

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
          ×
        </div>

        <h1 className="
          font-serif
          text-2xl
          text-[#241f1d]
          mt-5
        ">
          Google Sign In Failed
        </h1>

        <p className="
          text-sm
          text-[#827872]
          mt-3
        ">
          {error}
        </p>

        <button
          type="button"
          onClick={() => navigate("/login")}
          className="
            w-full
            h-12
            mt-6
            rounded-full
            bg-[#241f1d]
            text-white
            text-sm
            font-medium
            hover:bg-[#bd6670]
            transition
          "
        >
          TRY AGAIN
        </button>

      </div>
    </main>
  );
}

export default GoogleSuccess;