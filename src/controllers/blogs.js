const mongoose = require('mongoose');
const blogModel = require('../models/blog_model');

mongoose.connect('mongodb://0.0.0.0:27017/FFSD_DB');

exports.getAllBlogs = async (req, res, next) => {
  try {
    let blogArray = [];
    await blogModel.Blog.find({}).then((result) => {
      blogArray = result;
    });
    req.blogs = blogArray;
    return next();
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.getBlogBy_id = async (Blog_id) => {
  let t = await blogModel.Blog.findById(Blog_id);

  return t;
};

exports.insertBlog = async (req, res, Blog, newImage, user) => {
  let today = new Date();
  let day = today.toLocaleDateString('en-IN', { dateStyle: 'long' });
  await blogModel.Blog.create({
    title: Blog.blogTitle,
    content: Blog.blogContent,
    blogAuthor: user.name,
    blog_user_id: user._id,
    date: day,
    blogImage: newImage,
  });
};

exports.removeBlog = async (req, res) => {
  const blog_id = req.params.id;
  blogModel.Blog.deleteOne({ _id: blog_id }).then(() => console.log('deleted Blog'));
};
