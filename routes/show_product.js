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
  if(req.session.isLoggedIn){
    db.query('SELECT * FROM Product JOIN Picture_product ON Product.picture_id = Picture_product.picture_id WHERE product_id = ? LIMIT 1;', [id_pro])
      .then(products => {
        // const customer_id = 1; //เปลี่ยนเป็นของคนที่ล๊อกอิน
        db.query('SELECT * FROM Address JOIN Customer ON Address.customer_id = Customer.customer_id LIMIT 1; ')
        .then(address => {
          console.log(products)
          res.render('product',{ products, address, success: false});
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
    }else{
      db.query('SELECT * FROM Product JOIN Picture_product ON Product.picture_id = Picture_product.picture_id WHERE product_id = ? LIMIT 1;', [id_pro])
      .then(products => {
        // const customer_id = 1; //เปลี่ยนเป็นของคนที่ล๊อกอิน
        db.query('SELECT * FROM Address JOIN Customer ON Address.customer_id = Customer.customer_id LIMIT 1; ')
        .then(address => {
          console.log(products)
          res.render('product',{ products, address, success: true});
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
    }
});


router.get('/api/count_in_cart/', (req, res) => {
  const user_id = req.session.userId;
  if(req.session.isLoggedIn){
    db.query('SELECT count(Cart_Product.product_id) as amount_pro_cart FROM Cart_Product JOIN Cart ON Cart_Product.cart_id = Cart.cart_id WHERE customer_id = ? GROUP BY Cart_Product.cart_id LIMIT 1;', [user_id])
      .then(result  => {
        let amount_pro_cart = result[0].amount_pro_cart;
          res.json( amount_pro_cart );
      })
      .catch(err => {
          console.error('Error executing SQL query:', err);
          res.render('error', { error: 'An error occurred while fetching data.' });
      });
  }else{
    res.json( 0 );
  }

});





module.exports = router;
