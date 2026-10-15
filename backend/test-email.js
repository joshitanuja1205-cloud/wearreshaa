
require("dotenv").config({ path: "./.env" });

const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

async function testEmail() {
  if (!process.env.RESEND_API_KEY) {
    console.error("❌ RESEND_API_KEY is missing from backend/.env");
    return;
  }

  try {
    const result = await resend.emails.send({
      from: "RESHAA Test <onboarding@resend.dev>",
      to: ["reshaa.apparels23@gmail.com"],
      subject: "RESHAA email setup test",
      html: `
        <h2>Email setup test 💗</h2>
        <p>Your RESHAA backend is testing its connection to Resend.</p>
        <p>This is only a test email, not an order confirmation.</p>
      `,
    });

    if (result.error) {
      console.error("❌ Resend rejected the email:", result.error.message);
      return;
    }

    console.log("✅ Resend accepted the test email request.");
    console.log("Email ID:", result.data?.id);
    console.log("Check Resend → Emails for delivery status.");
  } catch (error) {
    console.error("❌ Email test failed:", error.message);
  }
}

testEmail();
