const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const util = require('util');
const Database = require('../routes/db');
const { Catelog } = require('./model/type.js');


class ProductController {
  constructor() {
    this.db = new Database();
    this.db.connect();

    this.upload = multer({
      storage: this.getStorage(),
      limits: {
        fileSize: 1024 * 1024 * 10, // Limit file size to 10 MB
      },
      fileFilter: this.getFileFilter(),
    });

    this.initializeRoutes();
  }

  getStorage() {
    return multer.diskStorage({
      destination: async (req, file, cb) => {
        const destinationPath = path.join(__dirname, '../public/uploads/product_picture/');

        try {
          await util.promisify(fs.access)(destinationPath);
        } catch (error) {
          try {
            await util.promisify(fs.mkdir)(destinationPath);
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
  }

  getFileFilter() {
    return (req, file, cb) => {
      const allowedFileTypes = /jpeg|jpg|png/;
      const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
      const mimetype = allowedFileTypes.test(file.mimetype);

      if (extname && mimetype) {
        cb(null, true);
      } else {
        cb(new Error('Invalid file type. Only JPEG, JPG, and PNG are allowed.'));
      }
    };
  }

  initializeRoutes() {
    router.post('/upload/product_picture/', this.upload.single('productImage'), this.handleUpload.bind(this));
    router.post('/upload/product_info/', this.handleProductInfo.bind(this));
  }

  async handleUpload(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded.' });
      }

      const filePath = req.file.filename;
      console.log('File uploaded:', filePath);
      req.session.product.push(filePath);
      console.log('session:', req.session.product);
      res.status(200).json({ message: 'File uploaded successfully', filePath });
    } catch (error) {
      console.error('Error uploading file:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async handleProductInfo(req, res) {
    try {
      const insertProduct = req.body;
      const namePro = insertProduct.name;
      const costPro = insertProduct.cost;
      const quanPro = insertProduct.quan;
      const descPro = insertProduct.desc;
      const sub_type = insertProduct.sub_type;

      let date = new Date();
      let dateString = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().split("T")[0];
      const insertphoto1 = req.session.product[0];
      const insertphoto2 = req.session.product[1];
      const insertphoto3 = req.session.product[2];
      const insertphoto4 = req.session.product[3];
      const pic1 = `../uploads/product_picture/${insertphoto1}`;
      const pic2 = `../uploads/product_picture/${insertphoto2}`;
      const pic3 = `../uploads/product_picture/${insertphoto3}`;
      const pic4 = `../uploads/product_picture/${insertphoto4}`;

      const product_id_result = await this.db.query("SELECT MAX(product_id) AS most FROM product;");
      let product_id = product_id_result[0].most;

      const seller_result = await this.db.query("SELECT seller_id FROM seller WHERE customer_id=?", [req.session.userId]);

      let status;

      if (seller_result.length > 0) {
        const seller_id = seller_result[0].seller_id;
        if (namePro === "" || costPro === "" || quanPro === "" || descPro === "" || req.session.product.length !== 4) {
          res.json(status = false);
        } else {
          await this.db.query("INSERT INTO Product (product_id, name, detail, price, quantity, product_date, seller_id) VALUES (?, ?, ?, ?, ?, ?, ?)", [++product_id, namePro, descPro, costPro, quanPro, dateString, seller_id]);
          await this.db.query("INSERT INTO Picture_product (picture_id,product_id, picture1, picture2, picture3, picture4) VALUES (?,?,?, ?, ?, ?)", [product_id, product_id, pic1, pic2, pic3, pic4]);
          await Catelog.create([
            {id_product: product_id, type_id: sub_type}
        ]);
          res.json(status = true);
        }
      }
    } catch (error) {
      console.error('Error handling product info:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

const productController = new ProductController();
module.exports = router;
