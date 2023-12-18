const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const util = require('util');
const Database = require('../routes/db');

const mkdirAsync = util.promisify(fs.mkdir);
const accessAsync = util.promisify(fs.access);

class FileUploadershop {
  constructor() {
    this.destinationPath = path.join(__dirname, '../public/uploads/profile_shop/');
    this.initializeMulter();
  }

  initializeMulter() {
    this.storage = multer.diskStorage({
      destination: async (req, file, cb) => {
        try {
          await accessAsync(this.destinationPath);
        } catch (error) {
          try {
            await mkdirAsync(this.destinationPath);
          } catch (err) {
            return cb(err, null);
          }
        }
        cb(null, this.destinationPath);
      },
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, 'shop-' + uniqueSuffix + ext);
      }
    });

    this.upload = multer({
      storage: this.storage,
      limits: {
        fileSize: 1024 * 1024 * 10, // Limit file size to 10 MB
      },
      fileFilter: this.fileFilter.bind(this)
    });
  }

  fileFilter(req, file, cb) {
    const allowedFileTypes = /jpeg|jpg|png/;
    const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedFileTypes.test(file.mimetype);

    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, JPG, and PNG are allowed.'));
    }
  }

  editUploadMiddleware() {
    return this.upload.single('profileImage');
  }

}

class SellerRegistration extends FileUploadershop{
  constructor() {
    super();
    this.router = express.Router();
    this.db = new Database();
    this.db.connect();


    this.router.post('/edit/proshop/', this.editUploadMiddleware(), this.uploadProfileImage.bind(this));
    this.router.post('/api/edit/seller/', this.Eedit_shop.bind(this));
  }

  async uploadProfileImage(req, res) {
    try {
      // Check if a file is uploaded
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded.' });
      }

      const filePath = req.file.filename;
      console.log('File uploaded:', filePath);
      req.session.filename = filePath;
      console.log('session:', req.session.filename);
      // Respond to the client with the relative path
      res.json({ filePath });
    } catch (error) {
      console.error('Error uploading file:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async Eedit_shop(req, res) {

    try {
        const { shop_name, shop_address, shop_description, shop_bank, shop_bank_id } = req.body;

        console.log( shop_name, shop_address, shop_description, shop_bank, shop_bank_id )
          if (req.session.filename !== '') {
            req.session.imgShop = req.session.filename;
            let picfile = `../uploads/profile_shop/${req.session.imgShop}`;
            console.log(picfile)
            const seller = await this.db.query('SELECT seller_id FROM seller NATURAL JOIN Customer WHERE customer_id = ?;', [req.session.userId]);
            const sseller = seller[0].seller_id;
            await this.db.query('UPDATE SELLER SET picture = ?, shop_name = ?, address_shop = ?, description = ?, bank = ?, bank_number = ? WHERE seller_id = ?;', [picfile, shop_name, shop_address, shop_description, shop_bank, shop_bank_id, sseller]);
            res.json({ check_seller: true });
          } else {
            res.status(500).json({ check_seller: false, error: 'File not found' });
          }

    } catch (err) {
      console.error('Error:', err);
      res.status(500).json({ check_seller: false, error: 'Internal Server Error' });
    }
  }
}

const sellerRegistration = new SellerRegistration();
module.exports = sellerRegistration.router;
