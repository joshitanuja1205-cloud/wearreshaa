import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginModal from "../components/LoginModal";

function Checkout() {
  const navigate = useNavigate();

  // ================= LOGIN POPUP =================

  const [showLogin, setShowLogin] = useState(() => {
  const savedCustomer = sessionStorage.getItem("reshAA-verifiedCustomer");
  return !savedCustomer;
});

const [verifiedCustomer, setVerifiedCustomer] = useState(() => {
  const savedCustomer =
    sessionStorage.getItem("reshAA-verifiedCustomer");

  return savedCustomer
    ? JSON.parse(savedCustomer)
    : null;
});

  // ================= CART =================

  const [cart, setCart] = useState([]);

  // ================= CUSTOMER FORM =================

  const [form, setForm] = useState(() => {
  const savedForm = sessionStorage.getItem("reshAA-checkoutForm");

  return savedForm
    ? JSON.parse(savedForm)
    : {
        name: "",
        phone: "",
        email: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
      };
});
  useEffect(() => {
  if (!verifiedCustomer) return;

  setForm((prev) => ({
    ...prev,
    phone: verifiedCustomer.phone || prev.phone,
    email: verifiedCustomer.email || prev.email,
  }));
}, [verifiedCustomer]);

  // ================= PAYMENT =================

  const [paymentMethod, setPaymentMethod] = useState("cod");

  // ================= LOAD CART =================

  useEffect(() => {
    const savedCart =
      JSON.parse(localStorage.getItem("reshAA-cart")) || [];

    setCart(savedCart);
  }, []);

  // ================= SUBTOTAL =================

  const subtotal = cart.reduce(
    (total, item) =>
      total + (item.price || item.product?.price || 0) * item.quantity,
    0
  );

  // ================= SHIPPING =================

  const shipping = subtotal >= 1999 ? 0 : 99;

  // ================= TOTAL =================

  const total = subtotal + shipping;

  // ================= FORM CHANGE =================

  const handleChange = (e) => {
  const updatedForm = {
    ...form,
    [e.target.name]: e.target.value,
  };

  setForm(updatedForm);

  sessionStorage.setItem(
    "reshAA-checkoutForm",
    JSON.stringify(updatedForm)
  );
};
  // ================= PLACE ORDER =================

  const handleSubmit = (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    const orderNumber = `RS${Date.now()
      .toString()
      .slice(-6)}`;

    const order = {
      orderNumber,
      customer: form,
      items: cart,
      paymentMethod,
      subtotal,
      shipping,
      total,
    };

    console.log("Order:", order);

    // Clear cart
    localStorage.removeItem("reshAA-cart");

    // Update cart count in Navbar
    window.dispatchEvent(
      new Event("cartUpdated")
    );

    // Go to order confirmation page
    navigate("/order-success", {
      state: {
        order,
      },
    });
  };

  // =====================================================
  // EMPTY CART
  // =====================================================

  if (cart.length === 0) {
    return (
      <main
        className="
          min-h-screen
          bg-[#f8f6f0]
          flex
          items-center
          justify-center
          px-6
        "
      >
        <div className="text-center max-w-md">

          <div
            className="
              w-20
              h-20
              mx-auto
              rounded-full
              bg-[#f1e9e1]
              flex
              items-center
              justify-center
              text-3xl
            "
          >
            🛍️
          </div>

          <h1
            className="
              font-serif
              text-4xl
              md:text-5xl
              text-[#241f1d]
              mt-7
            "
          >
            Nothing to checkout
          </h1>

          <p
            className="
              text-[#756b66]
              mt-4
              leading-7
            "
          >
            Your cart is currently empty.
            Discover something from the RESHAA collection
            and come back when you're ready.
          </p>

          <Link
            to="/shop"
            className="
              inline-flex
              items-center
              justify-center
              mt-8
              px-9
              h-13
              rounded-full
              bg-[#241f1d]
              text-white
              text-sm
              tracking-wide
              hover:bg-[#bd6670]
              transition
            "
          >
            EXPLORE COLLECTION →
          </Link>

        </div>
      </main>
    );
  }

  // =====================================================
  // LOGIN POPUP
  // =====================================================

  if (showLogin) {
    return (
      <>
        <main className="min-h-screen bg-[#f8f6f0]" />

        <LoginModal
  onClose={() => setShowLogin(false)}
  onVerified={(customer) => {
  setVerifiedCustomer(customer);

  sessionStorage.setItem(
    "reshAA-verifiedCustomer",
    JSON.stringify(customer)
  );
}}
/>
        
      </>
    );
  }

  // =====================================================
  // CHECKOUT PAGE
  // =====================================================

  return (
    <main
      className="
        min-h-screen
        bg-[#f8f6f0]
      "
    >

      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <section
        className="
          px-6
          md:px-12
          lg:px-20
          pt-12
          md:pt-16
          pb-10
        "
      >

        <div className="max-w-7xl mx-auto">

          <Link
            to="/cart"
            className="
              inline-flex
              items-center
              gap-2
              text-xs
              uppercase
              tracking-[0.2em]
              text-[#827872]
              hover:text-[#bd6670]
              transition
            "
          >
            ← Back to Cart
          </Link>

          <div className="mt-8">

            <p
              className="
                text-xs
                tracking-[0.3em]
                text-[#bd6670]
                uppercase
                mb-4
              "
            >
              RESHAA
            </p>

            <h1
              className="
                font-serif
                text-5xl
                md:text-6xl
                lg:text-7xl
                text-[#241f1d]
              "
            >
              Checkout
            </h1>

            <p
              className="
                mt-4
                text-[#756b66]
                max-w-lg
                leading-7
              "
            >
              You're almost there. Complete your details
              and we'll take care of the rest.
            </p>

          </div>

        </div>

      </section>

      {/* ================================================= */}
      {/* CHECKOUT CONTENT */}
      {/* ================================================= */}

      <section
        className="
          px-6
          md:px-12
          lg:px-20
          pb-24
        "
      >

        <form
          onSubmit={handleSubmit}
          className="
            max-w-7xl
            mx-auto
            grid
            lg:grid-cols-[1fr_400px]
            gap-8
            lg:gap-12
          "
        >

          {/* ================================================= */}
          {/* LEFT SIDE */}
          {/* ================================================= */}

          <div className="space-y-6">

            {/* ================= CONTACT ================= */}

            <div
              className="
                bg-white/50
                border
                border-[#ded7cf]
                rounded-3xl
                p-6
                md:p-8
              "
            >

              <div
                className="
                  flex
                  items-start
                  gap-4
                "
              >

                <div
                  className="
                    w-10
                    h-10
                    rounded-full
                    bg-[#f1e9e1]
                    flex
                    items-center
                    justify-center
                    text-sm
                    shrink-0
                  "
                >
                  01
                </div>

                <div>

                  <h2
                    className="
                      font-serif
                      text-3xl
                      text-[#241f1d]
                    "
                  >
                    Contact Information
                  </h2>

                  <p
                    className="
                      text-sm
                      text-[#827872]
                      mt-1
                    "
                  >
                    Where should we send your order updates?
                  </p>

                </div>

              </div>

              <div
                className="
                  grid
                  sm:grid-cols-2
                  gap-5
                  mt-8
                "
              >

                <div>

                  <label className="checkout-label">
                    Full Name
                  </label>

                  <input
                    required
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className="checkout-input"
                  />

                </div>

                <div className="flex items-center gap-2 mb-2">
  
 <div>

  <div className="flex items-center justify-between mb-2">

    <label className="checkout-label">
      Phone Number
    </label>

    {verifiedCustomer?.method === "phone" && (
      <span className="
        text-sm
        text-green-600
        font-medium
      ">
        ✓ Verified
      </span>
    )}

  </div>

  <input
    required
    name="phone"
    value={form.phone}
    onChange={handleChange}
    placeholder="+91 XXXXX XXXXX"
    type="tel"
    className="checkout-input"
  />

</div>
</div>
                <div className="sm:col-span-2">

                  <div className="flex items-center gap-2 mb-2">
 <div>

  <div className="flex items-center justify-between mb-2">

    <label className="checkout-label">
      Email Address
    </label>

    {verifiedCustomer?.method === "email" && (
      <span className="
        text-sm
        text-green-600
        font-medium
      ">
        ✓ Verified
      </span>
    )}

  </div>

  <input
    required
    name="email"
    value={form.email}
    onChange={handleChange}
    placeholder="you@gmail.com"
    type="email"
    className="checkout-input"
  />

</div>
</div>

                </div>

              </div>

            </div>

            {/* ================= ADDRESS ================= */}

            <div
              className="
                bg-white/50
                border
                border-[#ded7cf]
                rounded-3xl
                p-6
                md:p-8
              "
            >

              <div
                className="
                  flex
                  items-start
                  gap-4
                "
              >

                <div
                  className="
                    w-10
                    h-10
                    rounded-full
                    bg-[#f1e9e1]
                    flex
                    items-center
                    justify-center
                    text-sm
                    shrink-0
                  "
                >
                  02
                </div>

                <div>

                  <h2
                    className="
                      font-serif
                      text-3xl
                      text-[#241f1d]
                    "
                  >
                    Delivery Address
                  </h2>

                  <p
                    className="
                      text-sm
                      text-[#827872]
                      mt-1
                    "
                  >
                    Where should your RESHAA package arrive?
                  </p>

                </div>

              </div>

              <div className="space-y-5 mt-8">

                <div>

                  <label className="checkout-label">
                    Address
                  </label>

                  <textarea
                    required
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="House number, street, area"
                    rows="3"
                    className="
                      checkout-input
                      resize-none
                    "
                  />

                </div>

                <div
                  className="
                    grid
                    sm:grid-cols-3
                    gap-5
                  "
                >

                  <div>

                    <label className="checkout-label">
                      City
                    </label>

                    <input
                      required
                      name="city"
                      value={form.city}
                      onChange={handleChange}
                      placeholder="City"
                      className="checkout-input"
                    />

                  </div>

                  <div>

                    <label className="checkout-label">
                      State
                    </label>

                    <input
                      required
                      name="state"
                      value={form.state}
                      onChange={handleChange}
                      placeholder="State"
                      className="checkout-input"
                    />

                  </div>

                  <div>

                    <label className="checkout-label">
                      Pincode
                    </label>

                    <input
                      required
                      name="pincode"
                      value={form.pincode}
                      onChange={handleChange}
                      placeholder="6-digit PIN"
                      maxLength="6"
                      inputMode="numeric"
                      className="checkout-input"
                    />

                  </div>

                </div>

              </div>

            </div>

            {/* ================= PAYMENT ================= */}

            <div
              className="
                bg-white/50
                border
                border-[#ded7cf]
                rounded-3xl
                p-6
                md:p-8
              "
            >

              <div
                className="
                  flex
                  items-start
                  gap-4
                "
              >

                <div
                  className="
                    w-10
                    h-10
                    rounded-full
                    bg-[#f1e9e1]
                    flex
                    items-center
                    justify-center
                    text-sm
                    shrink-0
                  "
                >
                  03
                </div>

                <div>

                  <h2
                    className="
                      font-serif
                      text-3xl
                      text-[#241f1d]
                    "
                  >
                    Payment
                  </h2>

                  <p
                    className="
                      text-sm
                      text-[#827872]
                      mt-1
                    "
                  >
                    Choose how you'd like to pay.
                  </p>

                </div>

              </div>

              <div
                className="
                  space-y-3
                  mt-8
                "
              >

                {/* COD */}

                <label
                  className={`
                    flex
                    items-center
                    gap-4
                    p-5
                    rounded-2xl
                    border
                    cursor-pointer
                    transition
                    ${
                      paymentMethod === "cod"
                        ? "border-[#241f1d] bg-[#f1e9e1]"
                        : "border-[#ded7cf] hover:border-[#a99f97]"
                    }
                  `}
                >

                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={(e) =>
                      setPaymentMethod(e.target.value)
                    }
                    className="accent-[#bd6670]"
                  />

                  <div className="flex-1">

                    <div
                      className="
                        flex
                        items-center
                        justify-between
                        gap-4
                      "
                    >

                      <div>

                        <p
                          className="
                            font-medium
                            text-[#241f1d]
                          "
                        >
                          Cash on Delivery
                        </p>

                        <p
                          className="
                            text-xs
                            text-[#827872]
                            mt-1
                          "
                        >
                          Pay when your order arrives.
                        </p>

                      </div>

                      <span className="text-xl">
                        ₹
                      </span>

                    </div>

                  </div>

                </label>

                {/* ONLINE */}

                <label
                  className={`
                    flex
                    items-center
                    gap-4
                    p-5
                    rounded-2xl
                    border
                    cursor-pointer
                    transition
                    ${
                      paymentMethod === "online"
                        ? "border-[#241f1d] bg-[#f1e9e1]"
                        : "border-[#ded7cf] hover:border-[#a99f97]"
                    }
                  `}
                >

                  <input
                    type="radio"
                    name="payment"
                    value="online"
                    checked={paymentMethod === "online"}
                    onChange={(e) =>
                      setPaymentMethod(e.target.value)
                    }
                    className="accent-[#bd6670]"
                  />

                  <div className="flex-1">

                    <div
                      className="
                        flex
                        items-center
                        justify-between
                        gap-4
                      "
                    >

                      <div>

                        <p
                          className="
                            font-medium
                            text-[#241f1d]
                          "
                        >
                          Online Payment
                        </p>

                        <p
                          className="
                            text-xs
                            text-[#827872]
                            mt-1
                          "
                        >
                          UPI, cards & net banking.
                        </p>

                      </div>

                      <span className="text-xl">
                        ◇
                      </span>

                    </div>

                  </div>

                </label>

              </div>

            </div>

          </div>

          {/* ================================================= */}
          {/* RIGHT — ORDER SUMMARY */}
          {/* ================================================= */}

          <aside
            className="
              h-fit
              lg:sticky
              lg:top-28
              bg-[#f1e9e1]
              border
              border-[#ded7cf]
              rounded-3xl
              p-6
              md:p-8
            "
          >

            <div
              className="
                flex
                items-center
                justify-between
              "
            >

              <h2
                className="
                  font-serif
                  text-3xl
                  text-[#241f1d]
                "
              >
                Your Order
              </h2>

              <span
                className="
                  text-xs
                  text-[#827872]
                "
              >
                {cart.length} items
              </span>

            </div>

            {/* PRODUCTS */}

            <div
              className="
                mt-7
                space-y-5
                max-h-80
                overflow-y-auto
                pr-1
              "
            >

              {cart.map((item) => {

                const product = item.product;

                const itemName =
                  item.name || product?.name || "RESHAA Product";

                const itemPrice =
                  item.price || product?.price || 0;

                return (
                  <div
                    key={item.id || item._id}
                    className="
                      flex
                      gap-4
                    "
                  >

                    {/* MINI IMAGE */}

                    <div
                      className="
                        w-16
                        h-20
                        rounded-xl
                        bg-[#e7ded5]
                        flex
                        items-center
                        justify-center
                        shrink-0
                        overflow-hidden
                      "
                    >

                      {product?.images?.length > 0 ? (

                        <img
                          src={product.images[0]}
                          alt={itemName}
                          className="
                            w-full
                            h-full
                            object-cover
                          "
                        />

                      ) : (

                        <span
                          className="
                            font-serif
                            text-xs
                            text-[#241f1d]
                          "
                        >
                          RESHAA
                        </span>

                      )}

                    </div>

                    {/* INFO */}

                    <div className="flex-1 min-w-0">

                      <div
                        className="
                          flex
                          justify-between
                          gap-3
                        "
                      >

                        <p
                          className="
                            text-sm
                            text-[#241f1d]
                            truncate
                          "
                        >
                          {itemName}
                        </p>

                        <p
                          className="
                            text-sm
                            font-medium
                            text-[#241f1d]
                            shrink-0
                          "
                        >
                          ₹{itemPrice * item.quantity}
                        </p>

                      </div>

                      <p
                        className="
                          text-xs
                          text-[#827872]
                          mt-1
                        "
                      >
                        {item.color?.name || item.color || "—"} ·{" "}
                        {item.size || "—"}
                      </p>

                      <p
                        className="
                          text-xs
                          text-[#827872]
                          mt-1
                        "
                      >
                        Qty: {item.quantity}
                      </p>

                    </div>

                  </div>
                );
              })}

            </div>

            <div
              className="
                h-px
                bg-[#d7cec5]
                my-6
              "
            />

            {/* PRICE */}

            <div className="space-y-3 text-sm">

              <div
                className="
                  flex
                  justify-between
                "
              >

                <span className="text-[#756b66]">
                  Subtotal
                </span>

                <span>
                  ₹{subtotal}
                </span>

              </div>

              <div
                className="
                  flex
                  justify-between
                "
              >

                <span className="text-[#756b66]">
                  Shipping
                </span>

                <span>
                  {shipping === 0
                    ? "FREE"
                    : `₹${shipping}`}
                </span>

              </div>

              {shipping === 0 && (
                <p
                  className="
                    text-xs
                    text-[#bd6670]
                    text-right
                  "
                >
                  Free shipping unlocked ✦
                </p>
              )}

            </div>

            <div
              className="
                h-px
                bg-[#d7cec5]
                my-6
              "
            />

            {/* TOTAL */}

            <div
              className="
                flex
                justify-between
                items-center
              "
            >

              <span
                className="
                  text-lg
                  font-medium
                  text-[#241f1d]
                "
              >
                Total
              </span>

              <span
                className="
                  text-xl
                  font-medium
                  text-[#241f1d]
                "
              >
                ₹{total}
              </span>

            </div>

            {/* PLACE ORDER */}

            <button
              type="submit"
              className="
                w-full
                h-14
                mt-7
                rounded-full
                bg-[#bd6670]
                text-white
                text-sm
                font-medium
                tracking-wide
                hover:bg-[#a95560]
                hover:shadow-lg
                transition
              "
            >
              PLACE ORDER →
            </button>

            <div
              className="
                flex
                items-center
                justify-center
                gap-2
                mt-5
                text-xs
                text-[#827872]
              "
            >

              <span>🔒</span>

              <span>
                Secure checkout
              </span>

            </div>

          </aside>

        </form>

      </section>

    </main>
  );
}

export default Checkout;