const nodemailer = require('nodemailer');
const mongoose = require('mongoose');

const user_model = require('../models/user_model');

const mailSchema = new mongoose.Schema({
  mail: String,
});

const Mail = new mongoose.model('mail', mailSchema);

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'propertywala1438@gmail.com',
    pass: 'iyyrlbeuvoxunvnu',
  },
});

exports.addMail = async (req, res) => {
  const mailId = req.params.mailId;

  const newMailObject = Mail({
    mail: mailId,
  }).save();
  //send signup mail

  // create reusable transporter object using the default SMTP transport

  console.log(mailId);

  // setup email data with unicode symbols
  let mailOptions = {
    from: 'propertywala1438@gmail.com', // sender address
    to: mailId, // list of receivers
    subject: 'Welcome to our service!', // Subject line
    html: '<b>Thank you for signing up! to our Newsletter</b>', // html body
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

exports.sendMailAll = async (req, res) => {
  const subject = req.body.subject;
  const content = req.body.content;

  const users = await user_model.User.find({});
  const userMails = users.map((user) => user.email);

  // setup email data with unicode symbols
  userMails.forEach((mail) => {
    console.log(mail);
    let mailOptions = {
      from: 'propertywala1438@gmail.com', // sender address
      to: mail, // list of receivers
      subject: subject, // Subject line
      html: content, // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  });

  // send mail with defined transport object

  res.redirect('/admin-control');
};