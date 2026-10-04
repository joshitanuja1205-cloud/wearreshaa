import { Link } from "react-router-dom";
import wearStoryImage from "../assets/image copy 2.png";
import logo from "../assets/image.png";

function Hero() {
  return (
    <section className="bg-[#f8f3ed] text-[#241f1d]">

      {/* ================= BLACK LOGO STRIP ================= */}

      <div
        className="
          w-full
          h-20
          sm:h-24
          md:h-32
          bg-black
          flex
          items-center
          justify-center
        "
      >
        <img
          src={logo}
          alt="Reshaa logo"
          className="
            h-14
            sm:h-16
            md:h-28
            w-auto
            object-contain
          "
        />
      </div>


      {/* ================= HERO ================= */}

      <div
        className="
          max-w-7xl
          mx-auto
          grid
          grid-cols-1
          md:grid-cols-2
        "
      >

        {/* ================= LEFT SIDE ================= */}

        <div
          className="
            flex
            items-center
            px-6
            py-12
            sm:px-10
            sm:py-16
            md:px-14
            md:py-20
            lg:px-20
            lg:min-h-[650px]
          "
        >

          <div className="max-w-xl w-full">

            {/* EYEBROW */}

            <p
              className="
                hero-fade
                text-xs
                sm:text-sm
                uppercase
                tracking-[0.35em]
                text-[#8b7370]
                mb-7
              "
            >
              More Than Just Clothing
            </p>


            {/* HEADING */}

            <h1
              className="
                hero-fade
                hero-fade-delay-1
                font-serif
                text-5xl
                sm:text-6xl
                md:text-7xl
                lg:text-8xl
                leading-[0.9]
                tracking-tight
              "
            >
              Every
              <br />
              Thread
              <br />
              Has a{" "}
              <span className="hero-tale italic text-[#c56d75]">
                Tale.
              </span>
            </h1>


            {/* DESCRIPTION */}

            <p
              className="
                hero-fade
                hero-fade-delay-2
                mt-8
                text-base
                sm:text-lg
                md:text-xl
                text-[#514846]
                leading-relaxed
                max-w-md
              "
            >
              Not just clothing.
              <br />
              A part of your journey.
            </p>


            {/* ================= BUTTONS ================= */}

            <div
              className="
                hero-fade
                hero-fade-delay-3
                mt-10
                flex
                flex-col
                sm:flex-row
                gap-4
              "
            >

              {/* SHOP COLLECTION */}

              <Link
                to="/shop"
                className="
                  inline-flex
                  items-center
                  justify-center
                  rounded-full
                  bg-[#c56d75]
                  text-white
                  px-6
                  py-4
                  sm:px-7
                  text-sm
                  font-medium
                  transition-all
                  duration-300
                  hover:bg-[#b45d66]
                  hover:scale-[1.02]
                "
              >
                SHOP COLLECTION →
              </Link>


              {/* CUSTOMIZE YOUR TEE */}

              <Link
                to="/customize"
                className="
                  inline-flex
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[#241f1d]
                  px-6
                  py-4
                  sm:px-7
                  text-sm
                  font-medium
                  transition-all
                  duration-300
                  hover:bg-[#241f1d]
                  hover:text-white
                "
              >
                CUSTOMIZE YOUR TEE
              </Link>

            </div>

          </div>

        </div>


        {/* ================= RIGHT PHOTO ================= */}

        <div
          className="
            relative
            w-full
            h-[220px]
            sm:h-[280px]
            md:h-auto
            md:min-h-[650px]
            overflow-hidden
          "
        >

          <img
            src={wearStoryImage}
            alt="Wear Your Story"
            className="
              absolute
              inset-0
              w-full
              h-full
              object-cover
              object-center
            "
          />


          {/* IMAGE OVERLAY */}

          <div
            className="
              absolute
              inset-0
              bg-[#f8f3ed]/10
            "
          />


          {/* IMAGE TEXT */}

          <div
            className="
              absolute
              inset-0
              z-10
              flex
              items-center
              justify-center
              px-4
            "
          >

            <div className="text-center text-[#241f1d]">

              <h2
                className="
                  font-serif
                  italic
                  text-2xl
                  sm:text-3xl
                  md:text-5xl
                  leading-tight
                "
              >
                Wear Your
                <br />
                Story
              </h2>

              <p
                className="
                  mt-2
                  sm:mt-3
                  md:mt-5
                  text-[8px]
                  sm:text-[10px]
                  md:text-sm
                  uppercase
                  tracking-[0.2em]
                  md:tracking-[0.3em]
                  text-[#8b7370]
                "
              >
                Reshaa Apparels
              </p>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;