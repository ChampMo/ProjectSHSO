const express = require('express');
const multer = require('multer');
const fs = require('fs');
const util = require('util');
const path = require('path');
const router = express.Router();
const Database = require('../routes/db');
const db = new Database();
db.connect();








const mkdirAsync = util.promisify(fs.mkdir);
const accessAsync = util.promisify(fs.access);

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const destinationPath = path.join(__dirname, '../public/uploads/profile/');

    try {
      await accessAsync(destinationPath);
      // Directory already exists
    } catch (error) {
      // Directory doesn't exist, create it
      try {
        await mkdirAsync(destinationPath);
      } catch (err) {
        return cb(err, null);
      }
    }

    cb(null, destinationPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, 'profile-' + uniqueSuffix + ext);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 10, // Limit file size to 5 MB
  },
  fileFilter: (req, file, cb) => {
    // Validate file types
    const allowedFileTypes = /jpeg|jpg|png/;
    const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedFileTypes.test(file.mimetype);

    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, JPG, and PNG are allowed.'));
    }
  }
});



router.post('/upload', upload.single('profileImage'), async (req, res) => {
  try {
    // Check if a file is uploaded
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }

    const filePath = req.file.filename;
    console.log('File uploaded:', filePath);
    
    if (req.session.isLoggedIn) {
      // Assuming req.session.isLoggedIn contains a valid customer_id
      await db.query('UPDATE Customer SET profile_picture = ? WHERE customer_id = ?', [filePath, req.session.userId]);
      await db.query('SELECT profile_picture FROM Customer WHERE customer_id = ?', [ req.session.userId])
              .then(profile_pic => {
                const profile_picture = profile_pic[0].profile_picture;
                res.json({ message: 'File uploaded successfully', profile_picture });
              })
              .catch(err => {
                console.error('Error executing SQL query:', err);
                res.status(500).json({ error: 'An error occurred while fetching data.' });
              });
    }
   //res.status(200).json({ message: 'File uploaded successfully', filePath });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});




module.exports = router;
