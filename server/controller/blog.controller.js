const blogmodel = require('../model/blog');

const allBlogs = async (req, res) => {
  try {
    const blogList = await blogmodel.find();

    if (!blogList || blogList.length === 0) {
      return res.status(404).json({ message: "No blogs found" });
    }

    return res.status(200).json({ blogList });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return res.status(500).json({ message: "Server error while fetching blogs" });
  }
};

const addNewBlog = async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ message: "Title and description are required" });
  }

  const newBlog = new blogmodel({
    title,
    description,
    date: new Date(),
  });

  try {
    await newBlog.save();
    return res.status(201).json({ message: "Blog created successfully", blog: newBlog });
  } catch (error) {
    console.error("Error creating blog:", error);
    return res.status(500).json({ message: "Server error while creating blog" });
  }
};

const deleteABlog = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedBlog = await blogmodel.findByIdAndDelete(id);

    if (!deletedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    return res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return res.status(500).json({ message: "Server error while deleting blog" });
  }
};

const updateABlog = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ message: "Title and description are required" });
  }

  try {
    const updatedBlog = await blogmodel.findByIdAndUpdate(
      id,
      { title, description, date: new Date() },
      { new: true } // return the updated document
    );

    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    return res.status(200).json({ message: "Blog updated successfully", blog: updatedBlog });
  } catch (error) {
    console.error("Error updating blog:", error);
    return res.status(500).json({ message: "Server error while updating blog" });
  }
};

module.exports = {
  allBlogs,
  addNewBlog,
  deleteABlog,
  updateABlog
};
