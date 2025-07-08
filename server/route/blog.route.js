const express = require('express');
const router = express.Router();

const {allBlogs,addNewBlog,deleteABlog,updateABlog} = require('../controller/blog.controller');

// Define routes for blog operations
router.get("/", allBlogs);
router.post("/add", addNewBlog);
router.put("/update/:id", updateABlog);
router.delete("/delete/:id", deleteABlog);

module.exports = router

