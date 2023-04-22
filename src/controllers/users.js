const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const mongoose = require('mongoose');
// mongoose.connect(
//   'mongodb+srv://Neam:Neelesh33@neam0.et8d59h.mongodb.net/FFSD_DB?retryWrites=true&w=majority'
// );

mongoose.connect('mongodb://0.0.0.0:27017/FFSD_DB');
const { Schema } = mongoose;

const users = new Schema({
  name: String,
  email: String,
  password: String,
  isAdmin: Boolean,
  isCertified: Boolean,
});

const User = mongoose.model('User', users);

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).render('login', {
        msg: 'Please Enter Your Email and Password',
        msg_type: 'error',
      });
    }

    // check if the user exists
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.render('register', {
        msg: 'Email not registered, register first',
        msg_type: 'error',
      });
    } else {
      if (!(await bcrypt.compare(password, user.password))) {
        return res.status(401).render('login', {
          msg: 'Incorrect password!',
          msg_type: 'error',
        });
      } else {
        const id = user._id;
        const token = jwt.sign({ id: id }, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRES_IN,
        });
        console.log('The Token is ' + token);
        const cookieOptions = {
          expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
          httpOnly: true,
        };
        res.cookie('joes', token, cookieOptions);
        return res.status(200).redirect('/');
      }
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};
exports.register = async (req, res) => {
  var lowerCaseLetters = /[a-z]/g;
  var upperCaseLetters = /[A-Z]/g;
  var numbers = /[0-9]/g;

  const { name, email, password } = req.body;

  if (
    !password.match(lowerCaseLetters) ||
    !password.match(upperCaseLetters) ||
    !password.match(numbers) ||
    password.length < 8
  ) {
    return res.render('register', {
      msg: 'Password should contain lower case, upper case, number and minimum of length 8',
      msg_type: 'error',
    });
  }
  try {
    // check if the user exists
    const user = await User.findOne({ email: email });
    if (user) {
      return res.render('register', {
        msg: 'Email id already Taken',
        msg_type: 'error',
      });
    }
  } catch (error) {
    res.status(400).json({ error });
  }

  let hashedPassword = await bcrypt.hash(password, 8);

  const user = await new User({
    name,
    email,
    password: hashedPassword,
    isAdmin: false,
    isCertified: false,
  }).save();
  console.log(user);
  console.log('registered');
  return res.render('register', {
    msg: 'User Registration Success, Login now',
    msg_type: 'good',
  });
};

exports.isLoggedIn = async (req, res, next) => {
  if (req.cookies.joes) {
    try {
      const decode = await promisify(jwt.verify)(req.cookies.joes, process.env.JWT_SECRET);
      console.log(decode);
      const user = await User.findOne({ _id: decode.id });
      if (!user) {
        return next();
      }
      req.user = user;
      return next();
    } catch (error) {
      console.log(error);
      return next();
    }
  } else {
    next();
  }
};

exports.logout = async (req, res) => {
  res.cookie('joes', 'logout', {
    expires: new Date(Date.now() + 2 * 1000),
    httpOnly: true,
  });
  res.status(200).redirect('/');
};
