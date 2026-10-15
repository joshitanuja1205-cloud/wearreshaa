import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

function ProductDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");

  const [quantity, setQuantity] = useState(1);

  const [sizeError, setSizeError] = useState("");
  const [cartMessage, setCartMessage] = useState("");

  // =====================================================
  // FETCH PRODUCT
  // =====================================================

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get(`/products/slug/${slug}`);
        if (response.data.success) {
          const backendProduct = response.data.product;

          setProduct(backendProduct);

          // Select first available color
          if (backendProduct.colors?.length > 0) {
            setSelectedColor(backendProduct.colors[0]);
          }
        }
      } catch (error) {
        console.error("Failed to fetch product:", error);

        setError(
          error.response?.data?.message ||
            "Product could not be loaded."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  // =====================================================
  // WISHLIST
  // =====================================================

  const [isWishlisted, setIsWishlisted] = useState(() => {
    const wishlist =
      JSON.parse(localStorage.getItem("reshAA-wishlist")) || [];

    return wishlist.some((item) => item.slug === slug);
  });

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <main className="bg-[#f8f6f0] min-h-screen flex items-center justify-center">
        <div className="text-center">

          <p
            className="
              font-serif
              text-4xl
              text-[#241f1d]
            "
          >
            RESHAA
          </p>

          <p className="mt-3 text-sm text-[#827872]">
            Loading product...
          </p>

        </div>
      </main>
    );
  }

  // =====================================================
  // PRODUCT ERROR
  // =====================================================

  if (error || !product) {
    return (
      <div className="min-h-screen bg-[#f8f6f0] flex items-center justify-center">

        <div className="text-center">

          <h1 className="font-serif text-4xl text-[#241f1d]">
            Product not found
          </h1>

          <p className="mt-3 text-[#827872]">
            {error || "This product doesn't exist."}
          </p>

          <button
            type="button"
            onClick={() => navigate("/shop")}
            className="
              inline-block
              mt-5
              px-6
              py-3
              rounded-full
              bg-[#241f1d]
              text-white
            "
          >
            Back to Shop
          </button>

        </div>

      </div>
    );
  }

  // =====================================================
  // QUANTITY
  // =====================================================

  const decreaseQuantity = () => {
    setQuantity((current) => Math.max(1, current - 1));
  };

  const increaseQuantity = () => {
    setQuantity((current) => current + 1);
  };

  // =====================================================
  // WISHLIST
  // =====================================================

  const handleWishlist = () => {
    const wishlist =
      JSON.parse(localStorage.getItem("reshAA-wishlist")) || [];

    const alreadyExists = wishlist.some(
      (item) => item.slug === product.slug
    );

    let updatedWishlist;

    if (alreadyExists) {
      updatedWishlist = wishlist.filter(
        (item) => item.slug !== product.slug
      );

      setIsWishlisted(false);
    } else {
      const wishlistItem = {
        id: product._id,
        slug: product.slug,
        name: product.name,
        price: product.price,
        category: product.category,
      };

      updatedWishlist = [
        ...wishlist,
        wishlistItem,
      ];

      setIsWishlisted(true);
    }

    localStorage.setItem(
      "reshAA-wishlist",
      JSON.stringify(updatedWishlist)
    );

    window.dispatchEvent(
      new Event("wishlistUpdated")
    );
  };

  // =====================================================
  // ADD TO CART
  // =====================================================

  const handleAddToCart = () => {
  if (!selectedSize) {
    setSizeError("Please select a size.");
    return;
  }

  if (!selectedColor) {
    setSizeError("Please select a colour.");
    return;
  }

  setSizeError("");
  setCartMessage("");

  try {
    const existingCart =
      JSON.parse(localStorage.getItem("reshAA-cart")) || [];

    const newItem = {
      id: `${product._id}-${selectedSize}-${selectedColor.name}`,
      productId: product._id,
      name: product.name,
      price: product.price,
      image: product.images?.[0] || "",
      category: product.category,
      size: selectedSize,
      color: {
        name: selectedColor.name,
        hex: selectedColor.hex,
      },
      quantity,
    };

    const existingIndex = existingCart.findIndex(
      (item) => item.id === newItem.id
    );

    let updatedCart;

    if (existingIndex !== -1) {
      updatedCart = [...existingCart];

      updatedCart[existingIndex].quantity += quantity;
    } else {
      updatedCart = [...existingCart, newItem];
    }

    localStorage.setItem(
      "reshAA-cart",
      JSON.stringify(updatedCart)
    );

    window.dispatchEvent(new Event("cartUpdated"));

    setCartMessage("Added to cart successfully.");

  } catch (error) {
    console.error("Add to cart error:", error);

    setCartMessage("Unable to add product to cart.");
  }
};

  // =====================================================
  // BUY NOW
  // =====================================================

  const handleBuyNow = () => {
  if (!selectedSize) {
    setSizeError("Please select a size.");
    return;
  }

  if (!selectedColor) {
    setSizeError("Please select a colour.");
    return;
  }

  setSizeError("");

  try {
    const existingCart =
      JSON.parse(localStorage.getItem("reshAA-cart")) || [];

    const newItem = {
      id: `${product._id}-${selectedSize}-${selectedColor.name}`,
      productId: product._id,
      name: product.name,
      price: product.price,
      image: product.images?.[0] || "",
      category: product.category,
      size: selectedSize,
      color: {
        name: selectedColor.name,
        hex: selectedColor.hex,
      },
      quantity,
    };

    const existingIndex = existingCart.findIndex(
      (item) => item.id === newItem.id
    );

    let updatedCart;

    if (existingIndex !== -1) {
      updatedCart = [...existingCart];

      updatedCart[existingIndex].quantity += quantity;
    } else {
      updatedCart = [
        ...existingCart,
        newItem,
      ];
    }

    localStorage.setItem(
      "reshAA-cart",
      JSON.stringify(updatedCart)
    );

    window.dispatchEvent(
      new Event("cartUpdated")
    );

    navigate("/checkout");
  } catch (error) {
    console.error("Buy now error:", error);

    setCartMessage("Unable to continue.");
  }
};
  // =====================================================
  // IMAGE
  // =====================================================

  const productImage =
    product.images?.length > 0
      ? product.images[0]
      : null;

  // =====================================================
  // MAIN UI
  // =====================================================

  return (
    <main className="bg-[#f8f6f0] min-h-screen">

      {/* ================= PRODUCT SECTION ================= */}

      <section
        className="
          max-w-7xl
          mx-auto
          px-5
          sm:px-8
          lg:px-12
          py-10
          sm:py-14
          lg:py-20
        "
      >

        <div
          className="
            grid
            lg:grid-cols-2
            gap-10
            lg:gap-16
          "
        >

          {/* ================= IMAGE ================= */}

          <div className="relative">

            <div
              className="
                relative
                aspect-[4/5]
                overflow-hidden
                rounded-2xl
                bg-[#ebe6df]
              "
            >

              {productImage ? (

                <img
                  src={productImage}
                  alt={product.name}
                  className="
                    w-full
                    h-full
                    object-cover
                  "
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

                  <div className="text-center px-6">

                    <p
                      className="
                        font-serif
                        text-3xl
                        sm:text-4xl
                        text-[#241f1d]
                      "
                    >
                      RESHAA
                    </p>

                    <p
                      className="
                        text-xs
                        tracking-[0.25em]
                        uppercase
                        text-[#827872]
                        mt-3
                      "
                    >
                      Product Image
                    </p>

                  </div>

                </div>

              )}

              {/* WISHLIST */}

              <button
                type="button"
                onClick={handleWishlist}
                aria-label={
                  isWishlisted
                    ? "Remove from wishlist"
                    : "Add to wishlist"
                }
                className="
                  absolute
                  top-4
                  right-4
                  w-11
                  h-11
                  rounded-full
                  bg-white/90
                  backdrop-blur-sm
                  flex
                  items-center
                  justify-center
                  text-xl
                  hover:scale-110
                  transition
                  shadow-sm
                "
              >
                {isWishlisted ? (
                  <span className="text-[#bd6670]">
                    ♥
                  </span>
                ) : (
                  <span className="text-[#241f1d]">
                    ♡
                  </span>
                )}
              </button>

            </div>

          </div>

          {/* ================= PRODUCT INFO ================= */}

          <div className="flex flex-col justify-center">

            {/* CATEGORY */}

            <p
              className="
                text-xs
                uppercase
                tracking-[0.25em]
                text-[#947b76]
                mb-3
              "
            >
              {product.category}
            </p>

            {/* NAME */}

            <h1
              className="
                font-serif
                text-4xl
                sm:text-5xl
                lg:text-6xl
                text-[#241f1d]
                leading-tight
              "
            >
              {product.name}
            </h1>

            {/* PRICE */}

            <p
              className="
                text-xl
                sm:text-2xl
                mt-5
                text-[#241f1d]
              "
            >
              ₹{product.price}
            </p>

            {/* DESCRIPTION */}

            <p
              className="
                mt-5
                text-sm
                sm:text-base
                leading-7
                text-[#6d625d]
                max-w-lg
              "
            >
              {product.description}
            </p>

            <div
              className="
                h-px
                bg-[#ded7cf]
                my-7
              "
            />

            {/* ================= COLOR ================= */}

            {product.colors?.length > 0 && (

              <div>

                <div
                  className="
                    flex
                    items-center
                    justify-between
                  "
                >

                  <h3
                    className="
                      text-sm
                      font-medium
                      text-[#241f1d]
                    "
                  >
                    Colour
                  </h3>

                  <span
                    className="
                      text-sm
                      text-[#786d68]
                    "
                  >
                    {selectedColor?.name}
                  </span>

                </div>

                <div
                  className="
                    flex
                    gap-3
                    mt-4
                  "
                >

                  {product.colors.map((color) => (

                    <button
                      key={color.name}
                      type="button"
                      onClick={() =>
                        setSelectedColor(color)
                      }
                      aria-label={`Select ${color.name}`}
                      className={`
                        w-9
                        h-9
                        rounded-full
                        border-2
                        transition

                        ${
                          selectedColor?.name === color.name
                            ? "border-[#241f1d] scale-110"
                            : "border-[#d7d0c9]"
                        }
                      `}
                      style={{
                        backgroundColor: color.hex,
                      }}
                    />

                  ))}

                </div>

              </div>

            )}

            {/* ================= SIZE ================= */}

            <div className="mt-7">

              <div
                className="
                  flex
                  items-center
                  justify-between
                "
              >

                <h3
                  className="
                    text-sm
                    font-medium
                    text-[#241f1d]
                  "
                >
                  Size
                </h3>

                <button
                  type="button"
                  className="
                    text-xs
                    underline
                    text-[#786d68]
                  "
                >
                  Size Guide
                </button>

              </div>

              <div
                className="
                  grid
                  grid-cols-5
                  gap-2
                  mt-4
                "
              >

                {product.sizes?.map((size) => (

                  <button
                    key={size}
                    type="button"
                    onClick={() => {
                      setSelectedSize(size);
                      setSizeError("");
                    }}
                    className={`
                      h-11
                      rounded-lg
                      border
                      text-sm
                      transition

                      ${
                        selectedSize === size
                          ? "bg-[#241f1d] text-white border-[#241f1d]"
                          : "bg-transparent text-[#241f1d] border-[#cfc7bf] hover:border-[#241f1d]"
                      }
                    `}
                  >
                    {size}
                  </button>

                ))}

              </div>

              {sizeError && (
                <p
                  className="
                    text-sm
                    text-[#bd6670]
                    mt-3
                  "
                >
                  {sizeError}
                </p>
              )}

            </div>

            {/* ================= QUANTITY ================= */}

            <div className="mt-7">

              <h3
                className="
                  text-sm
                  font-medium
                  text-[#241f1d]
                "
              >
                Quantity
              </h3>

              <div
                className="
                  mt-4
                  inline-flex
                  items-center
                  border
                  border-[#cfc7bf]
                  rounded-lg
                  overflow-hidden
                "
              >

                <button
                  type="button"
                  onClick={decreaseQuantity}
                  className="
                    w-11
                    h-11
                    hover:bg-[#eee8e1]
                    transition
                  "
                >
                  −
                </button>

                <span
                  className="
                    w-11
                    text-center
                    text-sm
                  "
                >
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={increaseQuantity}
                  className="
                    w-11
                    h-11
                    hover:bg-[#eee8e1]
                    transition
                  "
                >
                  +
                </button>

              </div>

            </div>

            {/* ================= BUTTONS ================= */}

            <div
              className="
                grid
                sm:grid-cols-2
                gap-3
                mt-8
              "
            >

              <button
                type="button"
                onClick={handleAddToCart}
                className="
                  h-14
                  rounded-full
                  border
                  border-[#241f1d]
                  text-[#241f1d]
                  font-medium
                  hover:bg-[#241f1d]
                  hover:text-white
                  transition
                "
              >
                ADD TO CART
              </button>

              <button
                type="button"
                onClick={handleBuyNow}
                className="
                  h-14
                  rounded-full
                  bg-[#bd6670]
                  text-white
                  font-medium
                  hover:bg-[#a95560]
                  transition
                "
              >
                BUY NOW →
              </button>

            </div>

            {/* CART MESSAGE */}

            {cartMessage && (
              <p
                className="
                  mt-4
                  text-sm
                  text-[#bd6670]
                "
              >
                {cartMessage}
              </p>
            )}

            {/* ================= PRODUCT DETAILS ================= */}

            <div
              className="
                mt-10
                border-t
                border-[#ded7cf]
              "
            >

              <div
                className="
                  py-5
                  border-b
                  border-[#ded7cf]
                "
              >

                <div
                  className="
                    flex
                    justify-between
                    text-sm
                    text-[#241f1d]
                  "
                >

                  <span>
                    Fabric
                  </span>

                  <span className="text-[#756b66]">
                    {product.material || "Premium Cotton"}
                  </span>

                </div>

              </div>

              <div
                className="
                  py-5
                  border-b
                  border-[#ded7cf]
                "
              >

                <div
                  className="
                    flex
                    justify-between
                    text-sm
                    text-[#241f1d]
                  "
                >

                  <span>
                    GSM
                  </span>

                  <span className="text-[#756b66]">
                    {product.gsm || "—"}
                  </span>

                </div>

              </div>

              <div
                className="
                  py-5
                  border-b
                  border-[#ded7cf]
                "
              >

                <div
                  className="
                    flex
                    justify-between
                    text-sm
                    text-[#241f1d]
                  "
                >

                  <span>
                    Fit
                  </span>

                  <span className="text-[#756b66]">
                    {product.fit || "—"}
                  </span>

                </div>

              </div>

              <div className="py-5">

                <h3
                  className="
                    text-sm
                    font-medium
                    text-[#241f1d]
                    mb-4
                  "
                >
                  Product Details
                </h3>

                <ul
                  className="
                    space-y-2
                    text-sm
                    text-[#756b66]
                  "
                >

                  <li className="flex gap-2">
                    <span>✦</span>
                    <span>
                      {product.gsm || 240} GSM premium fabric
                    </span>
                  </li>

                  <li className="flex gap-2">
                    <span>✦</span>
                    <span>
                      {product.fit || "Premium"} fit
                    </span>
                  </li>

                  <li className="flex gap-2">
                    <span>✦</span>
                    <span>
                      {product.material || "100% Cotton"}
                    </span>
                  </li>

                  <li className="flex gap-2">
                    <span>✦</span>
                    <span>
                      Designed for everyday wear
                    </span>
                  </li>

                </ul>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ================= CARE SECTION ================= */}

      <section
        className="
          border-t
          border-[#ded7cf]
          bg-[#f1e9e1]
        "
      >

        <div
          className="
            max-w-7xl
            mx-auto
            px-5
            sm:px-8
            lg:px-12
            py-14
            sm:py-20
          "
        >

          <div
            className="
              grid
              sm:grid-cols-3
              gap-8
              text-center
            "
          >

            <div>

              <div className="text-2xl mb-3">
                ◇
              </div>

              <h3 className="font-medium">
                Premium Quality
              </h3>

              <p
                className="
                  text-sm
                  text-[#756b66]
                  mt-2
                "
              >
                240 GSM premium fabric made for everyday wear.
              </p>

            </div>

            <div>

              <div className="text-2xl mb-3">
                ♡
              </div>

              <h3 className="font-medium">
                Made With Love
              </h3>

              <p
                className="
                  text-sm
                  text-[#756b66]
                  mt-2
                "
              >
                Thoughtfully designed for your everyday stories.
              </p>

            </div>

            <div>

              <div className="text-2xl mb-3">
                ✧
              </div>

              <h3 className="font-medium">
                Easy Care
              </h3>

              <p
                className="
                  text-sm
                  text-[#756b66]
                  mt-2
                "
              >
                Wash inside out and follow the care instructions.
              </p>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}

export default ProductDetails;