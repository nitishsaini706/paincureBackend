const Blogs = require('../service/BlogsService');

// Create a new comment
const createComment = async (req, res) => {
  try {
    const content = req.body;
    const user = req.user;

    const newComment = await Blogs.createBlog(content,user); 
    if(newComment.length == 0){
      
      return res.status(400).json({ message: 'Not able to create Blog' });
    }
    return res.status(200).json({ message: 'Blog created successfully.' });
  } catch (error) {
    console.error("error in creating Blogs",error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const updateComment = async (req, res) => {
    try {
      const { id } = req.params;
      const data = req.body;
      const user = req.user;
  
      const comment = await Comment.updateBlog(id,data, user);
  
      if (!comment) {
        return res.status(200).json({ message: 'Blog not found.' });
      }
  
      return res.status(200).json({ message: 'Blog updated successfully.' });
    } catch (error) {
      console.error("error in updating blogs",error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  // Delete a comment
  const deleteComment = async (req, res, next) => {
    try {
      const { slug } = req.params;
  
      const Blog = await Blogs.deleteBlog(slug);
  
      if (Blog.length == 0) {
        return res.status(200).json({ message: 'Blog not found.' });
      }
  
      return res.status(200).json({ message: 'Blog deleted successfully.' });
    } catch (error) {
      console.error("error in deleting ublog",error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  const getBlogsByUser = async (req,res) => {
    try {
      const user = req.user;
  
      const blogs = await Blogs.getBlogsByUser(user);
      console.log('blogs', blogs)
      if (!blogs) {
        return res.status(200).json({ message: 'Blogs not found.' });
      }
      for(let blog of blogs){
        blog.image = `${req.protocol}://${req.get('host')}/${blog.image}`;
      }
      return res.status(200).json({ message: 'Blogs fetched successfully.',blogs:blogs });     
    } catch (error) {
      console.error("erorr in gettting blog by users",error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
  const getBlogsById = async (req,res) => {
    try {
      const user = req.user;
  
      const id = req.params;
      if (!id) {
        return res.status(200).json({ message: 'id not found.' });
      }
      const blog = await Blogs.getById(id);
      if (Object.keys(blog).length) {
        return res.status(200).json({ message: 'Blog not found for this slug.' });
      }

      blog.image = `${req.protocol}://${req.get('host')}/${blog.image}`;
      return res.status(200).json({ message: 'Blog fetched successfully.',blogs:blog });     
    } catch (error) {
      console.error("erorr in gettting blog by users",error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };

  module.exports={
    deleteComment,
    updateComment,
    createComment,
    getBlogsByUser,
    getBlogsById
  }