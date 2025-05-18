// utils/sendEmail.js

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'yourgmail@gmail.com',
    pass: 'your_app_password'
  }
});


export default async function sendSessionEmail(toEmail, roomName) {
  const mailOptions = {
    from: 'yourgmail@gmail.com',
    to: toEmail,
    subject: 'Incoming Video Call Request',
    html: `<h3>New Video Call!</h3>
           <p>Click to join: <a href="https://yourfrontenddomain.com/room/${roomName}">Join Video Call</a></p>`
  };

  await transporter.sendMail(mailOptions);
}
