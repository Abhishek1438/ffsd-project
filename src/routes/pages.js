const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const userContoller = require('../controllers/users');
const propertyController = require('../controllers/properties');
const blogController = require('../controllers/blogs');
const multer = require('multer');
const { join } = require('path');
const propertyModel = require('../models/property_model');
const userModel = require('../models/user_model');

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

const blog_upload = multer({ storage });


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

router.get('/', userContoller.isLoggedIn, propertyController.getAllProperties, async (req, res) => {
  res.render('index', { user: req.user, propertyArray: req.properties });
});

router.get('/login', (req, res) => {
  res.render('login', { msg: null });
});

router.get('/register', (req, res) => {
  res.render('register', { msg: null });
});

router.get('/show-properties/:type/:location?', userContoller.isLoggedIn, async (req, res) => {
  const type = req.params.type;
  const location = req.params.location;
  let properties = await propertyController.getAllPropertiesByType(type, location);
  res.render('properties', { property: { type }, user: req.user, propertyArray: properties });
});

router.get('/blogs', userContoller.isLoggedIn,blogController.getAllBlogs, (req, res) => {
  let blogArray = req.blogs;
  res.render('blogs', { user: req.user , blogArray});
});

router.get('/blog/:id', userContoller.isLoggedIn, async (req, res) => {
  const id = req.params.id;
  let blog = await blogController.getBlogBy_id(id);
  res.render('blogDetails', { blog: blog, user: req.user });
});

router.get('/my-properties', userContoller.isLoggedIn, (req, res) => {
  res.render('myProperties', { user: req.user });
});

router.get('/property-details/:_id', userContoller.isLoggedIn, async (req, res) => {
  let property_id = req.params._id;
  property = await propertyController.getPropertyBy_id(property_id);
  let favButton = 'Favourite';
  const wishlistPropertiesId = await userModel.User.findById(req.user.id).then(
    (user) => user.wishlist
  );
  if (wishlistPropertiesId.includes(property_id)) {
    favButton = 'Remove from Favourite';
  }

  res.render('propertyDetails', { user: req.user, property, favButton });
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

router.post(
  '/list-property',
  userContoller.isLoggedIn,
  upload.array('propertyImages', 5),
  userContoller.isLoggedIn,
  async function (req, res) {
    // const property = await propertyController.getPropertyBy_id(property_id);
    // if (!property) {
    //   return res.status(404).json({ error: 'Property not found' });
    // }

    if (!req.user) {
      res.redirect('/login');
    } else {
      const newImages = req.files.map((file) => {
        return {
          data: file.buffer,
          contentType: file.mimetype,
        };
      });
      let propertyDetails = req.body;
      console.log(propertyDetails);
      await propertyController.insertProperty(req, res, propertyDetails, newImages, req.user);

      res.send('The property has been successsfully listed!');
    }
  }
);

router.get('/compose-blog',userContoller.isLoggedIn,(req,res)=>{
  res.render('composeBlog',{user:req.user});
});

router.post(
  '/post-blog',
  userContoller.isLoggedIn,
  blog_upload.single('blogImage'),
  async function (req, res) {
    if (!req.user) {
      res.redirect('/login');
    } else {
      const newBlogImage = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      };
      let blogDetails = req.body;
      console.log(blogDetails);
      console.log(req.file);
      await blogController.insertBlog(req, res, blogDetails, newBlogImage, req.user);

      res.send("Your blog has been successfully posted!");
    }
  }
);


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

router.get('/profile', userContoller.isLoggedIn, async (req, res) => {
  const userId = req.user._id;
  const properties = await propertyModel.Property.find({ user_id: userId });
  const wishlistPropertiesId = await userModel.User.findById(userId).then((user) => user.wishlist);
  const wishlistProperties = await propertyModel.Property.find({ _id: { $in: req.user.wishlist } });

  if (req.user) {
    res.render('profile', { user: req.user, myProperties: properties, wishlistProperties });
  } else {
    res.redirect('/login');
  }
});

module.exports = router;
