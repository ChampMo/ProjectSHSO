const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises; // Use fs.promises for asynchronous file operations
const router = express.Router();
const Database = require('../routes/db');
// const db = new Database();
// db.connect();






// Set up Multer for file uploads
const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/uploads/profile/'),
    filename: (req, file, cb) => {
      // Use the current timestamp as the filename
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const ext = path.extname(file.originalname);
      cb(null, 'profile-' + uniqueSuffix + ext);
    }
});

const upload = multer({ storage: storage });
  
  // Your other routes and middleware
  
// Handle file upload
router.post('/upload', upload.single('profileImage'), async (req, res) => {
  try {
      const filePath = req.file.filename;  // Use filename instead of path
      console.log('File uploaded:', filePath);

      // Respond to the client with the relative path
      res.status(200).json({ message: 'File uploaded successfully', filePath });
  } catch (error) {
      console.error('Error uploading file:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});





module.exports = router;
