function WhyReshaa() {
  const features = [
    {
      icon: "✦",
      title: "240 GSM",
      text: "Premium heavyweight fit"
    },
    {
      icon: "✧",
      title: "Front + Back Prints",
      text: "Designed to stand out from every angle"
    },
    {
      icon: "♡",
      title: "Heavy & Premium",
      text: "Made with quality you can feel"
    },
    {
      icon: "◌",
      title: "Everyday Streetwear",
      text: "Made to wear, style and repeat"
    },
    {
      icon: "♥",
      title: "Made With Love",
      text: "Every piece carries a little story"
    },
    {
      icon: "✎",
      title: "Easy Customization",
      text: "Turn your ideas into something wearable"
    }
  ];

  return (
    <section className="bg-[#8fa894] text-[#f8f4ec] py-16 md:py-20">

      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-12">

          <p className="text-xs md:text-sm tracking-[0.3em] uppercase opacity-80 mb-4">
            Why Reshaa
          </p>

          <h2 className="font-serif text-4xl md:text-5xl">
            Made for your story.
          </h2>

          <p className="mt-4 max-w-xl mx-auto text-sm md:text-base opacity-80">
            Thoughtfully designed pieces made for everyday wear,
            self-expression and everything in between.
          </p>

        </div>


        {/* Feature Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">

          {features.map((feature, index) => (

            <div
              key={index}
              className="
                bg-[#f8f4ec]
                text-[#26352b]
                rounded-2xl
                px-5 py-7
                text-center
                min-h-[190px]
                flex flex-col
                items-center
                justify-center
                transition-all
                duration-300
                hover:-translate-y-1
              "
            >

              <div className="text-2xl mb-4 text-[#6f8875]">
                {feature.icon}
              </div>

              <h3 className="font-medium text-sm md:text-base">
                {feature.title}
              </h3>

              <p className="mt-2 text-xs md:text-sm text-[#68746b] leading-relaxed">
                {feature.text}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default WhyReshaa;