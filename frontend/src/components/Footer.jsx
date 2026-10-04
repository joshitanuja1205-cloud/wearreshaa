function Footer() {
  return (
    <footer className="bg-[#26352b] text-[#f8f3ed]">

      {/* Newsletter */}
      <div className="border-b border-[#f8f3ed]/15">

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-14 sm:py-16">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

            <div>

              <p className="text-xs uppercase tracking-[0.3em] text-[#b9c7b6] mb-4">
                Stay In The Story
              </p>

              <h2 className="font-serif text-4xl sm:text-5xl">
                Be the first to know.
              </h2>

              <p className="mt-4 max-w-md text-sm text-[#d0d8ce] leading-relaxed">
                New drops, custom pieces and little things
                happening at Reshaa — straight to your inbox.
              </p>

            </div>


            <form className="flex flex-col sm:flex-row gap-3">

              <input
                type="email"
                placeholder="Your email address"
                className="
                  flex-1
                  bg-transparent
                  border
                  border-[#f8f3ed]/40
                  rounded-full
                  px-6
                  py-4
                  text-sm
                  text-white
                  placeholder:text-[#b9c1b8]
                  outline-none
                  focus:border-[#f8f3ed]
                "
              />

              <button
                type="submit"
                className="
                  bg-[#f8f3ed]
                  text-[#26352b]
                  rounded-full
                  px-7
                  py-4
                  text-sm
                  font-medium
                  hover:bg-[#dfe7dc]
                  transition
                "
              >
                JOIN US →
              </button>

            </form>

          </div>

        </div>

      </div>


      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-14">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div>

            <h3 className="font-serif text-3xl">
              RESHAA
            </h3>

            <p className="mt-4 max-w-xs text-sm leading-relaxed text-[#c8d1c6]">
              Every thread has a tale.
              <br />
              Wear yours.
            </p>

          </div>


          {/* Shop */}
          <div>

            <h4 className="text-xs uppercase tracking-[0.25em] text-[#b9c7b6] mb-5">
              Shop
            </h4>

            <div className="flex flex-col gap-3 text-sm">

              <a href="/shop" className="hover:text-[#b9c7b6] transition">
                All Products
              </a>

              <a href="/shop" className="hover:text-[#b9c7b6] transition">
                New Arrivals
              </a>

              <a href="/custom" className="hover:text-[#b9c7b6] transition">
                Customize
              </a>

            </div>

          </div>


          {/* About */}
          <div>

            <h4 className="text-xs uppercase tracking-[0.25em] text-[#b9c7b6] mb-5">
              Reshaa
            </h4>

            <div className="flex flex-col gap-3 text-sm">

              <a href="/about" className="hover:text-[#b9c7b6] transition">
                Our Story
              </a>

              <a href="#" className="hover:text-[#b9c7b6] transition">
                Contact
              </a>

              <a href="#" className="hover:text-[#b9c7b6] transition">
                FAQ
              </a>

            </div>

          </div>


          {/* Social */}
          <div>

            <h4 className="text-xs uppercase tracking-[0.25em] text-[#b9c7b6] mb-5">
              Follow Us
            </h4>

            <div className="flex gap-3">

              <a
                href="#"
                className="
                  w-10
                  h-10
                  rounded-full
                  border
                  border-[#f8f3ed]/30
                  flex
                  items-center
                  justify-center
                  text-sm
                  hover:bg-[#f8f3ed]
                  hover:text-[#26352b]
                  transition
                "
              >
                IG
              </a>

              <a
                href="#"
                className="
                  w-10
                  h-10
                  rounded-full
                  border
                  border-[#f8f3ed]/30
                  flex
                  items-center
                  justify-center
                  text-sm
                  hover:bg-[#f8f3ed]
                  hover:text-[#26352b]
                  transition
                "
              >
                ✉
              </a>

            </div>

          </div>

        </div>


        {/* Bottom */}
        <div className="
          mt-12
          pt-6
          border-t
          border-[#f8f3ed]/15
          flex
          flex-col
          sm:flex-row
          justify-between
          gap-3
          text-xs
          text-[#b9c1b8]
        ">

          <p>
            © 2026 Reshaa Apparels. All rights reserved.
          </p>

          <p>
            Made with ♡
          </p>

        </div>

      </div>

    </footer>
  );
}

export default Footer;