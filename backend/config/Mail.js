import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

// Create transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// OTP generation helper
const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

// Function to send OTP email
export const sendOtpEmail = async (toEmail, userName = "User") => {
  const otp = generateOtp();

  const mailOptions = {
    from: `"Fynk App 🎉" <${process.env.SMTP_USER}>`,
    to: toEmail,
    subject: "🔐 Reset Your Fynk Password",
    html: `
      <div style="font-family: Arial, sans-serif; text-align: center; padding: 30px;">
        <div style="max-width: 500px; margin: auto; background: #fff; border-radius: 15px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); padding: 30px;">
          <h1 style="color: #ff4d4d;">Hello, ${userName} 🎈</h1>
          <p>We received a request to reset your password.</p>
          <div style="margin: 25px 0;">
            <span style="
              display: inline-block;
              background: #1a1f23;
              color: #fff;
              font-size: 28px;
              font-weight: bold;
              padding: 15px 25px;
              border-radius: 10px;
              letter-spacing: 5px;
            ">${otp}</span>
          </div>
          <p>Enter this OTP in your Fynk app to continue.</p>
          <p style="margin-top: 20px; font-size: 14px; color: #888;">
            If you didn't request this, just ignore this email. 😎
          </p>
          <hr style="margin: 25px 0; border-color: #eee;" />
          <p style="font-size: 12px; color: #aaa;">Fynk App | Where Stories Begin</p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ OTP ${otp} sent to ${toEmail}`);
    return otp; // return OTP for storing in DB
  } catch (err) {
    console.error("❌ Error sending OTP:", err);
    throw err;
  }
};

export default transporter;
