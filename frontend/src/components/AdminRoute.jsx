
import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import api from "../services/api";

function AdminRoute() {
  const location = useLocation();
  const [status, setStatus] = useState("checking");

  useEffect(() => {
    let active = true;

    async function checkAdmin() {
      const token = localStorage.getItem("token");

      if (!token) {
        if (active) setStatus("unauthenticated");
        return;
      }

      try {
        const response = await api.get("/auth/me");
        const user = response.data?.user;

        if (active) {
          setStatus(
            response.data?.success && user?.role === "admin"
              ? "admin"
              : "forbidden"
          );
        }
      } catch (error) {
        if (active) {
          setStatus(
            error.response?.status === 401
              ? "unauthenticated"
              : "error"
          );
        }
      }
    }

    checkAdmin();

    return () => {
      active = false;
    };
  }, []);

  if (status === "checking") {
    return (
      <main className="min-h-screen bg-[#f8f6f1] p-8">
        Checking access...
      </main>
    );
  }

  if (status === "unauthenticated") {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  if (status === "forbidden") {
    return <Navigate to="/account" replace />;
  }

  if (status === "error") {
    return (
      <main className="min-h-screen bg-[#f8f6f1] p-8">
        <p>Unable to verify your access. Please try again.</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 underline"
        >
          Retry
        </button>
      </main>
    );
  }

  return <Outlet />;
}

export default AdminRoute;
