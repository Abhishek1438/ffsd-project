const express = require('express');
const blogController = require('../controllers/blogs');
const router = express.Router();
router.get('/', blogController.getAllBlogs);
router.post('/', blogController.insertBlog);
router.get('/user/:id', blogController.getBlogBy_id);
module.exports = router;