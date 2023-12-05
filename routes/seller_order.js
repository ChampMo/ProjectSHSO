const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const util = require('util');
const Database = require('../routes/db');
const db = new Database();
db.connect();





router.get('/api/count_order_sell/', async (req, res) => {

    try {
        
        const seller = await db.query('SELECT seller_id FROM seller NATURAL JOIN Customer WHERE customer_id = ?;', [req.session.userId]);
        const sseller = seller[0].seller_id
        const count_shop = await db.query('SELECT * FROM Order_list NATURAL JOIN Order_Product NATURAL JOIN Customer NATURAL JOIN product WHERE seller_id = ? AND status_order = ? ORDER BY order_id DESC;', [sseller, 'Wait']);
        const data = count_shop.map(row => ({
            product_id: row.product_id,
            seller_id:row.seller_id,
            order_id: row.order_id
        }));
        res.json(data);
    } catch (err) {
        console.error('Error executing SQL query:', err);
        res.status(500).json({ error: 'An error occurred while fetching data.' });
    }
});


router.post('/api/order_sell/', async (req, res) => {
    // Assuming req.session.userID exists and is valid
    const {product_id, order_id } = req.body;

    try {
        const date = await db.query('SELECT DATE_FORMAT(date, ?) as date FROM Order_list WHERE status_order = "wait" AND order_id = ? AND product_id = ? ;', [ '%d-%m-%Y', order_id, product_id]);
        res.json({ date});  
    } catch (err) {
        console.error('Error executing SQL query:', err);
        res.render('error', { error: 'An error occurred while fetching data.' });
    }
});

router.post('/api/order_product_sell/', async (req, res) => {
    // Assuming req.session.userID exists and is valid
    const {seller_id, product_id, order_id } = req.body;

    try {
        
        const product_info_cart = await db.query('SELECT * FROM Order_list NATURAL JOIN Order_Product NATURAL JOIN Customer NATURAL JOIN product NATURAL JOIN Picture_Product WHERE seller_id = ? AND status_order = ? AND product_id = ? AND order_id = ?;', [seller_id, 'Wait', product_id, order_id]);
        // Assuming the result is an array of products
        console.log('product_info_cart',product_info_cart)
        console.log('price',product_info_cart[0].price,'product_amount', product_info_cart[0].amount)
        res.json(product_info_cart);
    } catch (err) {
        console.error('Error executing SQL query:', err);
        res.render('error', { error: 'An error occurred while fetching data.' });
    }
});

router.post('/api/order_customer_sell/', async (req, res) => {
    // Assuming req.session.userID exists and is valid
    const {seller_id, product_id, order_id } = req.body;

    try {
        
        const customer_id = await db.query('SELECT * FROM Order_list NATURAL JOIN Order_Product NATURAL JOIN Customer NATURAL JOIN product NATURAL JOIN Picture_Product WHERE seller_id = ? AND status_order = ? AND product_id = ? AND order_id = ?;', [seller_id, 'Wait', product_id, order_id]);
        const cus_info =  await db.query('SELECT * FROM Customer NATURAL JOIN Address WHERE customer_id = ?;',[ customer_id[0].customer_id ]);
        console.log(cus_info)
        res.json(cus_info);
    } catch (err) {
        console.error('Error executing SQL query:', err);
        res.render('error', { error: 'An error occurred while fetching data.' });
    }
});

  

//---


router.get('/api/count_order_sell2/', async (req, res) => {

    try {
        
        const seller = await db.query('SELECT seller_id FROM seller NATURAL JOIN Customer WHERE customer_id = ?;', [req.session.userId]);
        const sseller = seller[0].seller_id
        const count_shop = await db.query('SELECT * FROM Order_list NATURAL JOIN Order_Product NATURAL JOIN Customer NATURAL JOIN product WHERE seller_id = ? AND (status_order = ? OR status_order = ? OR status_order = ?);', [sseller, 'Success', 'Sending', 'Cancel']);
        const data = count_shop.map(row => ({
            product_id: row.product_id,
            seller_id:row.seller_id,
            order_id: row.order_id
        }));
        res.json(data);
    } catch (err) {
        console.error('Error executing SQL query:', err);
        res.status(500).json({ error: 'An error occurred while fetching data.' });
    }
});


router.post('/api/order_sell2/', async (req, res) => {
    // Assuming req.session.userID exists and is valid
    const {product_id, order_id } = req.body;

    try {
        const date = await db.query('SELECT DATE_FORMAT(date, ?) as date FROM Order_list WHERE (status_order = ? OR status_order = ? OR status_order = ?) AND order_id = ? AND product_id = ? ;', [ '%d-%m-%Y', 'Success', 'Sending', 'Cancel', order_id, product_id]);
        res.json({ date});  
    } catch (err) {
        console.error('Error executing SQL query:', err);
        res.render('error', { error: 'An error occurred while fetching data.' });
    }
});

router.post('/api/order_product_sell2/', async (req, res) => {
    // Assuming req.session.userID exists and is valid
    const {seller_id, product_id, order_id } = req.body;

    try {
        
        const product_info_cart = await db.query('SELECT * FROM Order_list NATURAL JOIN Order_Product NATURAL JOIN Customer NATURAL JOIN product NATURAL JOIN Picture_Product WHERE seller_id = ? AND product_id = ? AND order_id = ? AND (status_order = ? OR status_order = ? OR status_order = ?);', [seller_id, product_id, order_id, 'Success', 'Sending', 'Cancel']);
        // Assuming the result is an array of products
        console.log(product_info_cart)
        res.json(product_info_cart);
    } catch (err) {
        console.error('Error executing SQL query:', err);
        res.render('error', { error: 'An error occurred while fetching data.' });
    }
});


router.post('/api/confirm_sucess_sell_cancel/', async (req, res) => {
    // Assuming req.session.userID exists and is valid
    const { product_id, order_id } = req.body;
    console.log('prodect - ',product_id,'order - ',order_id)
    try {
        await db.query('UPDATE Order_list SET status_order = ?  WHERE order_id = ? AND product_id = ? ;', ['Cancel', order_id, product_id]);
        // Assuming the result is an array of products
        res.json({confirm_sucess: true});
    } catch (err) {
        console.error('Error executing SQL query:', err);
        res.render('error', { error: 'An error occurred while fetching data.' });
    }
});

router.post('/api/confirm_sucess_sell/', async (req, res) => {
    // Assuming req.session.userID exists and is valid
    const { product_id, order_id } = req.body;
    console.log('prodect - ',product_id,'order - ',order_id)
    try {
        await db.query('UPDATE Order_list SET status_order = ?  WHERE order_id = ? AND product_id = ? ;', ['Sending', order_id, product_id]);
        // Assuming the result is an array of products
        res.json({confirm_sucess: true});
    } catch (err) {
        console.error('Error executing SQL query:', err);
        res.render('error', { error: 'An error occurred while fetching data.' });
    }
});












module.exports = router;
