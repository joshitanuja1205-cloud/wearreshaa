import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/auth/login", {
        email,
        password,
      });

      if (response.data.success) {
        // Save token
        localStorage.setItem("token", response.data.token);

        // Go back to cart
        navigate("/cart");
      }
    } catch (error) {
      console.error("Login error:", error);

      setError(
        error.response?.data?.message ||
          "Unable to login. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f8f6f0] flex items-center justify-center px-5 py-16">

      <div className="w-full max-w-md">

        {/* BRAND */}

        <div className="text-center mb-10">

          <p className="
            text-xs
            tracking-[0.3em]
            uppercase
            text-[#bd6670]
            mb-4
          ">
            RESHAA
          </p>

          <h1 className="
            font-serif
            text-5xl
            text-[#241f1d]
          ">
            Welcome Back
          </h1>

          <p className="
            mt-3
            text-sm
            text-[#827872]
          ">
            Sign in to continue your RESHAA journey.
          </p>

        </div>


        {/* LOGIN CARD */}

        <div className="
          bg-white/60
          border
          border-[#e2dad2]
          rounded-2xl
          p-7
          sm:p-9
        ">

          <form
            onSubmit={handleLogin}
            className="space-y-6"
          >

            {/* EMAIL */}

            <div>

              <label className="
                block
                text-sm
                font-medium
                text-[#241f1d]
                mb-2
              ">
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="
                  w-full
                  h-12
                  px-4
                  rounded-lg
                  border
                  border-[#cfc7bf]
                  bg-[#f8f6f0]
                  text-[#241f1d]
                  outline-none
                  focus:border-[#bd6670]
                  transition
                "
              />

            </div>


            {/* PASSWORD */}

            <div>

              <label className="
                block
                text-sm
                font-medium
                text-[#241f1d]
                mb-2
              ">
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="
                  w-full
                  h-12
                  px-4
                  rounded-lg
                  border
                  border-[#cfc7bf]
                  bg-[#f8f6f0]
                  text-[#241f1d]
                  outline-none
                  focus:border-[#bd6670]
                  transition
                "
              />

            </div>


            {/* ERROR */}

            {error && (
              <p className="
                text-sm
                text-[#bd6670]
              ">
                {error}
              </p>
            )}


            {/* LOGIN BUTTON */}

            <button
              type="submit"
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
              "
            >
              {loading ? "SIGNING IN..." : "SIGN IN →"}
            </button>

          </form>


          {/* REGISTER */}

          <p className="
            text-center
            text-sm
            text-[#827872]
            mt-7
          ">
            Don't have an account?{" "}

            <Link
              to="/register"
              className="
                text-[#bd6670]
                underline
                hover:text-[#241f1d]
              "
            >
              Create one
            </Link>

          </p>

        </div>


        {/* BACK TO SHOP */}

        <div className="text-center mt-6">

          <Link
            to="/shop"
            className="
              text-sm
              text-[#665f5b]
              underline
              hover:text-[#bd6670]
              transition
            "
          >
            ← Back to Shop
          </Link>

        </div>

      </div>

    </main>
  );
}

export default Login;