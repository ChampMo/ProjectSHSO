const express = require('express');
const router = express.Router();
const Database = require('../routes/db');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const util = require('util');
const { Console } = require('console');
const db = new Database();
db.connect();


router.get('/api/count_shop/', async (req, res) => {

    try {
        const count_shop = await db.query('SELECT product_id, seller_id FROM Seller NATURAL JOIN Product NATURAL JOIN Picture_product NATURAL JOIN Cart_Product WHERE cart_id = ?  ORDER BY cart_product_date DESC;', req.session.userId);

        const data = count_shop.map(row => ({
            product_id: row.product_id,
            seller_id: row.seller_id
        }));

        res.json(data);
    } catch (err) {
        console.error('Error executing SQL query:', err);
        res.status(500).json({ error: 'An error occurred while fetching data.' });
    }
});

router.post('/api/shop/', async (req, res) => {
    // Assuming req.session.userID exists and is valid
    const { seller_id } = req.body;

    try {
        const shop_name = await db.query('SELECT shop_name FROM Seller NATURAL JOIN Product NATURAL JOIN Picture_product NATURAL JOIN Cart_Product WHERE cart_id = ? AND seller_id = ? ;', [req.session.userId, seller_id]);
        // Assuming the result is an array of products
        res.json(shop_name);
    } catch (err) {
        console.error('Error executing SQL query:', err);
        res.render('error', { error: 'An error occurred while fetching data.' });
    }
});

router.post('/api/cart_product/', async (req, res) => {
    // Assuming req.session.userID exists and is valid
    const { product_id } = req.body;

    try {
        const product_info_cart = await db.query('SELECT * FROM Product NATURAL JOIN Picture_product NATURAL JOIN Cart_Product WHERE cart_id = ? AND product_id = ? ;', [req.session.userId, product_id]);
        // Assuming the result is an array of products
        res.json(product_info_cart);
    } catch (err) {
        console.error('Error executing SQL query:', err);
        res.render('error', { error: 'An error occurred while fetching data.' });
    }
});




router.post('/api/cart_count_decrement/', async (req, res) => {
    // Assuming req.session.userID exists and is valid
    let { product_id } = req.body;

    try {
        if (!req.session.userId || !product_id) {
            // Check if required parameters are missing
            throw new Error('Missing required parameters');
        }

        let beforecountd = await db.query('SELECT product_amount FROM Cart_Product WHERE cart_id = ? AND product_id = ? ', [req.session.userId, product_id]);
        let bbeforecountd = beforecountd[0].product_amount

        await db.query('UPDATE Cart_Product SET product_amount = ? WHERE cart_id = ? AND product_id = ? ', [ --bbeforecountd, req.session.userId, product_id]);

        let countd = await db.query('SELECT product_amount FROM Cart_Product WHERE cart_id = ? AND product_id = ? ', [req.session.userId, product_id]);

        res.json({ countd: countd[0].product_amount });
    } catch (err) {
        console.error('Error executing SQL query:', err);
        res.status(500).json({ error: 'An error occurred while fetching data.', details: err.message });
    }
}); 

router.post('/api/cart_count_increment/', async (req, res) => {
    // Assuming req.session.userID exists and is valid
    let { product_id } = req.body;

    try {
        if (!req.session.userId || !product_id) {
            // Check if required parameters are missing
            throw new Error('Missing required parameters');
        }

        let beforecounti = await db.query('SELECT product_amount FROM Cart_Product WHERE cart_id = ? AND product_id = ? ', [req.session.userId, product_id]);
        let bbeforecounti = beforecounti[0].product_amount

        await db.query('UPDATE Cart_Product SET product_amount = ? WHERE cart_id = ? AND product_id = ? ', [++bbeforecounti, req.session.userId, product_id]);

        let counti = await db.query('SELECT product_amount FROM Cart_Product WHERE cart_id = ? AND product_id = ? ', [req.session.userId, product_id]);

        // Assuming the result is an array with at least one item
        res.json({ counti: counti[0].product_amount });
    } catch (err) {
        console.error('Error executing SQL query:', err);
        res.status(500).json({ error: 'An error occurred while fetching data.', details: err.message });
    }
});























module.exports = router;
