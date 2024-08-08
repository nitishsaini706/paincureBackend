const express = require('express');
const router = express.Router();
const userRoutes = require('./userRoutes');
const commentRoutes = require('./blogs');
const authRoutes = require('./authRoutes');
const appointmentRoutes = require('./appointmentRoutes');
const assessmentRoutes = require('./assessmentRoutes')
const patientsRoutes = require('./patientsRoutes');
const availabilityRoutes = require('./availabilityRoutes');
const programRoutes = require('./programRoutes');
const multer = require('multer');
const auth = require('../utils/auth');
const AWS = require('aws-sdk');
const dotenv = require('dotenv');
const {pool} = require('../db/connection')

dotenv.config(); 
router.use('/api/users', userRoutes);
router.use('/api/blogs', commentRoutes);
router.use('/api/auth', authRoutes);
router.use('/api/appointments', appointmentRoutes);
router.use('/api/assessments', assessmentRoutes);
router.use('/api/patients', patientsRoutes); 
router.use('/api/availability', availabilityRoutes); 
router.use('/api/program', programRoutes); 

const storage = multer.memoryStorage(); 
const upload = multer({ storage });

const s3 = new AWS.S3({
    endpoint: new AWS.Endpoint(process.env.s3_url),
    accessKeyId: process.env.access_key,
    secretAccessKey: process.env.secret_key,
    s3ForcePathStyle: true
  });


router.post('/upload', upload.single('image'), (req, res) => {
  try{

    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }
  
    const params = {
      Bucket: process.env.bucket_name,
      Key: req.file.originalname,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
      ACL: 'public-read',
    };
  
    s3.upload(params, (err, data) => {
      if (err) {
        console.error('Error uploading to Cloudflare R2:', err);
        return res.status(500).send('Error uploading file.');
      }
      const imageUrl = `${process.env.public_url}/${params.Bucket}/${params.Key}`;
      res.status(200).send({ imageUrl: imageUrl });
    });
  }catch(e){
    console.log("Error in upload image",e);
    res.status(500).json("Error in uploading image");
  }
  });
router.post('/upload/video', upload.single('video'), async (req, res) => {
  try{

    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }
  
    const params = {
      Bucket: process.env.bucket_name,
      Key: req.file.originalname,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
      ACL: 'public-read',
    };
  
    s3.upload(params, async (err, data) => {
      if (err) {
        console.error('Error uploading to Cloudflare R2:', err);
        return res.status(500).send('Error uploading file.');
      }
      const imageUrl = `${process.env.public_url}/${params.Bucket}/${params.Key}`;

      const query = 'INSERT INTO video (url, name) VALUES ($1, $2) RETURNING id';

      const values = [imageUrl,req.file.originalname ];
      const client = await pool.connect();

      const { rows } = await client.query(query, values);
      const createdid = rows[0];

      res.status(200).send({ id: createdid.id });
    });
  }catch(e){
    console.log("Error in upload video",e);
    res.status(500).json("Error in uploading video");
  }
  });

module.exports = router;
