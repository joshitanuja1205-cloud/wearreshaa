import { Link } from "react-router-dom";

function CustomizeSection() {
  return (
    <section className="bg-[#dfe7dc]">

      <div
        className="
          max-w-7xl
          mx-auto
          grid
          grid-cols-1
          lg:grid-cols-2
          min-h-[430px]
        "
      >

        {/* ================= LEFT IMAGE ================= */}

        <div
          className="
            relative
            min-h-[320px]
            lg:min-h-full
            overflow-hidden
          "
        >
          <img
            src="/customize-tee.jpg"
            alt="Customize your tee"
            className="
              absolute
              inset-0
              w-full
              h-full
              object-cover
            "
          />
        </div>


        {/* ================= RIGHT CONTENT ================= */}

        <div
          className="
            flex
            items-center
            justify-center
            px-6
            py-16
            sm:px-10
            lg:px-16
            bg-[#dfe7dc]
          "
        >

          <div className="max-w-lg text-center lg:text-left">

            {/* SMALL LABEL */}

            <p
              className="
                text-xs
                uppercase
                tracking-[0.3em]
                text-[#667460]
                mb-4
              "
            >
              Make It Yours
            </p>


            {/* HEADING */}

            <h2
              className="
                font-serif
                text-4xl
                sm:text-5xl
                md:text-6xl
                leading-[0.95]
                text-[#263126]
              "
            >
              Customize
              <br />

              <span className="italic text-[#6f806a]">
                Your Tee
              </span>
            </h2>


            {/* DESCRIPTION */}

            <p
              className="
                mt-6
                text-base
                sm:text-lg
                text-[#4e594c]
                leading-relaxed
                max-w-md
                mx-auto
                lg:mx-0
              "
            >
              Turn your ideas into something wearable.
              Create a piece that feels completely yours.
            </p>


            {/* ================= CUSTOMIZE BUTTON ================= */}

            <Link
              to="/customize"
              className="
                inline-flex
                items-center
                justify-center
                mt-8
                rounded-full
                bg-[#263126]
                text-white
                px-7
                py-4
                text-sm
                font-medium
                hover:bg-[#3d4b3b]
                transition
              "
            >
              START CUSTOMIZING →
            </Link>

          </div>

        </div>

      </div>

    </section>
  );
}

export default CustomizeSection;