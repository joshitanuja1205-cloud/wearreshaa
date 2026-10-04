function ReshaaStory() {
  return (
    <section className="bg-[#f8f3ed] py-16 sm:py-20">

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">

        <div className="
          grid
          grid-cols-1
          lg:grid-cols-2
          gap-10
          lg:gap-16
          items-center
        ">

          {/* LEFT CONTENT */}
          <div>

            <p className="
              text-xs
              uppercase
              tracking-[0.3em]
              text-[#71806d]
              mb-4
            ">
              About Us
            </p>

            <div className="flex items-start gap-3">

              <h2 className="
                font-serif
                text-4xl
                sm:text-5xl
                md:text-6xl
                leading-[0.95]
                text-[#241f1d]
              ">
                The Reshaa
                <br />
                Story
              </h2>

              <span className="text-[#71806d] text-2xl mt-2">
                ✦
              </span>

            </div>


            <p className="
              mt-7
              max-w-lg
              text-base
              sm:text-lg
              leading-relaxed
              text-[#514846]
            ">
              Born from a love for self-expression, Reshaa is more
              than just clothing. It's a space for your stories,
              your emotions and everything that makes you, you.
            </p>


            <a
              href="/about"
              className="
                inline-flex
                items-center
                gap-2
                mt-8
                border
                border-[#263126]
                rounded-full
                px-6
                py-3
                text-sm
                font-medium
                text-[#263126]
                hover:bg-[#263126]
                hover:text-white
                transition
              "
            >
              OUR STORY →
            </a>

          </div>


          {/* RIGHT IMAGES */}
          <div className="
            grid
            grid-cols-2
            gap-4
          ">

            {/* IMAGE 1 */}
            <div className="
              aspect-[4/5]
              overflow-hidden
              rounded-xl
            ">
              <img
                src="/story-clothes.jpg"
                alt="Reshaa clothing collection"
                className="
                  w-full
                  h-full
                  object-cover
                  hover:scale-105
                  transition-transform
                  duration-500
                "
              />
            </div>


            {/* IMAGE 2 */}
            <div className="
              aspect-[4/5]
              overflow-hidden
              rounded-xl
              mt-8
            ">
              <img
                src="/story-brand.jpg"
                alt="Reshaa brand story"
                className="
                  w-full
                  h-full
                  object-cover
                  hover:scale-105
                  transition-transform
                  duration-500
                "
              />
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default ReshaaStory;