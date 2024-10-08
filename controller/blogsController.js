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
    return res.status(500).json({ message: error });
  }
};

const updateComment = async (req, res) => {
    try {
      const { slug } = req.params;
      if(!slug){
        return res.status(400).json({ message: 'Slug not found.' });

      }
      const data = req.body;
      const user = req.user;
  
      const comment = await Blogs.updateBlog(slug,data, user);
  
      if (comment.length == 0) {
        return res.status(200).json({ message: 'Blog not found.' });
      }
  
      return res.status(200).json({ message: 'Blog updated successfully.' });
    } catch (error) {
      console.error("error in updating blogs",error);
      return res.status(500).json({ message: error });
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
      return res.status(500).json({ message: error });
    }
  };
  
  const getBlogsByUser = async (req,res) => {
    try {
      const user = req.user;
  
      const blogs = await Blogs.getBlogsByUser(user);
      console.log('blogs', blogs)
      if (blogs.length == 0) {
        return res.status(200).json({ message: 'Blogs not found.' });
      }
      // for(let blog of blogs){
      //   blog.image = `${req.protocol}://${req.get('host')}/${blog.image}`;
      // }
      return res.status(200).json({ message: 'Blogs fetched successfully.',blogs:blogs });     
    } catch (error) {
      console.error("erorr in gettting blog by users",error);
      return res.status(500).json({ message: error });
    }
  };
  const getBlogsById = async (req,res) => {
    try {
      const user = req.user;
      const {slug} = req.params;
      console.log('slug', slug)
      if (!slug) {
        return res.status(200).json({ message: 'slug not found.' });
      }
      const blog = await Blogs.getById(slug);
      if (Object.keys(blog).length == 0) {
        return res.status(200).json({ message: 'Blog not found for this slug.' });
      }

      // blog.image = `${req.protocol}://${req.get('host')}/${blog.image}`;
      return res.status(200).json({ message: 'Blog fetched successfully.',blog:blog });     
    } catch (error) {
      console.error("erorr in gettting blog by users",error);
      return res.status(500).json({ message: error });
    }
  };
const getBlogWeb = async (req,res) => {
    try {
      
      const blog = await Blogs.getForWeb();
      if (blog.length == 0) {
        return res.status(200).json({ message: 'Blog not present.' });
      }

      // blog.image = `${req.protocol}://${req.get('host')}/${blog.image}`;
      return res.status(200).json({ message: 'Blog fetched successfully.',blog:blog });     
    } catch (error) {
      console.error("erorr in gettting blog by users",error);
      return res.status(500).json({ message: error });
    }
};
const getBlogByTitle = async (req,res) => {
    try {
      
      const {title} = req.body;
      
      if (!title) {
        return res.status(200).json({ message: 'title not found.' });
      }
      const blog = await Blogs.searchByTitle(title);
      if (blog.length == 0) {
        return res.status(200).json({ message: 'Blog not found for this slug.' });
      }

      // blog.image = `${req.protocol}://${req.get('host')}/${blog.image}`;
      return res.status(200).json({ message: 'Blog fetched successfully.',blog:blog });     
    } catch (error) {
      console.error("erorr in gettting blog by users",error);
      return res.status(500).json({ message: error });
    }
};

  module.exports={
    deleteComment,
    updateComment,
    createComment,
    getBlogsByUser,
    getBlogsById,
    getBlogByTitle,
    getBlogWeb
  }