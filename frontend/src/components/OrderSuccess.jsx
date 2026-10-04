import { Link, useLocation } from "react-router-dom";

function OrderSuccess() {
  const location = useLocation();

  const order = location.state?.order;

  const orderNumber =
    order?.orderNumber ||
    `RS${Date.now().toString().slice(-6)}`;

  const customer = order?.customer;
  const items = order?.items || [];
  const total = order?.total || 0;
  const paymentMethod = order?.paymentMethod || "cod";

  return (
    <main className="min-h-screen bg-[#f8f6f0]">

      {/* ================= SUCCESS HEADER ================= */}

      <section className="
        px-6
        md:px-12
        lg:px-20
        pt-16
        pb-12
      ">

        <div className="max-w-4xl mx-auto text-center">

          {/* CHECK ICON */}

          <div className="
            w-20
            h-20
            mx-auto
            rounded-full
            bg-[#f1e9e1]
            flex
            items-center
            justify-center
            text-3xl
            text-[#bd6670]
          ">
            ✓
          </div>


          <p className="
            text-xs
            tracking-[0.3em]
            uppercase
            text-[#bd6670]
            mt-7
          ">
            RESHAA
          </p>


          <h1 className="
            font-serif
            text-5xl
            md:text-6xl
            text-[#241f1d]
            mt-3
          ">
            Order Confirmed
          </h1>


          <p className="
            mt-5
            text-[#756b66]
            leading-7
            max-w-xl
            mx-auto
          ">
            Thank you for choosing RESHAA.
            Your order has been received and we're
            getting it ready for you.
          </p>


          {/* ORDER NUMBER */}

          <div className="
            inline-flex
            items-center
            gap-2
            mt-6
            px-5
            py-3
            rounded-full
            bg-white
            border
            border-[#ded7cf]
            text-sm
          ">

            <span className="text-[#827872]">
              Order
            </span>

            <span className="
              font-medium
              text-[#241f1d]
            ">
              #{orderNumber}
            </span>

          </div>

        </div>

      </section>


      {/* ================= ORDER CONTENT ================= */}

      <section className="
        px-6
        md:px-12
        lg:px-20
        pb-24
      ">

        <div className="
          max-w-5xl
          mx-auto
          grid
          lg:grid-cols-[1fr_360px]
          gap-8
        ">


          {/* ================= LEFT ================= */}

          <div className="space-y-6">


            {/* ITEMS */}

            <div className="
              bg-white/60
              border
              border-[#ded7cf]
              rounded-3xl
              p-6
              md:p-8
            ">

              <h2 className="
                font-serif
                text-3xl
                text-[#241f1d]
              ">
                Your Items
              </h2>


              <div className="
                mt-7
                space-y-5
              ">

               {items.length > 0 ? (

  items.map((item) => {

    const product = item.product;

    const itemName =
      item.name || product?.name || "RESHAA Product";

    const itemPrice =
      item.price || product?.price || 0;

    const itemColor =
      item.color?.name || item.color || "—";

    const itemSize =
      item.size || "—";

    return (
      <div
        key={`${item.id || item._id}-${itemSize}-${itemColor}`}
        className="
          flex
          gap-4
          py-4
          border-b
          border-[#e5ddd5]
          last:border-0
        "
      >

        {/* IMAGE */}

        <div className="
          w-20
          h-24
          rounded-xl
          bg-[#eee7df]
          flex
          items-center
          justify-center
          shrink-0
        ">

          <span className="
            font-serif
            text-xs
            text-[#241f1d]
          ">
            RESHAA
          </span>

        </div>

        {/* INFO */}

        <div className="flex-1">

          <div className="
            flex
            justify-between
            gap-4
          ">

            <h3 className="
              text-base
              font-medium
              text-[#241f1d]
            ">
              {itemName}
            </h3>

            <p className="
              text-sm
              font-medium
              text-[#241f1d]
            ">
              ₹{itemPrice * item.quantity}
            </p>

          </div>

          <p className="
            text-xs
            text-[#827872]
            mt-2
          ">
            Colour: {itemColor}
          </p>

          <p className="
            text-xs
            text-[#827872]
            mt-1
          ">
            Size: {itemSize}
          </p>

          <p className="
            text-xs
            text-[#827872]
            mt-1
          ">
            Quantity: {item.quantity}
          </p>

        </div>

      </div>
    );

  })

) : (
  <p className="
    text-sm
    text-[#827872]
  ">
    Your order items will appear here.
  </p>
)}

              </div>

            </div>


            {/* DELIVERY */}

            <div className="
              bg-white/60
              border
              border-[#ded7cf]
              rounded-3xl
              p-6
              md:p-8
            ">

              <h2 className="
                font-serif
                text-3xl
                text-[#241f1d]
              ">
                Delivery Details
              </h2>


              {customer ? (

                <div className="
                  mt-6
                  space-y-2
                  text-sm
                  text-[#756b66]
                  leading-6
                ">

                  <p className="
                    font-medium
                    text-[#241f1d]
                  ">
                    {customer.name}
                  </p>

                  <p>
                    {customer.address}
                  </p>

                  <p>
                    {customer.city}, {customer.state}
                  </p>

                  <p>
                    {customer.pincode}
                  </p>

                  <p className="pt-2">
                    {customer.phone}
                  </p>

                  <p>
                    {customer.email}
                  </p>

                </div>

              ) : (

                <p className="
                  mt-5
                  text-sm
                  text-[#827872]
                ">
                  Your delivery details will be available
                  once the order is connected to the backend.
                </p>

              )}

            </div>

          </div>


          {/* ================= RIGHT SUMMARY ================= */}

          <aside className="
            h-fit
            lg:sticky
            lg:top-28
            bg-[#f1e9e1]
            border
            border-[#ded7cf]
            rounded-3xl
            p-6
            md:p-8
          ">

            <h2 className="
              font-serif
              text-3xl
              text-[#241f1d]
            ">
              Order Summary
            </h2>


            <div className="
              mt-7
              space-y-4
              text-sm
            ">

              <div className="
                flex
                justify-between
              ">

                <span className="text-[#756b66]">
                  Items
                </span>

                <span>
                  {items.reduce(
                    (total, item) =>
                      total + item.quantity,
                    0
                  )}
                </span>

              </div>


              <div className="
                flex
                justify-between
              ">

                <span className="text-[#756b66]">
                  Payment
                </span>

                <span>
                  {paymentMethod === "cod"
                    ? "Cash on Delivery"
                    : "Online Payment"}
                </span>

              </div>

            </div>


            <div className="
              h-px
              bg-[#d7cec5]
              my-6
            " />


            <div className="
              flex
              justify-between
              items-center
            ">

              <span className="
                text-lg
                font-medium
                text-[#241f1d]
              ">
                Total
              </span>

              <span className="
                text-xl
                font-medium
                text-[#241f1d]
              ">
                ₹{total}
              </span>

            </div>


            {/* DELIVERY MESSAGE */}

            <div className="
              mt-7
              p-4
              rounded-2xl
              bg-white/60
              border
              border-[#ded7cf]
            ">

              <p className="
                text-sm
                font-medium
                text-[#241f1d]
              ">
                ✦ Your order is on its way to becoming a story.
              </p>

              <p className="
                text-xs
                text-[#827872]
                mt-2
                leading-5
              ">
                We'll keep you updated about your order
                and delivery.
              </p>

            </div>


            {/* BUTTONS */}

            <div className="
              mt-7
              space-y-3
            ">

              <Link
                to="/shop"
                className="
                  w-full
                  h-13
                  rounded-full
                  bg-[#241f1d]
                  text-white
                  text-sm
                  font-medium
                  tracking-wide
                  flex
                  items-center
                  justify-center
                  hover:bg-[#bd6670]
                  transition
                "
              >
                CONTINUE SHOPPING
              </Link>


              <Link
                to="/"
                className="
                  w-full
                  h-13
                  rounded-full
                  border
                  border-[#241f1d]
                  text-[#241f1d]
                  text-sm
                  font-medium
                  flex
                  items-center
                  justify-center
                  hover:bg-[#241f1d]
                  hover:text-white
                  transition
                "
              >
                BACK TO HOME
              </Link>

            </div>

          </aside>

        </div>

      </section>

    </main>
  );
}

export default OrderSuccess;

