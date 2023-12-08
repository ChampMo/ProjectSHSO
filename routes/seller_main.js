const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const util = require('util');
const Database = require('../routes/db');
const db = new Database();
db.connect();





router.get('/api/count_product_sellmain/', async (req, res) => {

    try {
        const seller = await db.query('SELECT seller_id FROM seller NATURAL JOIN Customer WHERE customer_id = ?;', [req.session.userId]);
        const sseller = seller[0].seller_id
        const count_shop = await db.query('SELECT * FROM Product WHERE seller_id = ? ORDER BY product_id DESC;', [sseller]);
        const data = count_shop.map(row => ({
            product_id: row.product_id,
            seller_id:row.seller_id
        }));
        res.json(data);
    } catch (err) {
        console.error('Error executing SQL query:', err);
        res.status(500).json({ error: 'An error occurred while fetching data.' });
    }
});


router.post('/api/product_sellmain/', async (req, res) => {
    const {product_id } = req.body;

    try {
        const date = await db.query('SELECT DATE_FORMAT(product_date, ?) as date FROM Product WHERE product_id = ? ;', [ '%d-%m-%Y', product_id]);
        res.json({ date});  
    } catch (err) {
        console.error('Error executing SQL query:', err);
        res.render('error', { error: 'An error occurred while fetching data.' });
    }
});

router.post('/api/order_product_sellmain/', async (req, res) => {
    // Assuming req.session.userID exists and is valid
    const { product_id} = req.body;

    try {
        const product_info_cart = await db.query('SELECT * FROM Product NATURAL JOIN Picture_product WHERE product_id = ?;', [ product_id]);
        res.json(product_info_cart);
    } catch (err) {
        console.error('Error executing SQL query:', err);
        res.render('error', { error: 'An error occurred while fetching data.' });
    }
});

  
router.get('/api/count_order2_seller/', async (req, res) => {

    try {
        const seller = await db.query('SELECT seller_id FROM seller NATURAL JOIN Customer WHERE customer_id = ?;', [req.session.userId]);
        const sseller = seller[0].seller_id
        const count_shop = await db.query('SELECT COUNT(order_id) as amount_order FROM Order_list NATURAL JOIN Order_Product NATURAL JOIN Customer NATURAL JOIN product WHERE seller_id = ? AND status_order = ? ORDER BY order_id DESC;', [sseller, 'Wait']);
        res.json(count_shop);
    } catch (err) {
        console.error('Error executing SQL query:', err);
        res.status(500).json({ error: 'An error occurred while fetching data.' });
    }
});


// router.put('/api/delete_product_sell/', (req, res) => {
//     try {
//         let { product_id } = req.body;
//         db.query('DELETE FROM Picture_product WHERE product_id = ?;',[ product_id ])
//         db.query('DELETE FROM Product WHERE product_id = ?;',[ product_id ])
        
//         res.json({DELETE:true });

//     }  catch (err) {
//         res.json({DELETE:false });
//     }
//   });


module.exports = router;
