import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Customize() {
    const navigate = useNavigate();
  const [color, setColor] = useState("Cream");
  const [size, setSize] = useState("M");
  const [quantity, setQuantity] = useState(1);

  const [designType, setDesignType] = useState("");

  const [text, setText] = useState("");
  const [font, setFont] = useState("");

  const [idea, setIdea] = useState("");
  const [vibe, setVibe] = useState("");
  const [important, setImportant] = useState("");

  const [placement, setPlacement] = useState("");
  const [reference, setReference] = useState(null);

  const [submitted, setSubmitted] = useState(false);
  const [requestId, setRequestId] = useState("");

  const colors = [
    { name: "Black", value: "#171515" },
    { name: "White", value: "#ffffff" },
    { name: "Sage", value: "#8d9b86" },
    { name: "Rose", value: "#c56d75" },
    { name: "Cream", value: "#e9dfcf" },
  ];

  const designOptions = [
    {
      id: "text",
      icon: "Aa",
      title: "Text",
      description: "Words, names or quotes",
    },
    {
      id: "design",
      icon: "✦",
      title: "Design",
      description: "Upload your artwork",
    },
    {
      id: "text-design",
      icon: "Aa + ✦",
      title: "Text + Design",
      description: "Bring both together",
    },
    {
      id: "idea",
      icon: "✎",
      title: "An Idea",
      description: "We'll create it with you",
    },
  ];

  const fonts = [
    "Minimal",
    "Elegant Serif",
    "Handwritten",
    "Bold",
    "Something Else",
  ];

  const placements = [
    "Front",
    "Back",
    "Chest",
    "Sleeve",
    "Other",
  ];

  const handleFileChange = (e) => {
  const file = e.target.files[0];

  if (!file) return;

  const reader = new FileReader();

  reader.onloadend = () => {
    setReference({
      name: file.name,
      type: file.type,
      size: file.size,
      preview: reader.result,
    });
  };

  reader.readAsDataURL(file);
};

  const getDesignTypeName = () => {
    if (designType === "text") return "Text";
    if (designType === "design") return "Design";
    if (designType === "text-design") return "Text + Design";
    if (designType === "idea") return "Idea";

    return "";
  };

  const handleSubmit = () => {
    if (!designType) {
      alert("Please choose what you're imagining first.");
      return;
    }

    if (!placement) {
      alert("Please choose where you'd like the design to go.");
      return;
    }

    if (
      (designType === "text" ||
        designType === "text-design") &&
      !text.trim()
    ) {
      alert("Please tell us what text you'd like on the tee.");
      return;
    }

    if (
      (designType === "design" ||
        designType === "text-design") &&
      !reference
    ) {
      alert("Please upload your design or reference.");
      return;
    }

    if (designType === "idea" && !idea.trim()) {
      alert("Please tell us a little about your idea.");
      return;
    }

    const id =
      "RS-" +
      Date.now().toString().slice(-6);

    const request = {
      id,
      color,
      size,
      quantity,
      designType: getDesignTypeName(),
      text,
      font,
      idea,
      vibe,
      important,
      placement,
      reference: reference
        ? {
            name: reference.name,
            type: reference.type,
            size: reference.size,
          }
        : null,
      price: 1299 * quantity,
      createdAt: new Date().toISOString(),
    };
const existingCart =
  JSON.parse(localStorage.getItem("reshAA-cart")) || [];

const customCartItem = {
  id: `custom-${id}`,
  name: "RESHAA Custom Tee",
  category: "Custom",
  price: 1299,
  quantity: quantity,

  color: {
    name: color,
  },

  size: size,

  custom: true,

  customization: {
    designType: getDesignTypeName(),
    text,
    font,
    idea,
    vibe,
    important,
    placement,
    reference: reference
      ? {
          name: reference.name,
          type: reference.type,
          size: reference.size,
          preview: reference.preview,
        }
      : null,
  },
};

const updatedCart = [
  ...existingCart,
  customCartItem,
];

localStorage.setItem(
  "reshAA-cart",
  JSON.stringify(updatedCart)
);

window.dispatchEvent(new Event("cartUpdated"));
    localStorage.setItem(
      "reshAA-custom-request",
      JSON.stringify(request)
    );

    setRequestId(id);
    setSubmitted(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* =========================================================
     SUCCESS SCREEN
  ========================================================= */

  if (submitted) {
    return (
      <main className="min-h-screen bg-[#f8f6f0] text-[#241f1d] px-4 py-10 sm:px-6">

        <div className="max-w-3xl mx-auto">

          <div className="
            rounded-[28px]
            bg-[#263126]
            text-white
            p-7
            sm:p-12
            text-center
          ">

            <div className="
              w-16
              h-16
              mx-auto
              rounded-full
              bg-white/10
              flex
              items-center
              justify-center
              text-2xl
              mb-5
            ">
              ✓
            </div>

            <p className="
              text-[10px]
              tracking-[0.3em]
              uppercase
              text-[#b8c5b1]
            ">
              Request received
            </p>

            <h1 className="
              font-serif
              text-4xl
              sm:text-5xl
              mt-3
            ">
              Your idea is with us.
            </h1>

            <p className="
              mt-4
              text-sm
              sm:text-base
              text-white/75
              leading-relaxed
              max-w-xl
              mx-auto
            ">
              We'll turn your idea into a design and
              share it with you for approval before
              anything is printed.
            </p>

            <div className="
              mt-7
              inline-block
              rounded-full
              bg-white/10
              px-5
              py-3
            ">
              <span className="text-xs text-white/60">
                REQUEST ID
              </span>

              <span className="ml-3 font-medium">
                {requestId}
              </span>
            </div>

          </div>


          {/* REQUEST SUMMARY */}

          <div className="
            mt-5
            rounded-[24px]
            border
            border-[#ded7cf]
            bg-white/70
            p-6
            sm:p-8
          ">

            <p className="
              text-[10px]
              tracking-[0.25em]
              uppercase
              text-[#827872]
            ">
              Your request
            </p>

            <h2 className="
              font-serif
              text-2xl
              sm:text-3xl
              mt-1
            ">
              A little something yours.
            </h2>

            <div className="
              grid
              grid-cols-2
              sm:grid-cols-4
              gap-3
              mt-6
            ">

              <SummaryItem
                label="Tee"
                value={color}
              />

              <SummaryItem
                label="Size"
                value={size}
              />

              <SummaryItem
                label="Quantity"
                value={quantity}
              />

              <SummaryItem
                label="Type"
                value={getDesignTypeName()}
              />

            </div>

            <div className="
              mt-4
              rounded-2xl
              bg-[#f4f1eb]
              p-4
              text-sm
            ">

              {text && (
                <p className="mb-2">
                  <span className="text-[#827872]">
                    Text:
                  </span>{" "}
                  {text}
                </p>
              )}

              {font && (
                <p className="mb-2">
                  <span className="text-[#827872]">
                    Font:
                  </span>{" "}
                  {font}
                </p>
              )}

              {vibe && (
                <p className="mb-2">
                  <span className="text-[#827872]">
                    Vibe:
                  </span>{" "}
                  {vibe}
                </p>
              )}

              {placement && (
                <p className="mb-2">
                  <span className="text-[#827872]">
                    Placement:
                  </span>{" "}
                  {placement}
                </p>
              )}

              {reference && (
                <p>
                  <span className="text-[#827872]">
                    Reference:
                  </span>{" "}
                  {reference.name}
                </p>
              )}

            </div>

            <div className="
              border-t
              border-[#ded7cf]
              mt-6
              pt-5
              flex
              items-center
              justify-between
            ">

              <div>
                <p className="text-xs text-[#827872]">
                  Estimated total
                </p>

                <p className="text-2xl font-medium mt-1">
                  ₹{(1299 * quantity).toLocaleString("en-IN")}
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setRequestId("");
                }}
                className="
                  px-5
                  py-3
                  rounded-full
                  border
                  border-[#cec6be]
                  text-sm
                  hover:bg-[#f4f1eb]
                  transition
                "
              >
                Create another
              </button>

            </div>

          </div>

        </div>

      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8f6f0] text-[#241f1d]">

      {/* =====================================================
          INTRO
      ===================================================== */}

      <section className="px-4 sm:px-6 md:px-10 pt-8 sm:pt-12 pb-6">

        <div className="max-w-6xl mx-auto">

          <p className="
            text-[10px]
            sm:text-xs
            tracking-[0.3em]
            uppercase
            text-[#667460]
            mb-2
          ">
            RESHAA CUSTOM
          </p>

          <h1 className="
            font-serif
            text-4xl
            sm:text-5xl
            md:text-6xl
            leading-none
          ">
            Create something{" "}
            <span className="italic text-[#bd6670]">
              yours.
            </span>
          </h1>

          <p className="
            mt-3
            text-sm
            sm:text-base
            text-[#716965]
            max-w-xl
          ">
            Tell us what you're imagining. We'll turn your
            idea into a design and confirm it with you
            before anything is printed.
          </p>

        </div>

      </section>


      {/* =====================================================
          STEP 01
      ===================================================== */}

      <section className="px-4 sm:px-6 md:px-10 py-4">

        <div className="
          max-w-6xl
          mx-auto
          rounded-[24px]
          border
          border-[#ded7cf]
          bg-white/50
          p-5
          sm:p-7
        ">

          <p className="
            text-[10px]
            tracking-[0.25em]
            uppercase
            text-[#827872]
          ">
            Step 01
          </p>

          <h2 className="
            font-serif
            text-2xl
            sm:text-3xl
            mt-1
          ">
            Choose your tee
          </h2>


          {/* COLOUR */}

          <div className="mt-5">

            <div className="
              flex
              items-center
              justify-between
              mb-3
            ">

              <p className="text-sm font-medium">
                Colour
              </p>

              <span className="text-xs text-[#827872]">
                {color}
              </span>

            </div>

            <div className="flex gap-3 flex-wrap">

              {colors.map((item) => (

                <button
                  key={item.name}
                  type="button"
                  onClick={() => setColor(item.name)}
                  aria-label={item.name}
                  className={`
                    w-9
                    h-9
                    sm:w-10
                    sm:h-10
                    rounded-full
                    border-2
                    transition-all
                    ${
                      color === item.name
                        ? "border-[#bd6670] scale-110"
                        : "border-[#cec6be]"
                    }
                  `}
                  style={{
                    backgroundColor: item.value,
                  }}
                />

              ))}

            </div>

          </div>


          {/* SIZE + QUANTITY */}

          <div className="
            grid
            grid-cols-1
            sm:grid-cols-2
            gap-6
            mt-6
          ">

            <div>

              <p className="text-sm font-medium mb-3">
                Size
              </p>

              <div className="flex gap-2 flex-wrap">

                {["S", "M", "L", "XL"].map((item) => (

                  <button
                    key={item}
                    type="button"
                    onClick={() => setSize(item)}
                    className={`
                      w-12
                      h-10
                      rounded-full
                      border
                      text-sm
                      transition
                      ${
                        size === item
                          ? "bg-[#241f1d] text-white border-[#241f1d]"
                          : "border-[#cec6be] hover:border-[#241f1d]"
                      }
                    `}
                  >
                    {item}
                  </button>

                ))}

              </div>

            </div>


            <div>

              <p className="text-sm font-medium mb-3">
                Quantity
              </p>

              <div className="
                inline-flex
                items-center
                rounded-full
                border
                border-[#cec6be]
                bg-white/60
                overflow-hidden
              ">

                <button
                  type="button"
                  onClick={() =>
                    setQuantity(
                      Math.max(1, quantity - 1)
                    )
                  }
                  className="
                    w-10
                    h-10
                    hover:bg-[#eee9e2]
                  "
                >
                  −
                </button>

                <span className="w-10 text-center text-sm">
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={() =>
                    setQuantity(quantity + 1)
                  }
                  className="
                    w-10
                    h-10
                    hover:bg-[#eee9e2]
                  "
                >
                  +
                </button>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          STEP 02
      ===================================================== */}

      <section className="px-4 sm:px-6 md:px-10 py-4">

        <div className="
          max-w-6xl
          mx-auto
          rounded-[24px]
          border
          border-[#ded7cf]
          bg-white/50
          p-5
          sm:p-7
        ">

          <p className="
            text-[10px]
            tracking-[0.25em]
            uppercase
            text-[#827872]
          ">
            Step 02
          </p>

          <h2 className="
            font-serif
            text-2xl
            sm:text-3xl
            mt-1
          ">
            What are you imagining?
          </h2>

          <div className="
            grid
            grid-cols-2
            lg:grid-cols-4
            gap-3
            mt-5
          ">

            {designOptions.map((option) => (

              <button
                key={option.id}
                type="button"
                onClick={() => setDesignType(option.id)}
                className={`
                  text-left
                  rounded-2xl
                  border
                  p-4
                  sm:p-5
                  min-h-[125px]
                  transition-all
                  ${
                    designType === option.id
                      ? "border-[#bd6670] bg-[#fbefef] -translate-y-0.5"
                      : "border-[#ded7cf] bg-white/40 hover:bg-white"
                  }
                `}
              >

                <div className="text-xl sm:text-2xl mb-4">
                  {option.icon}
                </div>

                <p className="font-medium text-sm sm:text-base">
                  {option.title}
                </p>

                <p className="
                  text-xs
                  text-[#827872]
                  mt-1
                  leading-relaxed
                ">
                  {option.description}
                </p>

              </button>

            ))}

          </div>

        </div>

      </section>


      {/* =====================================================
          STEP 03
      ===================================================== */}

      {designType && (

        <section className="px-4 sm:px-6 md:px-10 py-4">

          <div className="
            max-w-6xl
            mx-auto
            rounded-[24px]
            border
            border-[#ded7cf]
            bg-[#dfe7dc]
            p-5
            sm:p-7
          ">

            <p className="
              text-[10px]
              tracking-[0.25em]
              uppercase
              text-[#667460]
            ">
              Step 03
            </p>

            <h2 className="
              font-serif
              text-2xl
              sm:text-3xl
              mt-1
            ">
              Tell us about it.
            </h2>

            <p className="
              text-sm
              text-[#716d68]
              mt-2
              mb-5
            ">
              The more you share, the better we can understand your vision.
            </p>


            {/* TEXT */}

            {(designType === "text" ||
              designType === "text-design") && (

              <div className="space-y-5">

                <div>

                  <label className="text-sm font-medium block mb-2">
                    What text would you like?
                  </label>

                  <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Name, quote, word..."
                    className="
                      w-full
                      h-12
                      rounded-xl
                      border
                      border-[#cecfc8]
                      bg-white/70
                      px-4
                      text-sm
                      outline-none
                      focus:border-[#bd6670]
                    "
                  />

                </div>


                <div>

                  <label className="text-sm font-medium block mb-2">
                    What font or style do you prefer?
                  </label>

                  <div className="flex flex-wrap gap-2">

                    {fonts.map((item) => (

                      <button
                        key={item}
                        type="button"
                        onClick={() => setFont(item)}
                        className={`
                          px-4
                          py-2
                          rounded-full
                          border
                          text-xs
                          transition
                          ${
                            font === item
                              ? "bg-[#241f1d] text-white border-[#241f1d]"
                              : "border-[#c8c9c2] hover:border-[#241f1d]"
                          }
                        `}
                      >
                        {item}
                      </button>

                    ))}

                  </div>

                </div>

              </div>

            )}


            {/* DESIGN UPLOAD */}

            {(designType === "design" ||
              designType === "text-design") && (

              <div className="mt-5">

                <label className="text-sm font-medium block mb-2">
                  {designType === "text-design"
                    ? "Have a reference?"
                    : "Upload your design or reference"}
                </label>

                <label className="
                  flex
                  items-center
                  justify-center
                  gap-3
                  min-h-[90px]
                  rounded-2xl
                  border
                  border-dashed
                  border-[#bfc5b8]
                  bg-white/50
                  cursor-pointer
                  hover:bg-white/70
                  transition
                ">

                  <span className="text-xl">
                    ↑
                  </span>

                  <div>

                    <p className="text-sm font-medium">
                      {reference
                        ? reference.name
                        : "Upload an image"}
                    </p>

                    <p className="
                      text-xs
                      text-[#827872]
                      mt-1
                    ">
                      PNG, JPG or JPEG
                    </p>

                  </div>

                  <input
                    type="file"
                    accept="image/png,image/jpeg"
                    onChange={handleFileChange}
                    className="hidden"
                  />

                </label>

              </div>

            )}


            {/* IDEA */}

            {designType === "idea" && (

              <div>

                <label className="text-sm font-medium block mb-2">
                  Tell us a little about your idea.
                </label>

                <textarea
                  value={idea}
                  onChange={(e) => setIdea(e.target.value)}
                  placeholder="
Tell us what you're imagining — a mood, concept,
illustration, quote, colours, anything that comes to mind...
                  "
                  className="
                    w-full
                    min-h-[130px]
                    rounded-2xl
                    border
                    border-[#cecfc8]
                    bg-white/70
                    p-4
                    text-sm
                    resize-none
                    outline-none
                    focus:border-[#bd6670]
                  "
                />

              </div>

            )}


            {/* VIBE */}

            <div className="mt-5">

              <label className="text-sm font-medium block mb-2">
                What style / vibe are you going for?
              </label>

              <input
                type="text"
                value={vibe}
                onChange={(e) => setVibe(e.target.value)}
                placeholder="Minimal, vintage, playful, bold, dreamy..."
                className="
                  w-full
                  h-12
                  rounded-xl
                  border
                  border-[#cecfc8]
                  bg-white/70
                  px-4
                  text-sm
                  outline-none
                  focus:border-[#bd6670]
                "
              />

            </div>


            {/* TEXT + DESIGN IDEA */}

            {designType === "text-design" && (

              <div className="mt-5">

                <label className="text-sm font-medium block mb-2">
                  Or tell us the idea behind the design.
                </label>

                <textarea
                  value={idea}
                  onChange={(e) => setIdea(e.target.value)}
                  placeholder="Anything you'd like us to understand about your reference..."
                  className="
                    w-full
                    min-h-[100px]
                    rounded-2xl
                    border
                    border-[#cecfc8]
                    bg-white/70
                    p-4
                    text-sm
                    resize-none
                    outline-none
                    focus:border-[#bd6670]
                  "
                />

              </div>

            )}


            {/* IMPORTANT */}

            <div className="mt-5">

              <label className="text-sm font-medium block mb-2">

                Anything important we should know?

                <span className="
                  text-[#827872]
                  font-normal
                ">
                  {" "}Optional
                </span>

              </label>

              <textarea
                value={important}
                onChange={(e) => setImportant(e.target.value)}
                placeholder="Any little detail that matters to you..."
                className="
                  w-full
                  min-h-[90px]
                  rounded-2xl
                  border
                  border-[#cecfc8]
                  bg-white/70
                  p-4
                  text-sm
                  resize-none
                  outline-none
                  focus:border-[#bd6670]
                "
              />

            </div>

          </div>

        </section>

      )}


      {/* =====================================================
          STEP 04
      ===================================================== */}

      {designType && (

        <section className="px-4 sm:px-6 md:px-10 py-4">

          <div className="
            max-w-6xl
            mx-auto
            rounded-[24px]
            border
            border-[#ded7cf]
            bg-white/50
            p-5
            sm:p-7
          ">

            <p className="
              text-[10px]
              tracking-[0.25em]
              uppercase
              text-[#827872]
            ">
              Step 04
            </p>

            <h2 className="
              font-serif
              text-2xl
              sm:text-3xl
              mt-1
            ">
              Where should it go?
            </h2>

            <div className="flex flex-wrap gap-2 mt-5">

              {placements.map((item) => (

                <button
                  key={item}
                  type="button"
                  onClick={() => setPlacement(item)}
                  className={`
                    px-5
                    py-2.5
                    rounded-full
                    border
                    text-sm
                    transition
                    ${
                      placement === item
                        ? "bg-[#241f1d] text-white border-[#241f1d]"
                        : "border-[#cec6be] hover:border-[#241f1d]"
                    }
                  `}
                >
                  {item}
                </button>

              ))}

            </div>

          </div>

        </section>

      )}


      {/* =====================================================
          STEP 05
      ===================================================== */}

      {designType && (

        <section className="px-4 sm:px-6 md:px-10 py-4">

          <div className="
            max-w-6xl
            mx-auto
            rounded-[24px]
            bg-[#263126]
            text-white
            p-6
            sm:p-8
          ">

            <div className="flex items-start gap-4">

              <span className="text-2xl">
                ✦
              </span>

              <div>

                <p className="
                  text-[10px]
                  tracking-[0.25em]
                  uppercase
                  text-[#b8c5b1]
                  mb-2
                ">
                  Step 05
                </p>

                <h2 className="
                  font-serif
                  text-2xl
                  sm:text-3xl
                ">
                  Your idea. Our craft.
                </h2>

                <p className="
                  mt-3
                  text-sm
                  sm:text-base
                  text-white/75
                  leading-relaxed
                  max-w-3xl
                ">
                  Don't worry about getting every detail perfect.
                  We'll turn your idea into a design and{" "}
                  <span className="text-white font-medium">
                    confirm it with you before anything is printed.
                  </span>
                </p>

              </div>

            </div>

          </div>

        </section>

      )}


      {/* =====================================================
          STEP 06
      ===================================================== */}

      {designType && (

        <section className="
          px-4
          sm:px-6
          md:px-10
          py-4
          pb-12
        ">

          <div className="
            max-w-6xl
            mx-auto
            rounded-[24px]
            border
            border-[#ded7cf]
            bg-white/70
            p-5
            sm:p-7
          ">

            <p className="
              text-[10px]
              tracking-[0.25em]
              uppercase
              text-[#827872]
            ">
              Step 06
            </p>

            <h2 className="
              font-serif
              text-2xl
              sm:text-3xl
              mt-1
            ">
              Your request, at a glance.
            </h2>


            {/* BASIC SUMMARY */}

            <div className="
              grid
              grid-cols-2
              sm:grid-cols-4
              gap-3
              mt-5
            ">

              <SummaryItem
                label="Tee"
                value={color}
              />

              <SummaryItem
                label="Size"
                value={size}
              />

              <SummaryItem
                label="Quantity"
                value={quantity}
              />

              <SummaryItem
                label="Type"
                value={getDesignTypeName()}
              />

            </div>


            {/* DETAILS */}

            <div className="
              mt-4
              rounded-2xl
              bg-[#f4f1eb]
              p-4
              text-sm
            ">

              {text && (
                <p className="mb-2">
                  <span className="text-[#827872]">
                    Text:
                  </span>{" "}
                  {text}
                </p>
              )}

              {font && (
                <p className="mb-2">
                  <span className="text-[#827872]">
                    Font:
                  </span>{" "}
                  {font}
                </p>
              )}

              {vibe && (
                <p className="mb-2">
                  <span className="text-[#827872]">
                    Vibe:
                  </span>{" "}
                  {vibe}
                </p>
              )}

              {placement && (
                <p className="mb-2">
                  <span className="text-[#827872]">
                    Placement:
                  </span>{" "}
                  {placement}
                </p>
              )}

              {reference && (
                <p className="mb-2">
                  <span className="text-[#827872]">
                    Reference:
                  </span>{" "}
                  {reference.name}
                </p>
              )}

              {idea && (
                <p>
                  <span className="text-[#827872]">
                    Idea:
                  </span>{" "}
                  {idea}
                </p>
              )}

            </div>


            {/* PRICE + SUBMIT */}

            <div className="
              mt-6
              flex
              flex-col
              sm:flex-row
              items-start
              sm:items-center
              justify-between
              gap-5
            ">

              <div>

                <p className="text-xs text-[#827872]">
                  Custom design
                </p>

                <p className="text-2xl font-medium mt-1">
                  ₹{(1299 * quantity).toLocaleString("en-IN")}
                </p>

              </div>


              <button
                type="button"
                onClick={handleSubmit}
                className="
                  w-full
                  sm:w-auto
                  px-7
                  py-3.5
                  rounded-full
                  bg-[#bd6670]
                  text-white
                  text-sm
                  font-medium
                  hover:bg-[#a95560]
                  hover:scale-[1.02]
                  transition
                "
              >
                SUBMIT MY IDEA →
              </button>

            </div>

          </div>

        </section>

      )}

    </main>
  );
}


/* =========================================================
   SUMMARY ITEM
========================================================= */

function SummaryItem({ label, value }) {
  return (
    <div className="
      rounded-xl
      bg-[#f4f1eb]
      px-4
      py-3
    ">

      <p className="
        text-[10px]
        uppercase
        tracking-wider
        text-[#827872]
      ">
        {label}
      </p>

      <p className="
        text-sm
        font-medium
        mt-1
      ">
        {value}
      </p>

    </div>
  );
}

export default Customize;