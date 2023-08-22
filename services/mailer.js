// const sgMail = require("@sendgrid/mail");
// import { Client, SendEmailV3_1, LibraryResponse } from 'node-mailjet';
// const mailjet = require('node-mailjet')

// sgMail.setApiKey(process.env.SG_KEY);

// const sendSGMail = async ({
//   to,
//   sender,
//   subject,
//   html,
//   attachments,
//   text,
// }) => {
//   try {
//     const from = "shreyanshshah242@gmail.com";

//     const msg = {
//       to: to, // Change to your recipient
//       from: from, // Change to your verified sender
//       subject: subject,
//       html: html,
//       // text: text,
//       attachments,
//     };

    
//     return sgMail.send(msg);
//   } catch (error) {
//     console.log(error);
//   }
// };

const { MAILJET_API_KEY_PUBLIC, MAILJET_API_KEY_PRIVATE } = process.env;

console.log("1111111",MAILJET_API_KEY_PUBLIC, MAILJET_API_KEY_PRIVATE )
const mailjet = require("node-mailjet")
const client = mailjet.Client
const Email = process.env.MAILJET_ADMIN_EMAIL;
const Name = process.env.MAILJET_APPNAME; 

const mailjets = new client({
  apiKey:MAILJET_API_KEY_PUBLIC,
  apiSecret:MAILJET_API_KEY_PRIVATE,
  options: {
    timeout: 10000
  }
});

const sendSGMail = async ({ 
  to,
  sender,
  subject,
  html,
  attachments,
  text,
 }) => {
  console.log("to",to,"Email",Email,"Name",Name,)
  try {
    const request = await mailjets.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: { Email, Name },
          To: [{ Email: to }],
          Subject: subject,
          TextPart: text,
          HTMLPart: html,
        },
      ],
    });
    console.log("request",request)
    return { msg: "Email sent", status: true, data: request };
  } catch (e) {
    console.log(e.message);
    return { msg: e.message, status: false };
  }
};



exports.sendEmail = async (args) => {
  if (!process.env.NODE_ENV === "development") {
    return Promise.resolve();
  } else {
    return sendSGMail(args);
  }
};
