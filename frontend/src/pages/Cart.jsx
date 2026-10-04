import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // =====================================================
  // GET CART
  // =====================================================

  const fetchCart = () => {
    try {
      const savedCart =
        JSON.parse(localStorage.getItem("reshAA-cart")) || [];

      setCartItems(savedCart);
    } catch (error) {
      console.error("Failed to fetch cart:", error);
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // =====================================================
  // UPDATE QUANTITY
  // =====================================================

  const updateQuantity = (itemId, quantity) => {
    if (quantity < 1) return;

    const updatedCart = cartItems.map((item) =>
      item.id === itemId
        ? {
            ...item,
            quantity,
          }
        : item
    );

    setCartItems(updatedCart);

    localStorage.setItem(
      "reshAA-cart",
      JSON.stringify(updatedCart)
    );

    window.dispatchEvent(new Event("cartUpdated"));
  };

  // =====================================================
  // REMOVE ITEM
  // =====================================================

  const removeItem = (itemId) => {
    const updatedCart = cartItems.filter(
      (item) => item.id !== itemId
    );

    setCartItems(updatedCart);

    localStorage.setItem(
      "reshAA-cart",
      JSON.stringify(updatedCart)
    );

    window.dispatchEvent(new Event("cartUpdated"));
  };

  // =====================================================
  // SUBTOTAL
  // =====================================================

  const subtotal = cartItems.reduce((total, item) => {
    return (
      total +
      (Number(item.price) || 0) *
        (Number(item.quantity) || 0)
    );
  }, 0);

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f8f6f0] flex items-center justify-center">
        <div className="text-center">

          <p className="font-serif text-3xl text-[#241f1d]">
            Loading your cart...
          </p>

          <p className="text-sm text-[#827872] mt-3">
            Just a moment ♡
          </p>

        </div>
      </main>
    );
  }

  // =====================================================
  // MAIN CART
  // =====================================================

  return (
    <main className="min-h-screen bg-[#f8f6f0]">

      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <section className="
        px-6
        md:px-12
        lg:px-20
        pt-14
        pb-10
      ">

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
          md:text-6xl
          text-[#241f1d]
        ">
          Your Cart
        </h1>

        <p className="
          mt-3
          text-[#665f5b]
        ">
          Your selected pieces, ready to become part of your story.
        </p>

      </section>


      {/* ================================================= */}
      {/* CART CONTENT */}
      {/* ================================================= */}

      <section className="
        px-6
        md:px-12
        lg:px-20
        pb-20
      ">

        <div className="max-w-6xl mx-auto">

          {/* ================================================= */}
          {/* EMPTY CART */}
          {/* ================================================= */}

          {cartItems.length === 0 ? (

            <div className="text-center py-24">

              <div className="text-5xl mb-6">
                🛍️
              </div>

              <h2 className="
                font-serif
                text-3xl
                text-[#241f1d]
              ">
                Your cart is empty
              </h2>

              <p className="
                text-[#827872]
                mt-3
              ">
                Looks like you haven't added anything yet.
              </p>

              <Link
                to="/shop"
                className="
                  inline-block
                  mt-7
                  px-8
                  py-3
                  rounded-full
                  bg-[#241f1d]
                  text-white
                  text-sm
                  hover:bg-[#bd6670]
                  transition
                "
              >
                Continue Shopping
              </Link>

            </div>

          ) : (

            <div className="
              grid
              lg:grid-cols-[1fr_380px]
              gap-10
            ">

              {/* ================================================= */}
              {/* CART ITEMS */}
              {/* ================================================= */}

              <div className="space-y-5">

                {cartItems.map((item) => (

                  <div
                    key={item.id}
                    className="
                      bg-white/50
                      border
                      border-[#e2dad2]
                      rounded-2xl
                      p-5
                      sm:p-6
                    "
                  >

                    <div className="
                      flex
                      gap-5
                    ">

                      {/* ================================================= */}
                      {/* IMAGE */}
                      {/* ================================================= */}

                      <div className="
                        w-28
                        h-36
                        sm:w-36
                        sm:h-44
                        shrink-0
                        rounded-xl
                        bg-[#eee7df]
                        overflow-hidden
                        flex
                        items-center
                        justify-center
                      ">

                        {item.image ? (

                          <img
                            src={item.image}
                            alt={item.name}
                            className="
                              w-full
                              h-full
                              object-cover
                            "
                          />

                        ) : (

                          <div className="
                            text-center
                            px-2
                          ">

                            <p className="
                              font-serif
                              text-xl
                              text-[#241f1d]
                            ">
                              RESHAA
                            </p>

                            <p className="
                              text-[9px]
                              tracking-[0.2em]
                              uppercase
                              text-[#827872]
                              mt-2
                            ">
                              {item.name}
                            </p>

                          </div>

                        )}

                      </div>


                      {/* ================================================= */}
                      {/* PRODUCT INFORMATION */}
                      {/* ================================================= */}

                      <div className="flex-1 min-w-0">

                        {/* CATEGORY */}

                        <p className="
                          text-xs
                          tracking-[0.15em]
                          uppercase
                          text-[#827872]
                        ">
                          {item.category}
                        </p>


                        {/* PRODUCT NAME */}

                        <h2 className="
                          font-serif
                          text-2xl
                          text-[#241f1d]
                          mt-2
                        ">
                          {item.name}
                        </h2>

                         <h2 className="
  font-serif
  text-2xl
  text-[#241f1d]
  mt-2
">
  {item.name}
</h2>

{item.custom && (
  <p className="
    inline-block
    mt-2
    px-3
    py-1
    rounded-full
    bg-[#dfe7dc]
    text-[#52604d]
    text-[10px]
    tracking-[0.15em]
    uppercase
  ">
    Custom Design
  </p>
)}
                        {/* COLOUR */}

                        {item.color?.name && (

                          <p className="
                            text-sm
                            text-[#827872]
                            mt-3
                          ">
                            Colour: {item.color.name}
                          </p>

                        )}


                        {/* SIZE */}

                        {item.size && (

                          <p className="
                            text-sm
                            text-[#827872]
                            mt-1
                          ">
                            Size: {item.size}
                          </p>

                        )}
                        {item.custom && item.customization && (
  <div className="
    mt-4
    rounded-xl
    bg-[#f4f1eb]
    p-4
    text-sm
    text-[#665f5b]
  ">

    <p className="
      text-[10px]
      tracking-[0.15em]
      uppercase
      text-[#827872]
      mb-2
    ">
      Customization
    </p>

    {item.customization.designType && (
      <p className="mb-1">
        <span className="text-[#827872]">
          Type:
        </span>{" "}
        {item.customization.designType}
      </p>
    )}

    {item.customization.text && (
      <p className="mb-1">
        <span className="text-[#827872]">
          Text:
        </span>{" "}
        {item.customization.text}
      </p>
    )}

    {item.customization.font && (
      <p className="mb-1">
        <span className="text-[#827872]">
          Font:
        </span>{" "}
        {item.customization.font}
      </p>
    )}

    {item.customization.vibe && (
      <p className="mb-1">
        <span className="text-[#827872]">
          Vibe:
        </span>{" "}
        {item.customization.vibe}
      </p>
    )}

    {item.customization.placement && (
      <p className="mb-1">
        <span className="text-[#827872]">
          Placement:
        </span>{" "}
        {item.customization.placement}
      </p>
    )}

    {item.customization.idea && (
      <p className="mb-1">
        <span className="text-[#827872]">
          Idea:
        </span>{" "}
        {item.customization.idea}
      </p>
    )}

    {item.customization.important && (
      <p>
        <span className="text-[#827872]">
          Note:
        </span>{" "}
        {item.customization.important}
      </p>
    )}

  </div>
)}

                        {/* PRICE */}

                        <p className="
                          text-base
                          font-medium
                          text-[#241f1d]
                          mt-4
                        ">
                          ₹{Number(item.price) || 0}
                        </p>


                        {/* ================================================= */}
                        {/* QUANTITY + REMOVE */}
                        {/* ================================================= */}

                        <div className="
                          flex
                          flex-wrap
                          items-center
                          gap-4
                          mt-4
                        ">

                          {/* QUANTITY */}

                          <div className="
                            inline-flex
                            items-center
                            border
                            border-[#cec6be]
                            rounded-lg
                            overflow-hidden
                          ">

                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(
                                  item.id,
                                  item.quantity - 1
                                )
                              }
                              disabled={item.quantity <= 1}
                              className="
                                w-9
                                h-9
                                hover:bg-[#eee7df]
                                transition
                                disabled:opacity-40
                              "
                            >
                              −
                            </button>

                            <span className="
                              w-9
                              text-center
                              text-sm
                            ">
                              {item.quantity}
                            </span>

                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(
                                  item.id,
                                  item.quantity + 1
                                )
                              }
                              className="
                                w-9
                                h-9
                                hover:bg-[#eee7df]
                                transition
                              "
                            >
                              +
                            </button>

                          </div>


                          {/* REMOVE */}

                          <button
                            type="button"
                            onClick={() =>
                              removeItem(item.id)
                            }
                            className="
                              text-xs
                              text-[#bd6670]
                              underline
                              hover:text-[#241f1d]
                              transition
                            "
                          >
                            Remove
                          </button>

                        </div>

                      </div>

                    </div>

                  </div>

                ))}

              </div>


              {/* ================================================= */}
              {/* ORDER SUMMARY */}
              {/* ================================================= */}

              <div className="
                lg:sticky
                lg:top-24
                h-fit
                bg-white/60
                border
                border-[#e2dad2]
                rounded-2xl
                p-6
                sm:p-8
              ">

                <h2 className="
                  font-serif
                  text-3xl
                  text-[#241f1d]
                ">
                  Order Summary
                </h2>


                {/* SUBTOTAL */}

                <div className="
                  flex
                  justify-between
                  mt-8
                  text-sm
                  text-[#665f5b]
                ">

                  <span>
                    Subtotal
                  </span>

                  <span>
                    ₹{subtotal}
                  </span>

                </div>


                {/* SHIPPING */}

                <div className="
                  flex
                  justify-between
                  mt-4
                  text-sm
                  text-[#665f5b]
                  gap-4
                ">

                  <span>
                    Shipping
                  </span>

                  <span className="text-right">
                    Calculated at checkout
                  </span>

                </div>


                {/* TOTAL */}

                <div className="
                  border-t
                  border-[#ded7cf]
                  mt-6
                  pt-6
                  flex
                  justify-between
                ">

                  <span className="
                    font-medium
                    text-[#241f1d]
                  ">
                    Total
                  </span>

                  <span className="
                    font-medium
                    text-[#241f1d]
                  ">
                    ₹{subtotal}
                  </span>

                </div>


                {/* CHECKOUT */}

                <Link
                  to="/checkout"
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
                    transition
                    flex
                    items-center
                    justify-center
                  "
                >
                  PROCEED TO CHECKOUT →
                </Link>


                {/* CONTINUE SHOPPING */}

                <Link
                  to="/shop"
                  className="
                    block
                    text-center
                    mt-5
                    text-sm
                    text-[#665f5b]
                    underline
                    hover:text-[#bd6670]
                    transition
                  "
                >
                  Continue Shopping
                </Link>

              </div>

            </div>

          )}

        </div>

      </section>

    </main>
  );
}

export default Cart;