const express = require('express');
const router = express.Router();
const userRoutes = require('./userRoutes');
const discussionRoutes = require('./discussionRoutes');
const commentRoutes = require('./blogs');
const authRoutes = require('./authRoutes');
const multer = require('multer');
const path = require('path');
const auth = require('../utils/auth');

router.use('/api/users', userRoutes);
router.use('/api/blogs', commentRoutes);
router.use('/api/auth', authRoutes);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log('file', file)
        cb(null, 'uploads/'); 
    },
    filename: (req, file, cb) => {
        console.log('file2', file)
        cb(null, Date.now() + path.extname(file.originalname)); 
    },
});

const upload = multer({ storage: storage });

router.post('/api/upload', auth,upload.single('image'), (req, res, next) => {
    try {
        console.log('req', req.file)
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded.' });
        }

        // File upload successful
        res.status(201).json({
            message: 'image uploaded successfully',
            file: req.file, 
            imageLink:`${req.protocol}://${req.get('host')}/${req.file.path}`
        });
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({ message: 'Error uploading file' });
    }
});
module.exports = router;
