const express = require('express');
const path = require('path');
const router = express.Router();
const Database = require('../routes/db');
const db = new Database();
db.connect();
router.use(express.static(path.join(__dirname, "../public")));

router.get('/api/count_products/', (req, res) => {
  // Assuming req.session.userID exists and is valid

  db.query('SELECT count(product_id) AS totalProducts FROM Product')
    .then(count_products => {
      const totalProducts = count_products[0].totalProducts;
      res.json(totalProducts);
    })
    .catch(err => {
      console.error('Error executing SQL query:', err);
      res.status(500).json({ error: 'An error occurred while fetching data.' });
  });
});

router.get('/api/products/', (req, res) => {
  // Assuming req.session.userID exists and is valid

  db.query('SELECT * FROM Product join Picture_product where Product.picture_id = Picture_product.picture_id;')
    .then(products => {
      // Assuming the result is an array of products
      res.json(products);
    })
    .catch(err => {
      console.error('Error executing SQL query:', err);
      res.render('error', { error: 'An error occurred while fetching data.' });
    });
});

router.get('/product/:id', (req, res) => {
  const id_pro = req.params.id;

  db.query('SELECT * FROM Product JOIN Picture_product ON Product.picture_id = Picture_product.picture_id WHERE product_id = ? LIMIT 1;', [id_pro])
    .then(products => {
      // const customer_id = 1; //เปลี่ยนเป็นของคนที่ล๊อกอิน
      db.query('SELECT * FROM Address JOIN Customer ON Address.customer_id = Customer.customer_id LIMIT 1; ')
      .then(address => {
        console.log(products)
        res.render('product',{ products, address });
      })
      .catch(err => {
          console.error('Error executing SQL query:', err);
          res.render('error', { error: 'An error occurred while fetching data.' });
      });
    })
    .catch(err => {
        console.error('Error executing SQL query:', err);
        res.render('error', { error: 'An error occurred while fetching data.' });
    });
    
});



module.exports = router;
