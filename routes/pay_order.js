
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const util = require('util');
const { promisify } = require('util');
const Database = require('../routes/db');




class PayRouter {

    constructor() {
      this.router = express.Router();
      this.db = new Database();
      this.db.connect();
  
      this.router.get('/api/count_order/', this.countOrder.bind(this));
      this.router.get('/api/cost_pay_produck/', this.costPayProduct.bind(this));
      this.router.get('/api/address_pay/', this.addressPay.bind(this));
      this.router.get('/api/check_add/', this.checkAddress.bind(this));
      this.router.post('/api/create/order/', this.createOrder.bind(this));
  
      //this.initializeMulter();
    }

  async countOrder(req, res) {
    try {
      let seller_id = [];
      let product_id = req.session.checkProduct;
      if (!Array.isArray(product_id)) {
        product_id = [product_id];
      }
      console.log('product_idproduct_idproduct_idproduct_id',product_id);
      for (const element of product_id) {
          try {
              const count_shop = await this.db.query('SELECT seller_id FROM Seller NATURAL JOIN Product NATURAL JOIN  Cart_Product WHERE cart_id = ? AND product_id = ? LIMIT 1;', [req.session.userId, element]);
              console.log('count_shopcount_shopcount_shop',element);
              if (count_shop.length > 0) {
                  seller_id.push(parseInt(count_shop[0].seller_id));
                  console.log('seller_idseller_idseller_id',seller_id);
              } else {
                  console.log(`No seller_id found for product_id ${element}`);
              }
          } catch (error) {
              console.error('Error executing SQL query:', error);
              // Handle the error as needed
          }
      }

      // Send the response after the loop is complete
      res.json({ seller_id, product_id });
    } catch (err) {
        console.error('Error executing SQL query:', err);
        res.status(500).json({ error: 'An error occurred while fetching data.' });
    }
  }

  async costPayProduct(req, res) {
    try {
      let check_cost = 0;
      let product_id = req.session.checkProduct;
      console.log('product_id',req.session.checkProduct)
      if (!Array.isArray(product_id)) {
        product_id = [product_id];
      }
      const product_idd = product_id.map(id => parseInt(id));

      console.log('product_id',product_idd)
      let seller_id = [];
      await Promise.all(product_idd.map(async (element) => {
        let one_cost = await this.db.query('SELECT (price*product_amount) as one_cost FROM Product NATURAL JOIN Cart_Product WHERE cart_id = ? AND product_id = ?;', [req.session.userId, element]);
        console.log('one_cost',one_cost[0].one_cost)
        check_cost += parseInt(one_cost[0].one_cost);

          try {
              const count_shop = await this.db.query('SELECT seller_id as amount_seller FROM Seller NATURAL JOIN Product NATURAL JOIN Cart_Product WHERE cart_id = ? AND product_id = ? LIMIT 1;', [req.session.userId, element]);

              if (count_shop.length > 0) {
                  seller_id.push(parseInt(count_shop[0].amount_seller));
              } else {
                  console.log(`No seller_id found for product_id ${element}`);
              }
          } catch (error) {
              console.error('Error executing SQL query:', error);
              // Handle the error as needed
          } 
      }));

      // Calculate unique sellers and cost_car outside the loop
      const uniqueSellerIds = [...new Set(seller_id)];
      const cost_car = uniqueSellerIds.length * 50;
      req.session.filename = null
      console.log('req.session.filename',req.session.filename)
      // Send the response once after all asynchronous operations are complete
      res.json({ check_cost, cost_car });
    } catch (err) {
        console.error('Error executing SQL query:', err);
        res.status(500).json({ error: 'An error occurred while fetching data.', details: err.message });
    }
  }

  async addressPay(req, res) {
    try {

      try {
          const aaddress = await this.db.query('SELECT * FROM Customer NATURAL JOIN Address WHERE customer_id = ?;', [req.session.userId]);
          
          const address = aaddress[0]
          
          if(address.village != '' && address.sub_district != '' && address.district != '' && address.city != '' && address.Postal_id != '' ){
              req.session.address = true
          }else{
              req.session.address = false
          }
          
          res.json(aaddress[0])
      } catch (error) {
          console.error('Error executing SQL query:', error);
      }
    } catch (err) {
      console.error('Error executing SQL query:', err);
      res.status(500).json({ error: 'An error occurred while fetching data.', details: err.message });
    }
  }

  async checkAddress(req, res) {
    try {
      const selid = req.session.address;
      res.json({selid})
    } catch (err) {
        console.error('Error handling check_order request:', err);
        res.status(500).json({ error: 'An error occurred while handling the request.', details: err.message });
    }
  }

  async createOrder(req, res) {
    let product_id = req.session.checkProduct;
    if (!Array.isArray(product_id)) {
      product_id = [product_id];
    }
    console.log(product_id)

    let maxIdResults = await this.db.query('SELECT max(order_id) as Max_id FROM Order_Product limit 1;');
    let max_id = maxIdResults[0].Max_id;
    this.db.query('INSERT INTO Order_Product VALUES (?, ?);',[++max_id, req.session.userId ] );
    try {
        let { date_time_slip } = req.body;
        if (req.session.filename != null && req.session.filename !== "") {

            let status_order = "Wait"
            console.log(max_id)
            const filen = req.session.filename
            console.log(filen)
            product_id.forEach( async element => {
                let aamount = await this.db.query('SELECT product_amount FROM Cart_Product natural join Product WHERE cart_id = ? AND product_id = ?;', [req.session.userId, element]);
                let amount = aamount[0].product_amount;
                await this.db.query('INSERT INTO Order_list (order_id, product_id, date, amount, slip, status_order) VALUES (?, ?, ?, ?, ?, ?);',[max_id, element, date_time_slip, amount, filen, status_order ])
                await this.db.query('DELETE FROM Cart_Product WHERE cart_id = ? AND product_id = ?;', [req.session.userId, element]);
                await this.db.query('UPDATE Product SET quantity = (quantity - ? )where product_id = ?;', [amount, element]);
            });
            console.log('Data inserted successfully');
            req.session.filename = '';
            res.json({ check_slip: true}) 
        }else{
          console.log('nonono')
            res.json({ check_slip: false}) 
        }
    } catch (err) {
        this.db.query('DELETE FROM Order_Product WHERE order_id = ?;',[max_id] );
        
        res.status(500).json({check_slip: false, error: 'Internal Server Error' });
    }
  }
}


const mkdirAsync = promisify(fs.mkdir);
const accessAsync = promisify(fs.access);

class FileUploader extends PayRouter {
  constructor() {
    super(); 
    this.destinationPath =  path.join(__dirname, '../public/uploads/slip/');
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
        cb(null, 'slip-' + uniqueSuffix + ext);
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

  getUploadMiddleware() {
    return this.upload.single('slipImage');
  }
}

class SlipUploader extends FileUploader {
  constructor() {
    super(); // Call the constructor of the parent class

    this.router.post('/upload/silp/', this.getUploadMiddleware(), this.uploadSlip.bind(this));
  }

  async uploadSlip(req, res) {
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
      res.status(200).json({ message: 'File uploaded successfully', filePath });
    } catch (error) {
      console.error('Error uploading file:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}




const payRouter = new PayRouter();
const upload_slip = new SlipUploader();
const fileUploader = new FileUploader();

module.exports = {
  payRouter: payRouter.router,
  uploadSlipRouter: upload_slip.router,
  FileUploaderRouter: fileUploader.router,
};
