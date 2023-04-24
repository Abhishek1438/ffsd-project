const mongoose = require('mongoose');
const propertyModel = require('../models/property_model');

// mongoose.connect(
//   'mongodb+srv://Neam:Neelesh33@neam0.et8d59h.mongodb.net/FFSD_DB?retryWrites=true&w=majority'
// );

mongoose.connect('mongodb://0.0.0.0:27017/FFSD_DB');
const { Schema } = mongoose;

exports.getAllProperties = async (req, res, next) => {
  try {
    let propertyArray = [];
    await propertyModel.Property.find({}).then((result) => {
      propertyArray = result;
    });
    // res.send(propertyArray);
    req.properties = propertyArray;
    return next();
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

exports.getAllPropertiesByType = async (type, location) => {
  let propertyArray = [];
  if (location == 'undefined') {
    await propertyModel.Property.find({ purpose: type,}).then((result) => {
      propertyArray = result;
    });
  } else {
    await propertyModel.Property.find({

      $or: [
        { location: { $regex: new RegExp(location, "i")}, },
        { name: { $regex: new RegExp(location, "i") } }
      ],
      
      purpose: type
    }).then(( results) => {
       propertyArray = results;
      
    });
  }
  return propertyArray;
  
};


exports.getPropertiesByFilters = async (type, location,query) => {

  let query1 = {purpose:type};

    if (typeof query.bedsNum !== "undefined") {
      query1.bedsNum = query.bedsNum;
    }
    
    if (typeof query.propertyType !== "undefined") {
      query1.propertyType = query.propertyType;
    }

  let sorter = {};
  if(query.price == 'lh'){
    sorter.price = 1
  }else if(query.price == 'hl'){
    sorter.price = -1
  }
  let propertyArray = [];
  if (location == 'undefined' && Object.keys.length ==0) {
    console.log("c1");
    await propertyModel.Property.find({ purpose: type,}).then((result) => {
      propertyArray = result;
    });
  } 
  else if (location !='undefined' && Object.keys(query).length !=0) {
    query1.$or = [];
    query1.$or.push({ location: { $regex: new RegExp(location, "i")}, });
    query1.$or.push({ name: { $regex: new RegExp(location, "i") } });

    propertyArray = await propertyModel.Property.find(query1).sort(sorter).exec();

  }
  else if(location == 'undefined' && Object.keys.length !=0){
    console.log("c3");
    console.log(query.bedsNum);
    console.log(query.propertyType);
    
    propertyArray = await propertyModel.Property.find(query1).sort(sorter).exec();
  }
  else{
    console.log("c4");
  }
  return propertyArray;
};
// exports.createProperty = async (req, res) => {
//   //check if property already exists or not

//   const { name, userName, type, location } = req.body;
//   const property = await new Property({
//     name,
//     userName,
//     type,
//     location,
//   }).save();
//   console.log(property);
//   console.log('property added successfully');
//   res.send('Property added successfully');
//   //   return res.render('register', {
//   //     msg: 'User Registration Success, Login now',
//   //     msg_type: 'good',
//   //   });
// };

exports.getPropertyBy_id = async (property_id) => {
  let t = await propertyModel.Property.findById(property_id);
  return t;
};

exports.getPropertiesByLocation = async (req, res) => {
  const location = req.params.location;
  const properties = await Property.find({ location });
  console.log(properties);
  res.send(properties);
};

exports.getPropertiesByUser = async (req, res) => {
  const userId = req.params.id;
  const properties = await propertyModel.Property.find({ user_id: userId });
  console.log(properties);
  res.send(properties);
};

exports.getPropertiesByUser_id = (userId) => {
  console.log(userId);
};

exports.insertProperty = async (req, res, property, newImages, user) => {
  await propertyModel.Property.create({
    name: property.propertyName,
    price: property.propertyPrice,
    location: property.propertyCity,
    locality: property.propertyLocality,
    bedsNum: property.bedsNum,
    bathsNum: property.bathsNum,
    area: property.propertyArea,
    purpose: property.propertyPurpose,
    description: property.propertyDescription,
    parkingArea: property.propertyParking,
    propertyType: property.propertyType,
    propertyImage: newImages,
    yearBuilt: property.yearBuilt,
    lotSize: property.lotSize,
    lister: {
      name: property.listerName,
      description: property.listerDescription,
      relation: property.listerRelation,
      mobileNumber: property.listerMobileNumber,
      email: property.listerEmail,
    },
    user_id: user,
  });
};

exports.removeProperty = async (req, res) => {
  const propertyId = req.params.id;
  propertyModel.Property.deleteOne({ _id: propertyId }).then(() => console.log('deleted'));
};
