import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function MyAccount() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ================= FETCH ACCOUNT =================

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        setLoading(true);
        console.log(
        "🟣 ACCOUNT API BASE URL:",
        api.defaults.baseURL
      );

      console.log(
        "🟣 ACCOUNT TOKEN EXISTS:",
        !!localStorage.getItem("token")
      );


        const [userResponse, ordersResponse] =
          await Promise.all([
            api.get("/auth/me"),
            api.get("/orders"),
          ]);

        if (userResponse.data.success) {
          setUser(userResponse.data.user);
        }

        if (ordersResponse.data.success) {
          setOrders(ordersResponse.data.orders);
        }
      } catch (error) {
        console.error("Account error:", error);

        // If token is invalid / expired
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/phone-login");
          return;
        }

        setError(
          error.response?.data?.message ||
            "Unable to load your account."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAccount();
  }, [navigate]);

  // ================= LOGOUT =================

  const handleLogout = () => {
    localStorage.removeItem("token");

    // Optional cleanup if you later store user information
    localStorage.removeItem("user");

    navigate("/phone-login");
  };

  // ================= LOADING =================

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8f6f0] flex items-center justify-center px-5">
        <p className="text-[#827872] text-sm sm:text-base">
          Loading your account...
        </p>
      </div>
    );
  }

  // ================= ERROR =================

  if (error) {
    return (
      <div className="min-h-screen bg-[#f8f6f0] flex items-center justify-center px-5">
        <div className="text-center">
          <p className="text-[#bd6670]">
            {error}
          </p>

          <button
            onClick={() => navigate("/phone-login")}
            className="
              mt-5
              px-6
              py-3
              rounded-full
              bg-[#bd6670]
              text-white
              text-sm
              hover:opacity-90
              transition
            "
          >
            Login Again
          </button>
        </div>
      </div>
    );
  }

  // ================= PAGE =================

  return (
    <div className="
      min-h-screen
      bg-[#f8f6f0]
      px-4
      sm:px-6
      md:px-8
      py-8
      sm:py-12
    ">

      <div className="
        max-w-5xl
        mx-auto
      ">

        {/* ================= HEADER ================= */}

        <div className="
          mb-7
          sm:mb-10
        ">

          <div className="
            flex
            flex-col
            sm:flex-row
            sm:items-end
            sm:justify-between
            gap-5
          ">

            <div>

              <p className="
                font-serif
                text-3xl
                sm:text-4xl
                text-[#241f1d]
              ">
                My Account
              </p>

              {user && (
                <p className="
                  text-[#827872]
                  mt-2
                  text-sm
                  sm:text-base
                ">
                  Welcome, {user.name} ♡
                </p>
              )}

            </div>

{user?.role === "admin" && (
  <button
    onClick={() => navigate("/admin")}
    className="
      mt-4
      inline-flex
      items-center
      gap-2
      rounded-full
      bg-[#241f1d]
      px-5
      py-3
      text-sm
      text-white
      transition
      hover:opacity-90
    "
  >
    Admin Dashboard →
  </button>
)}

{user?.role === "admin" && (
  <button
    onClick={() => navigate("/admin/orders")}
    className="
      mt-4
      px-5
      py-2.5
      rounded-full
      bg-[#241f1d]
      text-white
      text-sm
      hover:opacity-90
      transition
    "
  >
    Manage RESHAA Orders →
  </button>
)}
```
            {/* LOGOUT */}

            <button
              onClick={handleLogout}
              className="
                self-start
                sm:self-auto
                px-5
                py-2.5
                rounded-full
                border
                border-[#d9cec5]
                text-[#665f5b]
                text-sm
                hover:bg-[#241f1d]
                hover:text-white
                transition
              "
            >
              Logout
            </button>

          </div>

        </div>


        {/* ================= ACCOUNT DETAILS ================= */}

        <div className="
          bg-white
          rounded-2xl
          sm:rounded-3xl
          p-5
          sm:p-7
          shadow-sm
          mb-7
          sm:mb-8
        ">

          <h2 className="
            font-serif
            text-xl
            sm:text-2xl
            text-[#241f1d]
            mb-5
            sm:mb-6
          ">
            Account Details
          </h2>

          {user && (
            <div className="
              grid
              grid-cols-1
              sm:grid-cols-2
              gap-5
              sm:gap-7
            ">

              {/* NAME */}

              <div>
                <p className="
                  text-[10px]
                  sm:text-xs
                  text-[#a09791]
                  uppercase
                  tracking-wider
                ">
                  Name
                </p>

                <p className="
                  text-[#241f1d]
                  mt-1
                  text-sm
                  sm:text-base
                  break-words
                ">
                  {user.name}
                </p>
              </div>


              {/* PHONE */}

              {user.phone && (
                <div>
                  <p className="
                    text-[10px]
                    sm:text-xs
                    text-[#a09791]
                    uppercase
                    tracking-wider
                  ">
                    Phone
                  </p>

                  <p className="
                    text-[#241f1d]
                    mt-1
                    text-sm
                    sm:text-base
                  ">
                    {user.phone}
                  </p>
                </div>
              )}


              {/* EMAIL */}

              {user.email && (
                <div>
                  <p className="
                    text-[10px]
                    sm:text-xs
                    text-[#a09791]
                    uppercase
                    tracking-wider
                  ">
                    Email
                  </p>

                  <p className="
                    text-[#241f1d]
                    mt-1
                    text-sm
                    sm:text-base
                    break-all
                  ">
                    {user.email}
                  </p>
                </div>
              )}

            </div>
          )}

        </div>


        {/* ================= ORDERS ================= */}

        <div>

          <div className="
            flex
            items-center
            justify-between
            mb-5
            sm:mb-6
          ">

            <h2 className="
              font-serif
              text-2xl
              sm:text-3xl
              text-[#241f1d]
            ">
              My Orders
            </h2>

            <span className="
              text-xs
              sm:text-sm
              text-[#827872]
            ">
              {orders.length}{" "}
              {orders.length === 1
                ? "order"
                : "orders"}
            </span>

          </div>


          {/* ================= NO ORDERS ================= */}

          {orders.length === 0 && (

            <div className="
              bg-white
              rounded-2xl
              sm:rounded-3xl
              p-8
              sm:p-10
              text-center
              shadow-sm
            ">

              <div className="
                w-12
                h-12
                sm:w-14
                sm:h-14
                mx-auto
                rounded-full
                bg-[#f1e9e1]
                flex
                items-center
                justify-center
                text-lg
                sm:text-xl
              ">
                ♡
              </div>

              <h3 className="
                font-serif
                text-xl
                sm:text-2xl
                text-[#241f1d]
                mt-5
              ">
                No orders yet
              </h3>

              <p className="
                text-xs
                sm:text-sm
                text-[#827872]
                mt-2
              ">
                Your RESHAA orders will appear here.
              </p>

              <button
                onClick={() => navigate("/shop")}
                className="
                  mt-6
                  px-6
                  py-3
                  rounded-full
                  bg-[#bd6670]
                  text-white
                  text-sm
                  hover:opacity-90
                  transition
                "
              >
                Start Shopping
              </button>

            </div>

          )}


          {/* ================= ORDERS ================= */}

          {orders.length > 0 && (

            <div className="space-y-4 sm:space-y-5">

              {orders.map((order) => (

                <div
                  key={order._id}
                  className="
                    bg-white
                    rounded-2xl
                    sm:rounded-3xl
                    p-5
                    sm:p-6
                    shadow-sm
                  "
                >

                  {/* ORDER INFO */}

                  <div className="
                    grid
                    grid-cols-2
                    sm:flex
                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                    gap-5
                  ">

                    {/* ORDER ID */}

                    <div className="min-w-0">

                      <p className="
                        text-[10px]
                        sm:text-xs
                        text-[#a09791]
                        uppercase
                      ">
                        Order
                      </p>

                      <p className="
                        text-xs
                        sm:text-sm
                        text-[#241f1d]
                        mt-1
                        truncate
                      ">
                        #{order._id}
                      </p>

                    </div>


                    {/* DATE */}

                    <div>

                      <p className="
                        text-[10px]
                        sm:text-xs
                        text-[#a09791]
                        uppercase
                      ">
                        Date
                      </p>

                      <p className="
                        text-xs
                        sm:text-sm
                        text-[#241f1d]
                        mt-1
                      ">
                        {new Date(
                          order.createdAt
                        ).toLocaleDateString("en-IN")}
                      </p>

                    </div>


                    {/* TOTAL */}

                    <div>

                      <p className="
                        text-[10px]
                        sm:text-xs
                        text-[#a09791]
                        uppercase
                      ">
                        Total
                      </p>

                      <p className="
                        text-xs
                        sm:text-sm
                        font-medium
                        text-[#241f1d]
                        mt-1
                      ">
                        ₹{order.totalAmount}
                      </p>

                    </div>


                    {/* STATUS */}

                    <div>

                      <span className="
                        inline-block
                        px-3
                        sm:px-4
                        py-1.5
                        sm:py-2
                        rounded-full
                        bg-[#f1e9e1]
                        text-[10px]
                        sm:text-xs
                        text-[#665f5b]
                      ">
                        {order.orderStatus}
                      </span>

                    </div>

                  </div>


                  {/* ITEMS */}

                  <div className="
                    border-t
                    border-[#eee7df]
                    mt-5
                    sm:mt-6
                    pt-4
                    sm:pt-5
                  ">

                    <p className="
                      text-xs
                      sm:text-sm
                      text-[#827872]
                    ">
                      {order.items.length}{" "}
                      {order.items.length === 1
                        ? "item"
                        : "items"}
                    </p>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </div>

    </div>
  );
}

export default MyAccount;