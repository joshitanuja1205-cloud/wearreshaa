function ProductCard({ product }) {
  return (
    <div className="group">

      {/* IMAGE */}
      <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-[#e9e7e2]">

        <img
          src={product.image}
          alt={product.name}
          className="
            w-full
            h-full
            object-cover
            transition-transform
            duration-500
            group-hover:scale-105
          "
        />

        {/* NEW BADGE */}
        {product.badge === "New" && (
          <span
            className="
              absolute
              top-3
              left-3
              bg-[#f3d6d2]
              text-[#7c4f4d]
              text-xs
              px-3
              py-1.5
              rounded-full
            "
          >
            NEW
          </span>
        )}

        {/* HEART */}
        <button
          className="
            absolute
            top-3
            right-3
            w-9
            h-9
            rounded-full
            bg-[#f8f3ed]/90
            backdrop-blur-sm
            flex
            items-center
            justify-center
            text-lg
            hover:scale-110
            transition
          "
        >
          ♡
        </button>

      </div>


      {/* PRODUCT INFO */}
      <div className="mt-3">

        <h3 className="text-sm sm:text-base font-medium text-[#241f1d]">
          {product.name}
        </h3>

        <p className="mt-1 text-sm text-[#514846]">
          ₹{product.price}
        </p>


        {/* COLOUR DOTS */}
        <div className="flex items-center gap-2 mt-3">

          <span className="w-4 h-4 rounded-full bg-[#c56d75] border border-[#d8cbc4]" />

          <span className="w-4 h-4 rounded-full bg-[#eee5db] border border-[#d8cbc4]" />

          <span className="w-4 h-4 rounded-full bg-[#1e1d1b] border border-[#d8cbc4]" />

        </div>

      </div>

    </div>
  );
}

export default ProductCard;