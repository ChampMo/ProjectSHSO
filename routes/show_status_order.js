const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const util = require('util');
const Database = require('../routes/db');
const db = new Database();
db.connect();





router.get('/api/count_order_status/', async (req, res) => {

    try {
        const count_shop = await db.query('SELECT seller_id, product_id, order_id FROM Order_list NATURAL JOIN Order_Product NATURAL JOIN Product WHERE customer_id = ? AND (status_order = ? OR status_order = ?) ORDER BY date DESC;', [req.session.userId, 'Wait', 'Sending']);
        const data = count_shop.map(row => ({
            product_id: row.product_id,
            seller_id: row.seller_id,
            order_id: row.order_id
        }));
        console.log(data)
        res.json(data);
    } catch (err) {
        console.error('Error executing SQL query:', err);
        res.status(500).json({ error: 'An error occurred while fetching data.' });
    }
});


router.post('/api/order_shop/', async (req, res) => {
    // Assuming req.session.userID exists and is valid
    const { seller_id, order_id } = req.body;

    try {
        const shop_name = await db.query('SELECT shop_name FROM Order_list JOIN Order_Product ON Order_list.order_id = Order_Product.order_id JOIN Product ON Product.product_id = Order_list.product_id JOIN Seller ON Seller.seller_id = Product.seller_id WHERE (status_order = ? OR status_order = ?) AND Order_list.order_id = ? AND seller.seller_id = ? ;', [ 'Wait', 'Sending',order_id, seller_id]);
        const date = await db.query('SELECT DATE_FORMAT(date, ?) as date FROM Order_list JOIN Order_Product ON Order_list.order_id = Order_Product.order_id JOIN Product ON Product.product_id = Order_list.product_id JOIN Seller ON Seller.seller_id = Product.seller_id WHERE (status_order = ? OR status_order = ?) AND Order_list.order_id = ? AND seller.seller_id = ? ;', [ '%d-%m-%Y', 'Wait', 'Sending', order_id, seller_id]);
        res.json({shop_name, date});
    } catch (err) {
        console.error('Error executing SQL query:', err);
        res.render('error', { error: 'An error occurred while fetching data.' });
    }
});

router.post('/api/order_product/', async (req, res) => {
    // Assuming req.session.userID exists and is valid
    const { product_id, order_id } = req.body;

    try {
        const product_info_cart = await db.query('SELECT * FROM Product NATURAL JOIN Picture_product NATURAL JOIN Order_list  WHERE order_id = ? AND product_id = ? ;', [order_id, product_id]);
        // Assuming the result is an array of products
        res.json(product_info_cart);
    } catch (err) {
        console.error('Error executing SQL query:', err);
        res.render('error', { error: 'An error occurred while fetching data.' });
    }
});



//---


router.get('/api/count_order_status2/', async (req, res) => {
    try {
        const count_shop = await db.query('SELECT seller_id, product_id, order_id FROM Order_list NATURAL JOIN Order_Product NATURAL JOIN Product WHERE customer_id = ? AND (status_order = ? OR status_order = ?) ORDER BY date DESC;', [req.session.userId, 'Success', 'Cancel']);
        const data = count_shop.map(row => ({
            product_id: row.product_id,
            seller_id: row.seller_id,
            order_id: row.order_id
        }));
        res.json(data);
    } catch (err) {
        console.error('Error executing SQL query:', err);
        res.status(500).json({ error: 'An error occurred while fetching data.' });
    }
});

router.post('/api/order_shop2/', async (req, res) => {
    // Assuming req.session.userID exists and is valid
    const { seller_id, order_id } = req.body;

    try {
        const shop_name = await db.query('SELECT shop_name FROM Order_list JOIN Order_Product ON Order_list.order_id = Order_Product.order_id JOIN Product ON Product.product_id = Order_list.product_id JOIN Seller ON Seller.seller_id = Product.seller_id WHERE (status_order = ? OR status_order = ?) AND Order_list.order_id = ? AND seller.seller_id = ? ;', ['Success', 'Cancel', order_id, seller_id]);
        const date = await db.query('SELECT DATE_FORMAT(date, ?) as date FROM Order_list JOIN Order_Product ON Order_list.order_id = Order_Product.order_id JOIN Product ON Product.product_id = Order_list.product_id JOIN Seller ON Seller.seller_id = Product.seller_id WHERE(status_order = ? OR status_order = ?) AND Order_list.order_id = ? AND seller.seller_id = ? ;', [ '%d-%m-%Y', 'Success', 'Cancel', order_id, seller_id]);
        res.json({shop_name, date});
    } catch (err) {
        console.error('Error executing SQL query:', err);
        res.render('error', { error: 'An error occurred while fetching data.' });
    }
});

router.post('/api/confirm_sucess/', async (req, res) => {
    // Assuming req.session.userID exists and is valid
    const { product_id, order_id } = req.body;
    console.log('prodect - ',product_id,'order - ',order_id)
    try {
        await db.query('UPDATE Order_list SET status_order = ?  WHERE order_id = ? AND product_id = ? ;', ['Success', order_id, product_id]);
        // Assuming the result is an array of products
        res.json({confirm_sucess: true});
    } catch (err) {
        console.error('Error executing SQL query:', err);
        res.render('error', { error: 'An error occurred while fetching data.' });
    }
});













module.exports = router;
