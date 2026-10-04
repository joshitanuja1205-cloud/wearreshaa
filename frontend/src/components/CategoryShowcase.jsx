function CategoryShowcase() {
  const categories = [
    {
      title: "Graphic Tees",
      image: "/categories/graphic-tees.jpg",
      link: "/shop?category=Graphic%20Tees",
    },
    {
      title: "Girls",
      image: "/categories/girls.jpg",
      link: "/shop?category=Girls",
    },
    {
      title: "Men",
      image: "/categories/men.jpg",
      link: "/shop?category=Men",
    },
    {
      title: "Customized Tees",
      image: "/categories/custom.jpg",
      link: "/shop?category=Custom%20Tees",
    },
  ];

  return (
    <section className="bg-[#f8f3ed] py-12 sm:py-16">

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">

        {/* SECTION INTRO */}
        <div className="flex items-end justify-between mb-7 sm:mb-9">

          <div>
            <p
              className="
                text-[10px]
                sm:text-xs
                uppercase
                tracking-[0.3em]
                text-[#8b7370]
                mb-2
              "
            >
              Explore Reshaa
            </p>

            <h2
              className="
                font-serif
                text-3xl
                sm:text-4xl
                md:text-5xl
                text-[#241f1d]
              "
            >
              Shop by category
            </h2>
          </div>

          <span className="hidden sm:block text-[#c56d75] text-2xl">
            ✦
          </span>

        </div>

        {/* CATEGORY CARDS */}
        <div
          className="
            grid
            grid-cols-4
            gap-3
            sm:gap-4
            md:gap-5
          "
        >

          {categories.map((category) => (

            <a
              key={category.title}
              href={category.link}
              className="group block"
            >

              <div
                className="
                  relative
                  aspect-[3/4]
                  overflow-hidden
                  rounded-2xl
                  bg-[#e8dfd7]
                  shadow-[0_8px_20px_rgba(36,31,29,0.10)]
                  transition-all
                  duration-500
                  group-hover:-translate-y-1
                  group-hover:shadow-[0_15px_30px_rgba(36,31,29,0.16)]
                "
              >

                {/* IMAGE */}
                <img
                  src={category.image}
                  alt={category.title}
                  className="
                    absolute
                    inset-0
                    w-full
                    h-full
                    object-cover
                    transition-transform
                    duration-700
                    group-hover:scale-105
                  "
                />

                {/* OVERLAY */}
                <div
                  className="
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-black/60
                    via-black/10
                    to-transparent
                  "
                />

                {/* CATEGORY NAME */}
                <div
                  className="
                    absolute
                    left-2
                    right-2
                    bottom-2
                    sm:left-3
                    sm:right-3
                    sm:bottom-3
                    rounded-xl
                    bg-[#f8f3ed]/90
                    backdrop-blur-sm
                    px-2
                    py-2
                    sm:px-3
                    sm:py-2.5
                  "
                >

                  <div className="flex items-center justify-between gap-1">

                    <h3
                      className="
                        text-[10px]
                        sm:text-sm
                        font-medium
                        text-[#241f1d]
                        leading-tight
                      "
                    >
                      {category.title}
                    </h3>

                    <span
                      className="
                        text-[#c56d75]
                        text-sm
                        sm:text-base
                        transition-transform
                        group-hover:translate-x-1
                      "
                    >
                      →
                    </span>

                  </div>

                </div>

              </div>

            </a>

          ))}

        </div>

      </div>

    </section>
  );
}

export default CategoryShowcase;