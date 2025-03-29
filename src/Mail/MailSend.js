const nodemailer = require("nodemailer");
require('dotenv').config();


exports.verifyUser = (name,email,randomotp)=>{

    const transporter = nodemailer.createTransport({
        service: "gmail",
        secure: true, 
        port: 465,
        auth: {
          user: process.env.NodeMailerEmail,
          pass: process.env.NodeMailerPassword,
        },
      });



      async function main() {
        // send mail with defined transport object
        const info = await transporter.sendMail({
          from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
          to: email, // list of receivers
          subject: "OTP Verification ✔", // Subject line
          text: "Your OTP verification code is " + randomotp, // plain text body
          html: `
            <html>
              <head>
                <style>
                  body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f7fc;
                    color: #333;
                    padding: 20px;
                  }
                  .email-container {
                    background-color: #ffffff;
                    border-radius: 8px;
                    padding: 30px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    max-width: 600px;
                    margin: auto;
                  }
                  .email-header {
                    text-align: center;
                    margin-bottom: 20px;
                  }
                  .email-header h1 {
                    color: #4CAF50;
                  }
                  .otp-code {
                    background-color: #f0f8ff;
                    padding: 15px;
                    text-align: center;
                    font-size: 24px;
                    font-weight: bold;
                    color: #333;
                    border-radius: 8px;
                    margin-top: 20px;
                  }
                  .footer {
                    text-align: center;
                    font-size: 12px;
                    color: #888;
                    margin-top: 30px;
                  }
                  .footer a {
                    color: #4CAF50;
                    text-decoration: none;
                  }
                </style>
              </head>
              <body>
                <div class="email-container">
                  <div class="email-header">
                    <h1>OTP Verification</h1>
                    <p>Hello ${name},</p>
                    <p>Thank you for using our service! Please use the OTP below to verify your account.</p>
                  </div>
                  <div class="otp-code">
                    <span>Your OTP Code: ${randomotp}</span>
                  </div>
                  <div class="footer">
                    <p>If you did not request this verification, please ignore this email.</p>
                    <p>Thank you for choosing our service.</p>
                    <p><a href="https://www.yourwebsite.com" target="_blank">Visit our website</a></p>
                  </div>
                </div>
              </body>
            </html>
          `, // html body
        });
      
        console.log("Message sent: %s", info.messageId);
      }
      
      
      main().catch(console.error);

}