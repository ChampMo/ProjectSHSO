const express = require('express');
const path = require('path');
const router = express.Router();
const Database = require('../routes/db');
const db = new Database();
db.connect();

router.get('/api/products/', (req, res) => {
  // Assuming req.session.userID exists and is valid

  db.query('SELECT product_id, name, detail, price, quantity FROM Product')
    .then(products => {
      // Assuming the result is an array of products
      res.json(products);
    })
    .catch(err => {
      console.error('Error executing SQL query:', err);
      res.render('error', { error: 'An error occurred while fetching data.' });
    });
});

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



module.exports = router;
