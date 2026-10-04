import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  // Load wishlist
  const loadWishlist = () => {
    const saved = localStorage.getItem("reshAA-wishlist");

    if (saved) {
      setWishlist(JSON.parse(saved));
    } else {
      setWishlist([]);
    }
  };

  useEffect(() => {
    loadWishlist();

    window.addEventListener("wishlistUpdated", loadWishlist);

    return () => {
      window.removeEventListener(
        "wishlistUpdated",
        loadWishlist
      );
    };
  }, []);

  // Remove product
  const removeFromWishlist = (productId) => {
    const updatedWishlist = wishlist.filter(
      (product) => product.id !== productId
    );

    setWishlist(updatedWishlist);

    localStorage.setItem(
      "reshAA-wishlist",
      JSON.stringify(updatedWishlist)
    );

    window.dispatchEvent(
      new Event("wishlistUpdated")
    );
  };

  return (
    <main className="min-h-screen bg-[#f8f6f0]">

      {/* ================= HEADER ================= */}

      <section className="px-6 md:px-12 lg:px-20 pt-16 pb-12">

        <p className="text-xs md:text-sm tracking-[0.3em] text-[#bd6670] uppercase mb-4">
          RESHAA
        </p>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">

          <div>

            <h1 className="font-serif text-5xl md:text-7xl text-[#241f1d]">
              Your Wishlist
            </h1>

            <p className="mt-4 text-[#665f5b] text-base md:text-lg">
              Pieces you love, saved for later.
            </p>

          </div>

          <p className="text-sm text-[#665f5b]">
            {wishlist.length}{" "}
            {wishlist.length === 1 ? "item" : "items"}
          </p>

        </div>

      </section>


      {/* ================= EMPTY WISHLIST ================= */}

      {wishlist.length === 0 ? (

        <section className="px-6 md:px-12 lg:px-20 pb-24">

          <div className="
            min-h-[400px]
            rounded-3xl
            border
            border-[#ded7cf]
            flex
            items-center
            justify-center
            text-center
            px-6
          ">

            <div>

              <div className="text-5xl mb-6">
                ♡
              </div>

              <h2 className="
                font-serif
                text-3xl
                md:text-4xl
                text-[#241f1d]
              ">
                Your wishlist is empty
              </h2>

              <p className="
                mt-4
                text-[#756b66]
                max-w-md
                mx-auto
              ">
                Save the pieces you love and come back to them
                whenever you're ready.
              </p>

              <Link
                to="/shop"
                className="
                  inline-flex
                  items-center
                  justify-center
                  mt-8
                  px-8
                  py-4
                  rounded-full
                  bg-[#241f1d]
                  text-white
                  text-sm
                  hover:bg-[#3a3330]
                  transition
                "
              >
                EXPLORE COLLECTION →
              </Link>

            </div>

          </div>

        </section>

      ) : (

        /* ================= WISHLIST PRODUCTS ================= */

        <section className="
          px-6
          md:px-12
          lg:px-20
          pb-24
        ">

          <div className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-4
            gap-x-6
            gap-y-12
          ">

            {wishlist.map((product) => (

              <article
                key={product.id}
                className="group"
              >

                {/* IMAGE */}

                <div className="
                  relative
                  aspect-[4/5]
                  rounded-2xl
                  overflow-hidden
                  bg-[#eeeae5]
                ">

                  {/* REMOVE BUTTON */}

                  <button
                    type="button"
                    onClick={() =>
                      removeFromWishlist(product.id)
                    }
                    aria-label="Remove from wishlist"
                    className="
                      absolute
                      top-4
                      right-4
                      z-20
                      w-10
                      h-10
                      rounded-full
                      bg-white/90
                      flex
                      items-center
                      justify-center
                      text-xl
                      hover:scale-110
                      transition
                    "
                  >
                    ♥
                  </button>


                  {/* PRODUCT LINK */}

                  <Link
                    to={`/product/${product.slug}`}
                    className="block w-full h-full"
                  >

                    <div className="
                      w-full
                      h-full
                      flex
                      items-center
                      justify-center
                      bg-[#eee7df]
                    ">

                      <div className="text-center px-4">

                        <p className="
                          font-serif
                          text-3xl
                          text-[#241f1d]
                        ">
                          RESHAA
                        </p>

                        <p className="
                          text-xs
                          tracking-[0.25em]
                          uppercase
                          text-[#827872]
                          mt-3
                        ">
                          {product.name}
                        </p>

                      </div>

                    </div>

                  </Link>

                </div>


                {/* PRODUCT INFO */}

                <div className="pt-4">

                  <p className="
                    text-xs
                    tracking-[0.15em]
                    uppercase
                    text-[#827872]
                  ">
                    {product.category}
                  </p>


                  <Link
                    to={`/product/${product.slug}`}
                    className="
                      inline-block
                      text-lg
                      md:text-xl
                      text-[#241f1d]
                      mt-2
                      hover:text-[#bd6670]
                      transition
                    "
                  >
                    {product.name}
                  </Link>


                  <div className="
                    flex
                    items-center
                    justify-between
                    mt-2
                  ">

                    <p className="
                      text-base
                      font-medium
                      text-[#241f1d]
                    ">
                      ₹{product.price}
                    </p>


                    {/* COLORS */}

                    <div className="
                      flex
                      gap-1.5
                    ">

                      {product.colors?.map(
                        (color, index) => (

                          <span
                            key={index}
                            className="
                              w-4
                              h-4
                              rounded-full
                              border
                              border-black/10
                            "
                            style={{
                              backgroundColor: color,
                            }}
                          />

                        )
                      )}

                    </div>

                  </div>


                  <p className="
                    text-xs
                    text-[#827872]
                    mt-2
                  ">
                    {product.tag}
                  </p>


                  {/* VIEW PRODUCT */}

                  <Link
                    to={`/product/${product.slug}`}
                    className="
                      inline-block
                      mt-5
                      text-sm
                      underline
                      underline-offset-4
                      text-[#241f1d]
                      hover:text-[#bd6670]
                      transition
                    "
                  >
                    View Product →
                  </Link>

                </div>

              </article>

            ))}

          </div>

        </section>

      )}

    </main>
  );
}

export default Wishlist;