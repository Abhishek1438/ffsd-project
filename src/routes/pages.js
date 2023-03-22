const express = require('express');
const router = express.Router();
const userContoller = require('../controllers/users');

router.get('/', userContoller.isLoggedIn, (req, res) => {
  // console.log(req.user);
  res.render('index', { user: req.user });
});

router.get('/login', (req, res) => {
  res.render('login', { msg: null });
});

router.get('/register', (req, res) => {
  res.render('register', { msg: null });
});

router.get('/properties/:type', userContoller.isLoggedIn, (req, res) => {
  const type = req.params.type;
  res.render('properties', { property: { type }, user: req.user });
});

router.get('/blogs', userContoller.isLoggedIn, (req, res) => {
  res.render('blogs', { user: req.user });
});

router.get('/blog/:id', userContoller.isLoggedIn, (req, res) => {
  const id = req.params.id;
  res.render('blogDetails', { blog: { id }, user: req.user });
});

router.get('/my-properties', userContoller.isLoggedIn, (req, res) => {
  res.render('myProperties', { user: req.user });
});

router.get('/user-profile', userContoller.isLoggedIn, (req, res) => {
  res.render('userProfile', { user: req.user });
});

router.get('/list-property', userContoller.isLoggedIn, (req, res) => {
  res.render('list-property', { user: req.user });
});

router.get('/pricing-plans', userContoller.isLoggedIn, (req, res) => {
  res.render('pricingPlan', { user: req.user });
});

router.get('/FAQ', userContoller.isLoggedIn, (req, res) => {
  res.render('FAQ', { user: req.user });
});

router.get('/terms-of-service', userContoller.isLoggedIn, (req, res) => {
  res.render('termsOfService', { user: req.user });
});

router.get('/trust-and-safety', userContoller.isLoggedIn, (req, res) => {
  res.render('trustAndSafety', { user: req.user });
});

router.get('/privacy-policy', userContoller.isLoggedIn, (req, res) => {
  res.render('privacyPolicy', { user: req.user });
});

router.get('/about-us', userContoller.isLoggedIn, (req, res) => {
  res.render('aboutUs', { user: req.user });
});

router.get('/help', userContoller.isLoggedIn, (req, res) => {
  res.render('help', { user: req.user });
});

router.get('/profile', userContoller.isLoggedIn, (req, res) => {
  if (req.user) {
    res.render('profile', { user: req.user });
  } else {
    res.redirect('/login');
  }
});
router.get('/home', userContoller.isLoggedIn, (req, res) => {
  //console.log(req.name);
  if (req.user) {
    res.render('index', { user: req.user });
  } else {
    res.redirect('/login');
  }
});

module.exports = router;
