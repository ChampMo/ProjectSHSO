const express = require('express');
const router = express.Router();
const Database = require('../routes/db');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const util = require('util');
const db = new Database();
db.connect();




const mkdirAsync = util.promisify(fs.mkdir);
const accessAsync = util.promisify(fs.access);

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const destinationPath = path.join(__dirname, '../public/uploads/profile_shop/');

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
    cb(null, 'shop-' + uniqueSuffix + ext);
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

router.post('/upload/proshop/', upload.single('profileImage'), async (req, res) => {
  try {
    // Check if a file is uploaded
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }

    const filePath = req.file.filename;
    console.log('File uploaded:', filePath);
    req.session.filename = filePath
    console.log('session:', req.session.filename);
    // Respond to the client with the relative path
    res.status(200).json({ message: 'File uploaded successfully', filePath });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.post('/api/register/seller/', async (req, res) => {
    const { card_id, shop_name, shop_address, shop_description, shop_bank, shop_bank_id } = req.body;

    try {
        if (req.session.filename != "") {
            let maxIdResults = await db.query('SELECT max(seller_id) as Max_id FROM Seller limit 1;');
            let max_id = maxIdResults[0].Max_id;
            let status_seller = "unverified"
            // เรียกใช้ max_id ในการกำหนดค่าในการ INSERT
            await db.query('INSERT INTO Seller (seller_id, card_id, bank, bank_number, picture, customer_id, shop_name, description, address_shop, status_seller) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
                    [++max_id, card_id, shop_bank, shop_bank_id, req.session.filename, req.session.userId, shop_name, shop_description, shop_address, status_seller]);

            console.log('Data inserted successfully');
            res.json({ check_seller: true}) 
        }else{
            res.status(500).json({check_seller: false, error: 'file not found' });
        }
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({check_seller: false, error: 'Internal Server Error' });
    }
});




















module.exports = router;
