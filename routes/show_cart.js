const express = require('express');
const router = express.Router();
const Database = require('../routes/db');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const util = require('util');
const db = new Database();
db.connect();


router.get('/api/count_shop/', async (req, res) => {
    // Assuming req.session.userID exists and is valid

    try {
        const count_shop = await db.query('SELECT product_id, seller_id FROM Seller NATURAL JOIN Product NATURAL JOIN Picture_product NATURAL JOIN Cart_Product WHERE cart_id = ?;', req.session.userId);

        // Extract product_id and seller_id from each row in the result
        const data = count_shop.map(row => ({
            product_id: row.product_id,
            seller_id: row.seller_id
        }));

        // Log each product_id in the array
        data.forEach(item => {
            console.log(item.product_id);
        });

        // Send the response as an array of objects
        res.json(data);
    } catch (err) {
        console.error('Error executing SQL query:', err);
        res.status(500).json({ error: 'An error occurred while fetching data.' });
    }
});

router.post('/api/shop/', async (req, res) => {
    // Assuming req.session.userID exists and is valid
    const { shopIndex } = req.body;

    try {
        const shop_name = await db.query('SELECT shop_name FROM Seller NATURAL JOIN Product NATURAL JOIN Picture_product NATURAL JOIN Cart_Product WHERE cart_id = ? AND seller_id = ?;', [req.session.userId, shopIndex]);

        // Assuming the result is an array of products
        res.json(shop_name);
    } catch (err) {
        console.error('Error executing SQL query:', err);
        res.render('error', { error: 'An error occurred while fetching data.' });
    }
});


router.get('/api/count_shopgege/', (req, res) => {
    const id_pro = req.params.id;
    if(req.session.isLoggedIn){
      db.query('SELECT * FROM Product JOIN Picture_product ON Product.product_id = Picture_product.product_id WHERE Product.product_id = ? LIMIT 1;', [id_pro])
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