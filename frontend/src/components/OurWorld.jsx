function OurWorld() {
  const images = [
    "/world-1.jpg",
    "/world-2.jpg",
    "/world-3.jpg",
    "/world-4.jpg",
  ];

  return (
    <section className="bg-[#f8f3ed] py-16 sm:py-20">

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">

        {/* Heading */}
        <div className="text-center mb-10">

          <p className="text-xs uppercase tracking-[0.3em] text-[#71806d] mb-4">
            Follow Along
          </p>

          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#241f1d]">
            Our World
          </h2>

          <p className="mt-4 text-sm sm:text-base text-[#6d625e]">
            Stories, styling and little moments from Reshaa.
          </p>

          <a
            href="#"
            className="inline-block mt-5 text-sm font-medium text-[#5f7463] border-b border-[#5f7463] pb-1"
          >
            @RESHAAPPARELS
          </a>

        </div>


        {/* Image Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">

          {images.map((image, index) => (
            <div
              key={index}
              className="
                aspect-square
                overflow-hidden
                rounded-xl
                bg-[#dfe7dc]
              "
            >

              <img
                src={image}
                alt={`Reshaa style ${index + 1}`}
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
          ))}

        </div>

      </div>

    </section>
  );
}

export default OurWorld;