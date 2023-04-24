const nodemailer = require('nodemailer');
const mongoose = require('mongoose');

const mailSchema = new mongoose.Schema({
  mail: String,
});

const Mail = new mongoose.model('mail', mailSchema);

exports.addMail = async (req, res) => {
  const mailId = req.params.mailId;

  const newMailObject = Mail({
    mail: mailId,
  }).save();
  //send signup mail

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'propertywala1438@gmail.com',
      pass: 'iyyrlbeuvoxunvnu',
    },
  });

  console.log(mailId);

  // setup email data with unicode symbols
  let mailOptions = {
    from: 'propertywala1438@gmail.com', // sender address
    to: mailId, // list of receivers
    subject: 'Welcome to our service!', // Subject line
    text: 'Thank you for signing up! to our Newsletter', // plain text body
    html: '<b>Thank you for signing up!</b>', // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

  res.end();
};
