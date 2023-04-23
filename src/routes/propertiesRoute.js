const express = require('express');
const propertyController = require('../controllers/properties');
const router = express.Router();
router.get('/', propertyController.getAllProperties);
// router.post('/', propertyController.insertProperty);
router.post('/remove/:id', propertyController.removeProperty);
router.get('/user/:id', propertyController.getPropertiesByUser);
router.get('/location/:location', propertyController.getPropertiesByLocation);
module.exports = router;
