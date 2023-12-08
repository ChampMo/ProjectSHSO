const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const util = require('util');
const Database = require('../routes/db');
const db = new Database();
db.connect();


const mkdirAsync = util.promisify(fs.mkdir);
const accessAsync = util.promisify(fs.access);

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const destinationPath = path.join(__dirname, '../public/uploads/product_picture/');

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
    cb(null, 'product-' + uniqueSuffix + ext);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 10, // Limit file size to 10 MB
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

router.post('/upload/product_picture/', upload.single('productImage'), async (req, res) => {
  try {
    // Check if a file is uploaded
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }

    const filePath = req.file.filename;
    console.log('File uploaded:', filePath);
    req.session.product.push(filePath);
    console.log('session:', req.session.product);
    // Respond to the client with the relative path
    res.status(200).json({ message: 'File uploaded successfully', filePath });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.post('/upload/product_info/', async (req, res) => {
    const insertProduct = req.body; // รับข้อมูลที่ถูกส่งมาจาก frontend
    const namePro = insertProduct.name;
    const costPro = insertProduct.cost;
    const quanPro = insertProduct.quan;
    // const catePro = insertProduct.cate;
    const descPro = insertProduct.desc;
    let date = new Date();
    let dateString = new Date(date.getTime() - (date.getTimezoneOffset() * 60000 )).toISOString().split("T")[0];
    console.log(dateString); 
    const insertphoto1 = req.session.product[0]; 
    const insertphoto2 = req.session.product[1];
    const insertphoto3 = req.session.product[2];
    const insertphoto4 = req.session.product[3];
    const pic1 = ` ../uploads/product_picture/${insertphoto1}`;
    const pic2 = ` ../uploads/product_picture/${insertphoto2}`;
    const pic3 = ` ../uploads/product_picture/${insertphoto3}`;
    const pic4 = ` ../uploads/product_picture/${insertphoto4}`;
    const product_id_result = await db.query("SELECT MAX(product_id) AS most FROM product;");
    let product_id = product_id_result[0].most;
    console.log('product_id',product_id);
    const seller_result = await db.query("SELECT seller_id FROM seller WHERE customer_id=?",[req.session.userId]);
    console.log(req.session.product.length)
    
    let status; 
    if (seller_result.length > 0) {
        const seller_id = seller_result[0].seller_id;
        if(namePro==""||costPro==""||quanPro==""/*||catePro==""*/||descPro==""||req.session.product.length!==4){
            res.json(status=false);
        }else{
            await db.query("INSERT INTO Product (product_id, name, detail, price, quantity, product_date, seller_id) VALUES (?, ?, ?, ?, ?, ?, ?)",[++product_id, namePro, descPro, costPro, quanPro, dateString, seller_id]);
            await db.query("INSERT INTO Picture_product (picture_id,product_id, picture1, picture2, picture3, picture4) VALUES (?,?,?, ?, ?, ?)",[product_id,product_id, pic1, pic2, pic3, pic4])
            res.json(status=true);


        }  
    }
})
 











module.exports = router;