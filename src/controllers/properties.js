const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/ffsd');
const { Schema } = mongoose;

const property = new Schema({
  name: String,
  userName: String,
  type: String,
  location: String,
});

const Property = mongoose.model('Property', property);

exports.getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find({});
    console.log(properties);
    res.send(properties);
    //   if (!user) {
    //     return res.render('register', {
    //       msg: 'Email not registered, register first',
    //       msg_type: 'error',
    //     });
    //   } else {
    //     if (!(await bcrypt.compare(password, user.password))) {
    //       return res.status(401).render('login', {
    //         msg: 'Incorrect password!',
    //         msg_type: 'error',
    //       });
    //     } else {
    //       const id = user._id;
    //       const token = jwt.sign({ id: id }, process.env.JWT_SECRET, {
    //         expiresIn: process.env.JWT_EXPIRES_IN,
    //       });
    //       console.log('The Token is ' + token);
    //       const cookieOptions = {
    //         expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
    //         httpOnly: true,
    //       };
    //       res.cookie('joes', token, cookieOptions);
    //       return res.status(200).redirect('/');
    //     }
    //   }
  } catch (error) {
    res.status(400).json({ error });
  }
};
exports.createProperty = async (req, res) => {
  //check if property already exists or not

  const { name, userName, type, location } = req.body;
  const property = await new Property({
    name,
    userName,
    type,
    location,
  }).save();
  console.log(property);
  console.log('property added successfully');
  res.send('Property added successfully');
  //   return res.render('register', {
  //     msg: 'User Registration Success, Login now',
  //     msg_type: 'good',
  //   });
};

exports.getPropertiesByLocation = async (req, res) => {
  const location = req.params.location;
  const properties = await Property.find({ location });
  console.log(properties);
  res.send(properties);
};

exports.getPropertiesByUser = async (req, res) => {
  const userId = req.params.id;
  const properties = await Property.find({ userId });
  console.log(properties);
  res.send(properties);
};
