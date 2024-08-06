const patients = require('../service/PatientsService');

// Create a new comment
const createComment = async (req, res) => {
  try {
    // Check if user already exists
    let existingUser = await patients.findUser(req.body);
    if (Object.keys(existingUser).length > 0) {
      return res.status(400).json({ message: 'Patient already exists with that mobile number or email.' });
    }
    // Create new user
    const user = await patients.createUser(req.body);
    if(user){

      return res.status(200).json({ message: 'Patient created successfully.' });
    }
    
    return res.status(401).json({ message: 'Patient created failed.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const updateComment = async (req, res) => {
    try {
      const data = req.body;
      let existingUser = await patients.findUser(req.body);
        if (Object.keys(existingUser).length == 0) {
        return res.status(400).json({ message: 'Patient does not exists with that mobile number or email.' });
        }
  
      const comment = await patients.updateUser(existingUser.id, data);
  
      if (comment.length == 0) {
        return res.status(200).json({ message: 'Patient not updated.' });
      }
  
      return res.status(200).json({ message: 'Patient data updated successfully.' });
    } catch (error) {
      console.error("error in updating blogs",error);
      return res.status(500).json({ message: error });
    }
  };
  
  // Delete a comment
  const deleteComment = async (req, res) => {
    try {
      const { id } = req.params;
  
      const Blog = await patient.deleteUser(id);
  
      if (Blog.length == 0) {
        return res.status(200).json({ message: 'Patient not found.' });
      }
  
      return res.status(200).json({ message: 'Patient data deleted successfully.' });
    } catch (error) {
      console.error("error in deleting ublog",error);
      return res.status(500).json({ message: error });
    }
  };
  
  const getBlogsByUser = async (req,res) => {
    try {
      const user = req.user;
        const {program=""} = req.query;
      const blogs = await patients.getpatientsforDoc(user.userId,program);
      
      if (blogs.length == 0) {
        return res.status(200).json({ message: 'Patints not found.' });
      }
      // for(let blog of blogs){
      //   blog.image = `${req.protocol}://${req.get('host')}/${blog.image}`;
      // }
      return res.status(200).json({ message: 'Patients fetched successfully.',patients:blogs });     
    } catch (error) {
      console.error("erorr in gettting Patients by users",error);
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
    createComment,
    getBlogsByUser,
    getBlogsById
  }