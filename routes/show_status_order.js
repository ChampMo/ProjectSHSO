const express = require('express');
const router = express.Router();
const Database = require('../routes/db');
const db = new Database();
db.connect();

class OrderRouter {
  constructor() {
    this.router = express.Router();
    this.setupRoutes();
  }

  setupRoutes() {
    this.router.get('/api/count_order_status/', (req, res) => this.getCountOrderStatus(req, res, 'Wait', 'Sending'));
    this.router.post('/api/order_shop/', (req, res) => this.postOrderShop(req, res, 'Wait', 'Sending'));
    this.router.post('/api/order_product/', (req, res) => this.postOrderProduct(req, res));
    this.router.get('/api/count_order_status2/', (req, res) => this.getCountOrderStatus(req, res, 'Success', 'Cancel'));
    this.router.post('/api/order_shop2/', (req, res) => this.postOrderShop(req, res, 'Success', 'Cancel'));
    this.router.post('/api/confirm_success/', (req, res) => this.postConfirmSuccess(req, res));
  }
  
  async getCountOrderStatus(req, res, status1, status2) {
    try {
      const count_shop = await db.query('SELECT seller_id, product_id, order_id FROM Order_list NATURAL JOIN Order_Product NATURAL JOIN Product WHERE customer_id = ? AND (status_order = ? OR status_order = ?) ORDER BY date DESC;', [req.session.userId, status1, status2]);
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
  }

  async postOrderShop(req, res, status1, status2) {
    const { seller_id, order_id } = req.body;

    try {
      const shop_name = await db.query('SELECT shop_name FROM Order_list JOIN Order_Product ON Order_list.order_id = Order_Product.order_id JOIN Product ON Product.product_id = Order_list.product_id JOIN Seller ON Seller.seller_id = Product.seller_id WHERE (status_order = ? OR status_order = ?) AND Order_list.order_id = ? AND seller.seller_id = ? ;', [status1, status2, order_id, seller_id]);
      const date = await db.query('SELECT DATE_FORMAT(date, ?) as date FROM Order_list JOIN Order_Product ON Order_list.order_id = Order_Product.order_id JOIN Product ON Product.product_id = Order_list.product_id JOIN Seller ON Seller.seller_id = Product.seller_id WHERE (status_order = ? OR status_order = ?) AND Order_list.order_id = ? AND seller.seller_id = ? ;', ['%d-%m-%Y', status1, status2, order_id, seller_id]);
      res.json({ shop_name, date });
    } catch (err) {
      console.error('Error executing SQL query:', err);
      res.render('error', { error: 'An error occurred while fetching data.' });
    }
  }

  async postOrderProduct(req, res) {
    const { product_id, order_id } = req.body;

    try {
      const product_info_cart = await db.query('SELECT * FROM Product NATURAL JOIN Picture_product NATURAL JOIN Order_list  WHERE order_id = ? AND product_id = ? ;', [order_id, product_id]);
      res.json(product_info_cart);
    } catch (err) {
      console.error('Error executing SQL query:', err);
      res.render('error', { error: 'An error occurred while fetching data.' });
    }
  }

  async postConfirmSuccess(req, res) {
    const { product_id, order_id } = req.body;

    try {
      await db.query('UPDATE Order_list SET status_order = ?  WHERE order_id = ? AND product_id = ? ;', ['Success', order_id, product_id]);
      res.json({ confirm_success: true });
    } catch (err) {
      console.error('Error executing SQL query:', err);
      res.render('error', { error: 'An error occurred while fetching data.' });
    }
  }


}

const orderRouter = new OrderRouter();
module.exports = orderRouter.router;
