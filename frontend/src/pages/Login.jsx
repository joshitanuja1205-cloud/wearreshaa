import { useState } from "react";
import { useNavigate } from "react-router-dom";

import LoginModal from "../components/LoginModal";

function Login() {
  const navigate = useNavigate();

  const [showLogin, setShowLogin] = useState(true);

  const handleVerified = () => {
    // Account is already saved through the backend
    // and JWT is already stored in localStorage.

    navigate("/");
  };

  return (
    <main className="min-h-screen bg-[#f8f6f0]">

      {showLogin && (
        <LoginModal
        redirectAfterLogin="/"
          onClose={() => {
            setShowLogin(false);
            navigate("/");
          }}
          onVerified={handleVerified}
        />
      )}

    </main>
  );
}

export default Login;