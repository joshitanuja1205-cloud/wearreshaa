import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import api from "../services/api";

function Shop() {
  const [searchParams] = useSearchParams();

  const categoryFromUrl = searchParams.get("category");

  const [activeCategory, setActiveCategory] = useState(
    categoryFromUrl || "All"
  );
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [wishlist, setWishlist] = useState(() => {
    return JSON.parse(localStorage.getItem("reshAA-wishlist")) || [];
  });

  // =====================================================
  // FETCH PRODUCTS FROM BACKEND
  // =====================================================

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/products");

        if (response.data.success) {
          const backendProducts = response.data.products || [];

          // Convert backend product format
          // into the format this UI already uses
          const formattedProducts = backendProducts.map((product) => ({
            ...product,

            id: product._id,

            image:
              product.images && product.images.length > 0
                ? product.images[0]
                : "",

            colors:
              product.colors?.map((color) => color.hex) || [],

            tag:
              product.tag ||
              `${product.gsm || 0} GSM • ${product.fit || "Premium Fit"}`,

            new: product.isNewArrival,
          }));

          setProducts(formattedProducts);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);

        setError(
          error.response?.data?.message ||
            "Unable to load products."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // =====================================================
  // FILTER PRODUCTS
  // =====================================================

  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter(
          (product) => product.category === activeCategory
        );

  // =====================================================
  // WISHLIST
  // =====================================================

  const toggleWishlist = (product) => {
    const exists = wishlist.some(
      (item) => item.id === product.id
    );

    let updatedWishlist;

    if (exists) {
      updatedWishlist = wishlist.filter(
        (item) => item.id !== product.id
      );
    } else {
      updatedWishlist = [...wishlist, product];
    }

    setWishlist(updatedWishlist);

    localStorage.setItem(
      "reshAA-wishlist",
      JSON.stringify(updatedWishlist)
    );

    window.dispatchEvent(
      new Event("wishlistUpdated")
    );
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <main className="bg-[#f8f6f0] min-h-screen">

        <section className="px-5 sm:px-8 md:px-12 lg:px-20 pt-16 pb-20">

          <p
            className="
              text-xs
              tracking-[0.3em]
              text-[#bd6670]
              uppercase
              mb-4
            "
          >
            RESHAA COLLECTION
          </p>

          <h1
            className="
              font-serif
              text-4xl
              sm:text-5xl
              md:text-7xl
              text-[#241f1d]
            "
          >
            Shop Collection
          </h1>

          <div className="mt-16 text-center">
            <p className="text-[#827872]">
              Loading collection...
            </p>
          </div>

        </section>

      </main>
    );
  }

  // =====================================================
  // ERROR
  // =====================================================

  if (error) {
    return (
      <main className="bg-[#f8f6f0] min-h-screen">

        <section className="px-5 sm:px-8 md:px-12 lg:px-20 pt-16">

          <p
            className="
              text-xs
              tracking-[0.3em]
              text-[#bd6670]
              uppercase
              mb-4
            "
          >
            RESHAA COLLECTION
          </p>

          <h1
            className="
              font-serif
              text-4xl
              sm:text-5xl
              md:text-7xl
              text-[#241f1d]
            "
          >
            Shop Collection
          </h1>

          <div className="text-center py-20">

            <h2
              className="
                font-serif
                text-3xl
                text-[#241f1d]
              "
            >
              Couldn't load products
            </h2>

            <p className="mt-3 text-[#827872]">
              {error}
            </p>

            <button
              onClick={() => window.location.reload()}
              className="
                mt-6
                px-6
                py-3
                rounded-full
                bg-[#241f1d]
                text-white
                hover:bg-[#3a3230]
                transition
              "
            >
              Try Again
            </button>

          </div>

        </section>

      </main>
    );
  }

  // =====================================================
  // MAIN SHOP
  // =====================================================

  return (
    <main className="bg-[#f8f6f0] min-h-screen">

      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <section
        className="
          px-5
          sm:px-8
          md:px-12
          lg:px-20
          pt-10
          sm:pt-14
          md:pt-16
          pb-7
          sm:pb-10
        "
      >

        <p
          className="
            text-[10px]
            sm:text-xs
            md:text-sm
            tracking-[0.25em]
            sm:tracking-[0.3em]
            text-[#bd6670]
            uppercase
            mb-3
            sm:mb-4
          "
        >
          RESHAA COLLECTION
        </p>

        <div
          className="
            flex
            flex-col
            md:flex-row
            md:items-end
            md:justify-between
            gap-3
            md:gap-6
          "
        >

          <div>

            <h1
              className="
                font-serif
                text-4xl
                sm:text-5xl
                md:text-7xl
                text-[#241f1d]
              "
            >
              Shop Collection
            </h1>

            <p
              className="
                mt-2
                sm:mt-4
                text-sm
                md:text-lg
                text-[#665f5b]
              "
            >
              Designed for everyday stories.
            </p>

          </div>

          <p className="text-sm text-[#665f5b]">
            {filteredProducts.length} pieces
          </p>

        </div>

      </section>


      {/* ================================================= */}
      {/* FILTERS */}
      {/* ================================================= */}

      <section
        className="
          px-5
          sm:px-8
          md:px-12
          lg:px-20
          pb-7
          sm:pb-10
        "
      >

        <div
          className="
            flex
            gap-3
            overflow-x-auto
            pb-2
            scrollbar-hide
          "
        >

         {[
  "All",
  "Graphic Tees",
  "Girls",
  "Men",
  "Customized Tees",
].map((category) => (
            <button
              key={category}
              type="button"
              onClick={() =>
                setActiveCategory(category)
              }
              className={`
                whitespace-nowrap
                px-5
                sm:px-6
                py-2.5
                sm:py-3
                rounded-full
                border
                text-sm
                transition
                shrink-0

                ${
                  activeCategory === category
                    ? "bg-[#241f1d] text-white border-[#241f1d]"
                    : "bg-transparent text-[#241f1d] border-[#cfc6be] hover:bg-[#eee7df]"
                }
              `}
            >
              {category}
            </button>

          ))}

        </div>

      </section>


      {/* ================================================= */}
      {/* PRODUCTS */}
      {/* ================================================= */}

      <section
        className="
          px-4
          sm:px-8
          md:px-12
          lg:px-20
          pb-16
          sm:pb-20
        "
      >

        <div
          className="
            grid
            grid-cols-2
            sm:grid-cols-2
            lg:grid-cols-4
            gap-x-3
            sm:gap-x-6
            gap-y-8
            sm:gap-y-12
          "
        >

          {filteredProducts.map((product) => {

            const isWishlisted = wishlist.some(
              (item) => item.id === product.id
            );

            return (

              <article
                key={product.id}
                className="group min-w-0"
              >

                {/* IMAGE */}

                <div
                  className="
                    relative
                    aspect-[4/5]
                    rounded-xl
                    sm:rounded-2xl
                    overflow-hidden
                    bg-[#eeeae5]
                  "
                >

                  {/* NEW */}

                  {product.new && (
                    <span
                      className="
                        absolute
                        top-2
                        left-2
                        sm:top-4
                        sm:left-4
                        z-10
                        bg-[#bd6670]
                        text-white
                        text-[9px]
                        sm:text-xs
                        px-2
                        sm:px-3
                        py-1
                        sm:py-1.5
                        rounded-full
                      "
                    >
                      NEW
                    </span>
                  )}


                  {/* WISHLIST */}

                  <button
                    type="button"
                    onClick={() =>
                      toggleWishlist(product)
                    }
                    aria-label={
                      isWishlisted
                        ? "Remove from wishlist"
                        : "Add to wishlist"
                    }
                    className="
                      absolute
                      top-2
                      right-2
                      sm:top-4
                      sm:right-4
                      z-20
                      w-9
                      h-9
                      sm:w-10
                      sm:h-10
                      rounded-full
                      bg-white/90
                      backdrop-blur-sm
                      flex
                      items-center
                      justify-center
                      text-lg
                      sm:text-xl
                      hover:scale-110
                      transition
                    "
                  >
                    {isWishlisted ? "♥" : "♡"}
                  </button>


                  {/* PRODUCT LINK */}

                  <Link
                    to={`/product/${product.slug}`}
                    className="block w-full h-full"
                  >

                    {product.image ? (

                      <img
                        src={product.image}
                        alt={product.name}
                        className="
                          w-full
                          h-full
                          object-cover
                          group-hover:scale-[1.03]
                          transition
                          duration-500
                        "
                        onError={(event) => {
                          event.currentTarget.style.display =
                            "none";
                        }}
                      />

                    ) : (

                      <div
                        className="
                          w-full
                          h-full
                          flex
                          items-center
                          justify-center
                          bg-[#eee7df]
                        "
                      >

                        <div className="text-center px-4">

                          <p
                            className="
                              font-serif
                              text-xl
                              sm:text-3xl
                              text-[#241f1d]
                            "
                          >
                            RESHAA
                          </p>

                          <p
                            className="
                              text-[8px]
                              sm:text-xs
                              tracking-[0.2em]
                              uppercase
                              text-[#827872]
                              mt-2
                            "
                          >
                            {product.name}
                          </p>

                        </div>

                      </div>

                    )}

                  </Link>

                </div>


                {/* PRODUCT DETAILS */}

                <div className="pt-3 sm:pt-4">

                  <p
                    className="
                      text-[9px]
                      sm:text-xs
                      tracking-[0.12em]
                      sm:tracking-[0.15em]
                      uppercase
                      text-[#827872]
                    "
                  >
                    {product.category}
                  </p>


                  <Link
                    to={`/product/${product.slug}`}
                    className="
                      block
                      text-base
                      sm:text-lg
                      md:text-xl
                      text-[#241f1d]
                      mt-1
                      sm:mt-2
                      hover:text-[#bd6670]
                      transition
                      truncate
                    "
                  >
                    {product.name}
                  </Link>


                  <div
                    className="
                      flex
                      items-center
                      justify-between
                      gap-2
                      mt-1.5
                      sm:mt-2
                    "
                  >

                    <p
                      className="
                        text-sm
                        sm:text-base
                        font-medium
                        text-[#241f1d]
                      "
                    >
                      ₹{product.price}
                    </p>


                    {/* COLORS */}

                    <div
                      className="
                        flex
                        gap-1
                        sm:gap-1.5
                        shrink-0
                      "
                    >

                      {product.colors.map(
                        (color, index) => (

                          <span
                            key={index}
                            className="
                              w-3
                              h-3
                              sm:w-4
                              sm:h-4
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


                  {/* TAG */}

                  <p
                    className="
                      text-[9px]
                      sm:text-xs
                      text-[#827872]
                      mt-1.5
                      sm:mt-2
                      truncate
                    "
                  >
                    {product.tag}
                  </p>

                </div>

              </article>

            );
          })}

        </div>


        {/* ================================================= */}
        {/* NO PRODUCTS */}
        {/* ================================================= */}

        {filteredProducts.length === 0 && (

          <div className="text-center py-20">

            <h2
              className="
                font-serif
                text-3xl
                text-[#241f1d]
              "
            >
              No products yet
            </h2>

            <p className="mt-3 text-[#827872]">
              New pieces are coming soon.
            </p>

          </div>

        )}

      </section>

    </main>
  );
}

export default Shop;