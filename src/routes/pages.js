const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const userContoller = require('../controllers/users');
const propertyController = require('../controllers/properties');
const multer = require('multer');
const { join } = require('path');

router.use(bodyParser.urlencoded({ extended: true }));

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ['image/jpeg', 'image/png', 'image/gif'];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

// const storage_property = multer.diskStorage({
//   destination: function(req, file, cb) {
//     cb(null, join(__dirname, "..", "assets", "Uploads", "property-images"));
//   },
//   filename: function(req, file, cb) {
//     cb(null, Date.now() + '-' + file.originalname);
//   }
// });

// const storage_blogs = multer.diskStorage({
//   destination: function(req, file, cb) {
//     cb(null, __dirname+'/src/assets/Uploads/property-images');
//   },
//   filename: function(req, file, cb) {
//     cb(null, Date.now() + '-' + file.originalname+'propertyImage');
//   }
// });


// const upload_property = multer({ storage: storage_property }).array('propertyImages');


router.get('/', userContoller.isLoggedIn, async (req, res) => {
  let a = await propertyController.getAllProperties();
  res.render('index', { user: req.user, propertyArray: a });
});

router.get('/login', (req, res) => {
  res.render('login', { msg: null });
});

router.get('/register', (req, res) => {
  res.render('register', { msg: null });
});

router.get('/properties/:type', userContoller.isLoggedIn, async (req, res) => {
  const type = req.params.type;
  let a = await propertyController.getAllProperties();
  res.render('properties', { property: { type }, user: req.user, propertyArray: a });
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

router.get('/property-details/:_id', userContoller.isLoggedIn, async (req, res) => {
  let property_id = req.params._id;
  property = await propertyController.getPropertyBy_id(property_id);
  res.render('propertyDetails', { user: req.user, property });
});

router.get('/user-profile', userContoller.isLoggedIn, (req, res) => {
  res.render('userProfile', { user: req.user });
});

router.get('/list-property', userContoller.isLoggedIn, (req, res) => {
  res.render('list-property', { user: req.user });
});


// router.post('/list-property', async (req, res) => {

//   let propertyDetails = req.body;
//   // await propertyController.insertProperty(req,res,propertyDetails);
//   console.log(propertyDetails);
//   console.log(req.files);

//   upload_property(req, res, (err) => {
//     if (err) {
//       console.log(err);
//       // return res.status(500).json({ message: 'Failed to upload images' });
//     }
//     console.log(req.files);
//     // res.status(200).json({ message: 'Images uploaded successfully' });
//   });
//   res.send("The property has been successsfully listed!");
// });


router.post('/list-property', upload.array('propertyImages', 5),userContoller.isLoggedIn, async function (req, res){
  
    

    // const property = await propertyController.getPropertyBy_id(property_id);
    // if (!property) {
    //   return res.status(404).json({ error: 'Property not found' });
    // }
    const newImages = req.files.map(file => {
      return {
        data: file.buffer,
        contentType: file.mimetype,
      };
    });
    let propertyDetails = req.body;
    console.log(propertyDetails);
    await propertyController.insertProperty(req, res, propertyDetails,newImages,req.user);


  res.send("The property has been successsfully listed!");

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
    res.render('index', { user: req.user, propertyName });
  } else {
    res.redirect('/login');
  }
});

module.exports = router;
