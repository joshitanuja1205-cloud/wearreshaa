
const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

// Replace this with an address on your verified Resend domain.
const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
const ADMIN_EMAIL = "reshaa.apparels23@gmail.com";

const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(amount ?? 0);

const sendOrderEmails = async (order, customerEmail) => {
    console.log("📧 Resend API key loaded:", Boolean(process.env.RESEND_API_KEY));
console.log("📧 Customer email available:", Boolean(customerEmail));
console.log("📧 Sender email:", FROM_EMAIL);
  if (!process.env.RESEND_API_KEY) {
  console.error("❌ Resend API key is missing in the running server.");
  return;
}

if (!FROM_EMAIL) {
  console.error("❌ Resend sender email is missing.");
  return;
}

  const itemsHtml = order.items
    .map(
      (item) => `
        <li>
          ${item.name} — Qty: ${item.quantity}
          ${item.size ? ` — Size: ${item.size}` : ""}
          — ${formatCurrency(item.price * item.quantity)}
        </li>
      `
    )
    .join("");

  const address = order.shippingAddress;
  const addressText =
    typeof address === "string"
      ? address
      : Object.entries(address || {})
          .filter(([, value]) => value)
          .map(([key, value]) => `${key}: ${value}`)
          .join(", ");

  const commonHtml = `
    <h2>RESHAA — Order #${order._id}</h2>
    <p>Thank you for shopping with RESHAA!</p>
    <h3>Order items</h3>
    <ul>${itemsHtml}</ul>
    <p>Subtotal: ${formatCurrency(order.subtotal)}</p>
    <p>Shipping: ${order.shippingFee === 0 ? "Free" : formatCurrency(order.shippingFee)}</p>
    <p><strong>Total: ${formatCurrency(order.totalAmount)}</strong></p>
    <p>Payment method: ${order.paymentMethod}</p>
    <p>Shipping address: ${addressText || "See your account for details"}</p>
  `;

  const results = await Promise.allSettled([
    customerEmail
      ? resend.emails.send({
          from: FROM_EMAIL,
          to: [customerEmail],
          subject: `Your RESHAA order confirmation — #${order._id}`,
          html: commonHtml,
        })
      : Promise.reject(new Error("Customer email is missing")),

    resend.emails.send({
      from: FROM_EMAIL,
      to: [ADMIN_EMAIL],
      subject: `New RESHAA order — #${order._id}`,
      html: `<h2>A new order has been placed!</h2>${commonHtml}
        <p>Customer email: ${customerEmail || "Unavailable"}</p>`,
    }),
  ]);

  results.forEach((result, index) => {
    if (result.status === "rejected") {
      console.error(
        `Order email ${index === 0 ? "to customer" : "to admin"} failed:`,
        result.reason?.message || result.reason
      );
    } else if (result.value?.error) {
      console.error(
        `Order email ${index === 0 ? "to customer" : "to admin"} failed:`,
        result.value.error.message
      );
    }
  });
};

module.exports = { sendOrderEmails };
