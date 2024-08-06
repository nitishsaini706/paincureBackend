const patients = require('../service/AvailabilityService');

// Create a new comment
const createAvail = async (req, res) => {
  try {
    // Check if user already exists
    const user = req.user;
    let existingUser = await patients.findAvail(user);
    if (Object.keys(existingUser).length > 0) {
      return res.status(200).json({ message: 'Availability entry exists.' });
    }
    // Create new user
    const avail = await patients.createAvailService(user);
    if(avail.length > 0){

      return res.status(200).json({ message: 'Availability created successfully.' });
    }
    
    return res.status(401).json({ message: 'Availability created failed.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const updateComment = async (req, res) => {
    try {
      const data = req.body;
      const user = req.user;
      let existingUser = await patients.findAvail(user);
        if (Object.keys(existingUser).length == 0) {
        return res.status(400).json({ message: 'Availability does not exists for this user.' });
        }
  
      const comment = await patients.updateUser(user.userId, data);
  
      if (comment.length == 0) {
        return res.status(200).json({ message: 'Availability not updated.' });
      }
  
      return res.status(200).json({ message: 'Availability data updated successfully.' });
    } catch (error) {
      console.error("error in updating Availability",error);
      return res.status(500).json({ message: error });
    }
  };
  
  // Delete a comment
  const deleteComment = async (req, res) => {
    try {
      const { id } = req.params;
  
      const Blog = await patients.deleteUser(id);
  
      if (Blog.length == 0) {
        return res.status(200).json({ message: 'Patient not found.' });
      }
  
      return res.status(200).json({ message: 'Patient data deleted successfully.' });
    } catch (error) {
      console.error("error in deleting ublog",error);
      return res.status(500).json({ message: error });
    }
  };
  
  const getAvailByUser = async (req,res) => {
    try {
      const user = req.user;
    
      const blogs = await patients.getpatientsforDoc(user.userId);
      
      if (blogs.length == 0) {
        return res.status(200).json({ message: 'Availability not found.' });
      }
      // for(let blog of blogs){
      //   blog.image = `${req.protocol}://${req.get('host')}/${blog.image}`;
      // }
      return res.status(200).json({ message: 'Availability fetched successfully.',Availability:blogs });     
    } catch (error) {
      console.error("erorr in gettting Availability by users",error);
      return res.status(500).json({ message: error });
    }
  };
  const getBlogsById = async (req,res) => {
    try {
      
      const {id} = req.params;
      console.log('slug', slug)
      if (!id) {
        return res.status(200).json({ message: 'id not found.' });
      }
      const blog = await patients.getUser(id);
      if (Object.keys(blog).length == 0) {
        return res.status(200).json({ message: 'Patint not found for this id.' });
      }

      // blog.image = `${req.protocol}://${req.get('host')}/${blog.image}`;
      return res.status(200).json({ message: 'Patieent fetched successfully.',blog:blog });     
    } catch (error) {
      console.error("erorr in gettting patient by id",error);
      return res.status(500).json({ message: error });
    }
  };


  module.exports={
    deleteComment,
    updateComment,
    createAvail,
    getAvailByUser,
    getBlogsById
  }