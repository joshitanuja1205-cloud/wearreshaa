import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginModal from "./LoginModal";

function Navbar() {
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  const [showLogin, setShowLogin] = useState(false);

  const navigate = useNavigate();

  // =====================================================
  // UPDATE CART + WISHLIST COUNTS
  // =====================================================

  const updateCounts = () => {
    const cart =
      JSON.parse(localStorage.getItem("reshAA-cart")) || [];

    const wishlist =
      JSON.parse(localStorage.getItem("reshAA-wishlist")) || [];

    const totalCartItems = cart.reduce(
      (total, item) => total + item.quantity,
      0
    );

    setCartCount(totalCartItems);
    setWishlistCount(wishlist.length);
  };

  // =====================================================
  // LISTEN FOR CART / WISHLIST UPDATES
  // =====================================================

  useEffect(() => {
    updateCounts();

    window.addEventListener("cartUpdated", updateCounts);
    window.addEventListener("wishlistUpdated", updateCounts);

    return () => {
      window.removeEventListener("cartUpdated", updateCounts);
      window.removeEventListener("wishlistUpdated", updateCounts);
    };
  }, []);

  // =====================================================
  // ACCOUNT CLICK
  // =====================================================

  const handleAccountClick = () => {
    const token = localStorage.getItem("token");

    if (token) {
      // User is already logged in
      navigate("/account");
    } else {
      // User is not logged in
      setShowLogin(true);
    }
  };

  // =====================================================
  // AFTER LOGIN / ACCOUNT VERIFICATION
  // =====================================================

  const handleVerified = () => {
    setShowLogin(false);

    // After successful login,
    // take the user to their account
    navigate("/account");
  };

  return (
    <>
      <nav
        className="
          bg-[#f8f6f0]
          border-b
          border-[#eee6df]
          sticky
          top-0
          z-50
        "
      >
        <div
          className="
            max-w-7xl
            mx-auto
            px-4
            sm:px-6
            md:px-8
            h-16
            sm:h-20
            flex
            items-center
            justify-between
          "
        >

          {/* =================================================
              LOGO
          ================================================= */}

          <Link
            to="/"
            className="
              text-2xl
              sm:text-3xl
              md:text-4xl
              font-serif
              tracking-tight
              text-[#241f1d]
              shrink-0
            "
          >
            ✦ RESHAA
          </Link>


          {/* =================================================
              DESKTOP NAVIGATION
          ================================================= */}

          <div
            className="
              hidden
              md:flex
              items-center
              gap-8
              lg:gap-10
              text-sm
              text-[#292522]
            "
          >

            <Link
              to="/"
              className="hover:text-[#bd6670] transition"
            >
              Home
            </Link>

            <Link
              to="/shop"
              className="hover:text-[#bd6670] transition"
            >
              Shop
            </Link>

            <Link
              to="/customize"
              className="hover:text-[#bd6670] transition"
            >
              Custom
            </Link>

            <Link
              to="/about"
              className="hover:text-[#bd6670] transition"
            >
              About
            </Link>

          </div>


          {/* =================================================
              ICONS
          ================================================= */}

          <div
            className="
              flex
              items-center
              gap-3
              sm:gap-5
              text-lg
              sm:text-xl
              text-[#292522]
            "
          >

            {/* SEARCH */}

            <button
              type="button"
              aria-label="Search"
              className="
                hidden
                sm:block
                hover:scale-110
                transition
              "
            >
              ⌕
            </button>


            {/* =================================================
                WISHLIST
            ================================================= */}

            <Link
              to="/wishlist"
              aria-label="Wishlist"
              className="
                relative
                p-1
                hover:scale-110
                transition
              "
            >
              ♡

              {wishlistCount > 0 && (
                <span
                  className="
                    absolute
                    -top-1
                    -right-1
                    bg-[#bd6670]
                    text-white
                    text-[8px]
                    w-4
                    h-4
                    rounded-full
                    flex
                    items-center
                    justify-center
                  "
                >
                  {wishlistCount}
                </span>
              )}

            </Link>


            {/* =================================================
                ACCOUNT
            ================================================= */}

           <Link
  to="/account"
  aria-label="My Account"
  className="
    p-1
    hover:scale-110
    transition
  "
>
  ♙
</Link>

            {/* =================================================
                CART
            ================================================= */}

            <Link
              to="/cart"
              aria-label="Cart"
              className="
                relative
                p-1
                hover:scale-110
                transition
              "
            >
              🛍️

              {cartCount > 0 && (
                <span
                  className="
                    absolute
                    -top-1
                    -right-1
                    bg-[#bd6670]
                    text-white
                    text-[8px]
                    w-4
                    h-4
                    rounded-full
                    flex
                    items-center
                    justify-center
                  "
                >
                  {cartCount}
                </span>
              )}

            </Link>

          </div>

        </div>
      </nav>


      {/* =====================================================
          LOGIN MODAL
      ===================================================== */}

      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onVerified={handleVerified}
        />
      )}

    </>
  );
}

export default Navbar;