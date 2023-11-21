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


// // กำหนดที่เก็บไฟล์
// const uploadDir = 'public/uploads/profile';
// Initialize a global counter variable

// // ตั้งค่า Multer
// const storage = multer.diskStorage({
//     destination: async function (req, file, cb) {
//         cb(null, uploadDir);
//     },
//     filename: async function (req, file, cb) {
//         try {
//             // Fetch the existing files in the upload directory
//             const files = await fs.readdir(uploadDir);

//             // Extract the current image count
//             const imageCount = files.filter(name => name.startsWith('image-')).length;

//             const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//             const fileName = 'image-' + imageCount + '-' + uniqueSuffix + path.extname(file.originalname);

//             // ทำการบันทึกไฟล์
//             await fs.writeFile(path.join(uploadDir, fileName), '');

//             cb(null, fileName);
//         } catch (error) {
//             cb(error);
//         }
//     }
// });



// const upload = multer({
//     storage: storage,
//     limits: {
//         fileSize: 1024 * 1024 * 5 // 5MB
//     },
//     fileFilter: function (req, file, cb) {
//         const allowedFileTypes = /jpeg|jpg|png|gif/;
//         const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
//         const mimetype = allowedFileTypes.test(file.mimetype);
//         if (extname && mimetype) {
//             cb(null, true);
//         } else {
//             cb(new Error('Invalid file type. Only JPEG, JPG, PNG, and GIF files are allowed.'));
//         }
//     }
// });

// router.post('/upload', upload.array('files', 1), async (req, res) => {
//     try {
//         if (!req.files || req.files.length === 0) {
//             return res.status(400).json({ error: 'No files uploaded.' });
//         }

//         const paths = req.files.map(file => `/uploads/profile/${file.filename}`);
//         console.log('Paths:', paths);

//         // ตัวอย่าง SQL Query สำหรับอัพเดตภาพในฐานข้อมูล
//         // const updateQuery = 'UPDATE Seller SET picture = ? WHERE seller_id = ?';

//         // // ตัวอย่างการ loop รับ seller_id จาก request และอัพเดตในฐานข้อมูล
//         // for (let i = 0; i < req.body.seller_ids.length; i++) {
//         //     const sellerId = req.body.seller_ids[i];

//         //     // ดึงข้อมูลภาพล่าสุดที่อัพโหลด
//         //     const picturePath = paths[i];

//         //     // ทำการอัพเดตข้อมูลในฐานข้อมูล
//         //     await db.execute(updateQuery, [picturePath, sellerId]);
//         // }

//         // // ปิดการเชื่อมต่อกับฐานข้อมูล
//         // await db.end();

//         // return res.json({ paths: paths });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ error: 'Internal Server Error.' });
//     }
// });

// router.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).send('Something went wrong!');
// });

// module.exports = router;
