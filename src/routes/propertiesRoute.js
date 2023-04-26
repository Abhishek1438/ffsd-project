const express = require('express');
const propertyController = require('../controllers/properties');
const router = express.Router();
router.post('/remove/:id', propertyController.removeProperty);
router.get('/user/:id', propertyController.getPropertiesByUser);
module.exports = router;
