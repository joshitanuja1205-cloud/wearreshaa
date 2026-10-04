import products from "../data/products";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";

function ProductSection() {
  return (
    <section className="bg-[#f8f3ed] py-20 sm:py-24 lg:py-28">

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">

        {/* ================= HEADER ================= */}

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">

          <div>

            {/* SMALL LABEL */}

            <div className="flex items-center gap-3 mb-5">

              <span
                className="
                  text-[11px]
                  sm:text-xs
                  tracking-[0.35em]
                  uppercase
                  text-[#a07878]
                "
              >
                Just In
              </span>

              <span className="text-[#bd6670] text-lg">
                ✦
              </span>

            </div>


            {/* TITLE */}

            <h2
              className="
                font-serif
                text-5xl
                sm:text-6xl
                md:text-7xl
                lg:text-[5.5rem]
                leading-[0.9]
                tracking-[-0.03em]
                text-[#241f1d]
              "
            >
              New Arrivals
            </h2>


            {/* DESCRIPTION */}

            <p
              className="
                mt-5
                text-sm
                sm:text-base
                text-[#756b66]
                max-w-md
                leading-7
              "
            >
              Fresh designs, thoughtful details and pieces
              made to become part of your everyday story.
            </p>

          </div>


          {/* SHOP ALL */}

          <Link
            to="/shop"
            className="
              hidden
              sm:inline-flex
              items-center
              gap-3
              text-xs
              tracking-[0.18em]
              font-medium
              text-[#241f1d]
              group
            "
          >

            <span
              className="
                border-b
                border-[#241f1d]
                pb-2
                group-hover:border-[#bd6670]
                group-hover:text-[#bd6670]
                transition
              "
            >
              SHOP ALL
            </span>

            <span
              className="
                text-lg
                group-hover:translate-x-1
                transition-transform
              "
            >
              →
            </span>

          </Link>

        </div>


        {/* ================= DECORATIVE LINE ================= */}

        <div className="mt-12 mb-10">

          <div className="h-px bg-[#ded4cc]" />

          <div className="
            flex
            justify-between
            items-center
            mt-3
            text-[10px]
            uppercase
            tracking-[0.25em]
            text-[#9b8f88]
          ">

            <span>RESHAA COLLECTION</span>

            <span>01 — 04</span>

          </div>

        </div>


        {/* ================= PRODUCTS ================= */}

        <div
          className="
            grid
            grid-cols-2
            lg:grid-cols-4
            gap-x-4
            sm:gap-x-6
            lg:gap-x-7
            gap-y-12
          "
        >

          {products.slice(0, 4).map((product, index) => (

            <div
              key={product.id}
              className="group"
            >

              {/* PRODUCT NUMBER */}

              <div
                className="
                  flex
                  items-center
                  justify-between
                  mb-3
                  text-[10px]
                  uppercase
                  tracking-[0.2em]
                  text-[#9b8f88]
                "
              >

                <span>
                  0{index + 1}
                </span>

                <span>
                  RESHAA
                </span>

              </div>


              <ProductCard
                product={product}
              />

            </div>

          ))}

        </div>


        {/* ================= MOBILE SHOP ALL ================= */}

        <div className="sm:hidden flex justify-center mt-12">

          <Link
            to="/shop"
            className="
              inline-flex
              items-center
              gap-3
              px-7
              py-3
              rounded-full
              border
              border-[#241f1d]
              text-xs
              tracking-[0.15em]
              font-medium
              text-[#241f1d]
              hover:bg-[#241f1d]
              hover:text-white
              transition
            "
          >
            SHOP ALL
            <span>→</span>
          </Link>

        </div>


        {/* ================= BOTTOM STATEMENT ================= */}

        <div
          className="
            mt-20
            sm:mt-24
            pt-8
            border-t
            border-[#ded4cc]
            flex
            flex-col
            sm:flex-row
            sm:items-center
            sm:justify-between
            gap-4
          "
        >

          <p
            className="
              font-serif
              text-2xl
              sm:text-3xl
              text-[#241f1d]
            "
          >
            Made for the moments
            <span className="text-[#bd6670]"> ✦ </span>
            that matter.
          </p>

          <p
            className="
              text-xs
              uppercase
              tracking-[0.2em]
              text-[#9b8f88]
            "
          >
            Every thread has a tale.
          </p>

        </div>

      </div>

    </section>
  );
}

export default ProductSection;