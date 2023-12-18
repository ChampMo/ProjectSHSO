const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const util = require('util');
const Database = require('../routes/db');
const { Type ,Catelog } = require('./model/type.js');

class SellerRouter {
  constructor() {
    this.router = express.Router();
    this.db = new Database();
    this.db.connect();
    this.setupRoutes();
  }

  setupRoutes() {
    this.router.get('/api/count_product_sellmain/', this.getCountProductSellMain.bind(this));
    this.router.post('/api/product_sellmain/', this.getProductSellMain.bind(this));
    this.router.post('/api/order_product_sellmain/', this.getOrderProductSellMain.bind(this));
    this.router.get('/api/count_order2_seller/', this.getCountOrder2Seller.bind(this));
    this.router.put('/api/delete_product_sell/', this.deleteProductSell.bind(this));
    this.router.post('/api/edit_product_sellmain/', this.editProductSell.bind(this));
    this.router.get('/api/get_infoshop/', this.get_InfoShop.bind(this));
    
  }

  async getCountProductSellMain(req, res) {
    try {
      const seller = await this.db.query('SELECT seller_id FROM seller NATURAL JOIN Customer WHERE customer_id = ?;', [req.session.userId]);
      const sellerId = seller[0].seller_id;
      const countShop = await this.db.query('SELECT * FROM Product WHERE seller_id = ? ORDER BY product_id DESC;', [sellerId]);
      const data = countShop.map(row => ({
        product_id: row.product_id,
        seller_id: row.seller_id
      }));
      res.json(data);
    } catch (err) {
      console.error('Error executing SQL query:', err);
      res.status(500).json({ error: 'An error occurred while fetching data.' });
    }
  }

  async getProductSellMain(req, res) {
    const { product_id } = req.body;
    try {
      const date = await this.db.query('SELECT DATE_FORMAT(product_date, ?) as date FROM Product WHERE product_id = ? ;', ['%d-%m-%Y', product_id]);
      res.json({ date });
    } catch (err) {
      console.error('Error executing SQL query:', err);
      res.render('error', { error: 'An error occurred while fetching data.' });
    }
  }

  async getOrderProductSellMain(req, res) {
    const { product_id } = req.body;
    try {
      const productInfoCart = await this.db.query('SELECT * FROM Product NATURAL JOIN Picture_product WHERE product_id = ?;', [product_id]);
      const types_info = await Catelog.find({ id_product: product_id });
      const typesId = types_info.map(item => item.type_id);
      const types_product = await Type.find({ type_id: typesId });
      res.json({ productInfoCart, types_product });
    } catch (err) {
      console.error('Error executing SQL query:', err);
      res.render('error', { error: 'An error occurred while fetching data.' });
    }
  }

  async getCountOrder2Seller(req, res) {
    try {
      const seller = await this.db.query('SELECT seller_id FROM seller NATURAL JOIN Customer WHERE customer_id = ?;', [req.session.userId]);
      const sellerId = seller[0].seller_id;
      const countShop = await this.db.query('SELECT COUNT(order_id) as amount_order FROM Order_list NATURAL JOIN Order_Product NATURAL JOIN Customer NATURAL JOIN product WHERE seller_id = ? AND status_order = ? ORDER BY order_id DESC;', [sellerId, 'Wait']);
      res.json(countShop);
    } catch (err) {
      console.error('Error executing SQL query:', err);
      res.status(500).json({ error: 'An error occurred while fetching data.' });
    }
  }

  async deleteProductSell(req, res) {
    try {
      let { product_id } = req.body;
      await this.db.query('DELETE FROM Cart_Product WHERE product_id = ?;', [product_id]);
      await this.db.query('DELETE FROM Order_list WHERE product_id = ?;', [product_id]);
      await this.db.query('DELETE FROM Picture_product WHERE product_id = ?;', [product_id]);
      await this.db.query('DELETE FROM Product WHERE product_id = ?;', [product_id]);
      await Catelog.deleteMany({ id_product: product_id });

      res.json({ DELETE: true });

    } catch (err) {
      res.json({ DELETE: false });
    }
  }
  
  async editProductSell(req, res) {
    try {
      let { product_id } = req.body;
      req.session.editId = product_id;
      res.json({ success: true });
    } catch (err) {
      console.error('Error in editProductSell:', err);
      res.status(500).json({ success: false, error: 'Internal server error' });
    }
  }

  async get_InfoShop(req, res) {
    try {
      const seller = await this.db.query('SELECT seller_id FROM seller NATURAL JOIN Customer WHERE customer_id = ?;', [req.session.userId]);
      const sseller = seller[0].seller_id;
      const seller_info = await this.db.query('SELECT * FROM seller  WHERE seller_id = ?;', [sseller]);
      res.json( seller_info );
    } catch (err) {
      console.error('Error in editProductSell:', err);
      res.status(500).json({ success: false, error: 'Internal server error' });
    }
  }




}

const sellerRouter = new SellerRouter();
module.exports = sellerRouter.router;
