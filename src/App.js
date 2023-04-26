const express = require('express');
const doenv = require('dotenv');
const cookieParser = require('cookie-parser');
const userController = require('./controllers/users');
const mailController = require('./controllers/mail');

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const app = express();
app.use(jsonParser);

doenv.config({
  path: './.env',
});

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/assets'));
app.set('view engine', 'ejs');

app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));
app.use('/properties', require('./routes/propertiesRoute'));
app.use('/blogs', require('./routes/blogsRoute'));
app.post('/wishlist/:propertyId', userController.isLoggedIn, userController.wishlist);
app.post('/mail/:mailId', mailController.addMail);
app.post('/allMail', mailController.sendMailAll);

app.post('/certified/:userId/:change', userController.certified);
app.post('/admin/:userId/:change', userController.admin);

app.listen(3000, () => {
  console.log('Listening at port no 3000 ...');
});
