const express = require('express');
const Database = require('../routes/db');

class OrderRouter {
  constructor() {
    this.router = express.Router();
    this.db = new Database();
    this.db.connect();
    this.setupRoutes();
  }

  setupRoutes() {
    this.router.get('/api/count_order_sell/', this.getCountOrderSell.bind(this));
    this.router.post('/api/order_sell/', this.getOrderSell.bind(this));
    this.router.post('/api/order_product_sell/', this.getOrderProductSell.bind(this));
    this.router.post('/api/order_customer_sell/', this.getOrderCustomerSell.bind(this));
    this.router.get('/api/count_order_sell2/', this.getCountOrderSell2.bind(this));
    this.router.post('/api/order_sell2/', this.getOrderSell2.bind(this));
    this.router.post('/api/order_product_sell2/', this.getOrderProductSell2.bind(this));
    this.router.post('/api/confirm_sucess_sell_cancel/', this.confirmSuccessSellCancel.bind(this));
    this.router.post('/api/confirm_sucess_sell/', this.confirmSuccessSell.bind(this));
  }

  async getCountOrderSell(req, res) {
    try {
      const seller = await this.db.query('SELECT seller_id FROM seller NATURAL JOIN Customer WHERE customer_id = ?;', [req.session.userId]);
      const sseller = seller[0].seller_id;
      const countShop = await this.db.query('SELECT * FROM Order_list NATURAL JOIN Order_Product NATURAL JOIN Customer NATURAL JOIN product WHERE seller_id = ? AND status_order = ? ORDER BY order_id DESC;', [sseller, 'Wait']);
      const data = countShop.map(row => ({
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

  async getOrderSell(req, res) {
    const { product_id, order_id } = req.body;
    try {
      const date = await this.db.query('SELECT DATE_FORMAT(date, ?) as date FROM Order_list WHERE status_order = "wait" AND order_id = ? AND product_id = ? ;', ['%d-%m-%Y', order_id, product_id]);
      res.json({ date });
    } catch (err) {
      console.error('Error executing SQL query:', err);
      res.render('error', { error: 'An error occurred while fetching data.' });
    }
  }

  async getOrderProductSell(req, res) {
    const { seller_id, product_id, order_id } = req.body;
    try {
      const productInfoCart = await this.db.query('SELECT * FROM Order_list NATURAL JOIN Order_Product NATURAL JOIN Customer NATURAL JOIN product NATURAL JOIN Picture_Product WHERE seller_id = ? AND status_order = ? AND product_id = ? AND order_id = ?;', [seller_id, 'Wait', product_id, order_id]);
      res.json(productInfoCart);
    } catch (err) {
      console.error('Error executing SQL query:', err);
      res.render('error', { error: 'An error occurred while fetching data.' });
    }
  }

  async getOrderCustomerSell(req, res) {
    const { seller_id, product_id, order_id } = req.body;
    try {
      const customerIdResults = await this.db.query('SELECT * FROM Order_list NATURAL JOIN Order_Product NATURAL JOIN Customer NATURAL JOIN product NATURAL JOIN Picture_Product WHERE seller_id = ? AND status_order = ? AND product_id = ? AND order_id = ?;', [seller_id, 'Wait', product_id, order_id]);
      const customerInfo = await this.db.query('SELECT * FROM Customer NATURAL JOIN Address WHERE customer_id = ?;', [customerIdResults[0].customer_id]);
      res.json(customerInfo);
    } catch (err) {
      console.error('Error executing SQL query:', err);
      res.render('error', { error: 'An error occurred while fetching data.' });
    }
  }

  async getCountOrderSell2(req, res) {
    try {
      const seller = await this.db.query('SELECT seller_id FROM seller NATURAL JOIN Customer WHERE customer_id = ?;', [req.session.userId]);
      const sseller = seller[0].seller_id;
      const countShop = await this.db.query('SELECT * FROM Order_list NATURAL JOIN Order_Product NATURAL JOIN Customer NATURAL JOIN product WHERE seller_id = ? AND (status_order = ? OR status_order = ? OR status_order = ?) ORDER BY order_id DESC;', [sseller, 'Success', 'Sending', 'Cancel']);
      const data = countShop.map(row => ({
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

  async getOrderSell2(req, res) {
    const { product_id, order_id } = req.body;
    try {
      const date = await this.db.query('SELECT DATE_FORMAT(date, ?) as date FROM Order_list WHERE (status_order = ? OR status_order = ? OR status_order = ?) AND order_id = ? AND product_id = ? ;', ['%d-%m-%Y', 'Success', 'Sending', 'Cancel', order_id, product_id]);
      res.json({ date });
    } catch (err) {
      console.error('Error executing SQL query:', err);
      res.render('error', { error: 'An error occurred while fetching data.' });
    }
  }

  async getOrderProductSell2(req, res) {
    const { seller_id, product_id, order_id } = req.body;
    try {
      const productInfoCart = await this.db.query('SELECT * FROM Order_list NATURAL JOIN Order_Product NATURAL JOIN Customer NATURAL JOIN product NATURAL JOIN Picture_Product WHERE seller_id = ? AND product_id = ? AND order_id = ? AND (status_order = ? OR status_order = ? OR status_order = ?);', [seller_id, product_id, order_id, 'Success', 'Sending', 'Cancel']);
      res.json(productInfoCart);
    } catch (err) {
      console.error('Error executing SQL query:', err);
      res.render('error', { error: 'An error occurred while fetching data.' });
    }
  }

  async confirmSuccessSellCancel(req, res) {
    const { product_id, order_id } = req.body;
    console.log('product - ', product_id, 'order - ', order_id)
    try {
      await this.db.query('UPDATE Order_list SET status_order = ?  WHERE order_id = ? AND product_id = ? ;', ['Cancel', order_id, product_id]);
      res.json({ confirm_success: true });
    } catch (err) {
      console.error('Error executing SQL query:', err);
      res.render('error', { error: 'An error occurred while fetching data.' });
    }
  }

  async confirmSuccessSell(req, res) {
    const { product_id, order_id } = req.body;
    console.log('product - ', product_id, 'order - ', order_id)
    try {
      await this.db.query('UPDATE Order_list SET status_order = ?  WHERE order_id = ? AND product_id = ? ;', ['Sending', order_id, product_id]);
      res.json({ confirm_success: true });
    } catch (err) {
      console.error('Error executing SQL query:', err);
      res.render('error', { error: 'An error occurred while fetching data.' });
    }
  }
}

const orderRouter = new OrderRouter();
module.exports = orderRouter.router;
