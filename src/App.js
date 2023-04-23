const express = require('express');
const mysql = require('mysql2');
const doenv = require('dotenv');
const cookieParser = require('cookie-parser');
const userController = require('./controllers/users');

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const app = express();
app.use(jsonParser);

doenv.config({
  path: './.env',
});

// const db = mysql.createConnection({
//   host: process.env.DATABASE_HOST,
//   user: process.env.DATABASE_USER,
//   password: process.env.DATABASE_PASS,
//   database: process.env.DATABASE,
// });

// db.connect((err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('MySQL Connection Success');
//   }
// });

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/assets'));
app.set('view engine', 'ejs');

app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));
app.use('/properties', require('./routes/propertiesRoute'));
app.post('/wishlist/:propertyId', userController.isLoggedIn, userController.wishlist);

app.post('/certified/:userId/:change', userController.certified);
app.post('/admin/:userId/:change', userController.admin);

// app.use('/property', require('./routes/property'));

app.listen(3000, () => {
  console.log('Listening at port no 3000 ...');
});
