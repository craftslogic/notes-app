import nodemailer from 'nodemailer';

const sendEmail = async (options) => {
  // 1) Transporter banayein
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER, 
      pass: process.env.EMAIL_PASSWORD, 
    },
  });

  
  const mailOptions = {
    from: 'Notes App <no-reply@notesapp.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
    
  };

  await transporter.sendMail(mailOptions);
};

export default sendEmail; // ES Module export

