const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
const Blogroutes = require("./route/blog.route");

const app = express();
app.use(cors());
app.use(express.json());

app.use('/blog',Blogroutes);

mongoose.connect('mongodb://127.0.0.1:27017/mern-blog-app',)
.then(() => console.log('Connected! to MongoDB'));
// Start the server on port 3000
app.listen(3000, () => {
  try {
    console.log('Server is running on port 3000')
  } catch (error) {
    console.log('Server crash')
  }
});
