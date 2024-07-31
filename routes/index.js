const express = require('express');
const router = express.Router();
const userRoutes = require('./userRoutes');
const commentRoutes = require('./blogs');
const authRoutes = require('./authRoutes');
const multer = require('multer');
const auth = require('../utils/auth');
const AWS = require('aws-sdk');
const dotenv = require('dotenv');

dotenv.config(); 
router.use('/api/users', userRoutes);
router.use('/api/blogs', commentRoutes);
router.use('/api/auth', authRoutes);

const storage = multer.memoryStorage(); 
const upload = multer({ storage });

const s3 = new AWS.S3({
    endpoint: new AWS.Endpoint(process.env.s3_url),
    accessKeyId: process.env.access_key,
    secretAccessKey: process.env.secret_key,
    s3ForcePathStyle: true
  });


router.post('/upload', upload.single('image'), (req, res) => {
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
  });
module.exports = router;
