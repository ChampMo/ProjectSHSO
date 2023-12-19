const express = require('express');
const Database = require('../routes/db');
const db = new Database();
const { Type ,Catelog } = require('./model/type.js');
db.connect();

class ShoppingCartRouter {
  constructor() {
    this.router = express.Router();
    this.setupRoutes();
  }

  
  setupRoutes() {
    this.router.get('/api/count_shop/', this.getCountShop.bind(this));
    this.router.post('/api/shop/', this.postShop.bind(this));
    this.router.post('/api/cart_product/', this.postCartProduct.bind(this));
    this.router.post('/api/cart_count_decrement/', this.postCartCountDecrement.bind(this));
    this.router.post('/api/cart_count_increment/', this.postCartCountIncrement.bind(this));
    this.router.post('/api/check_produck/', this.postCheckProduct.bind(this));
    this.router.get('/api/check_order/', this.getCheckOrder.bind(this));
    this.router.delete('/api/delete_product_cart/', this.deleteProductCart.bind(this));
  }

  async getCountShop(req, res) {
    try {
      const countShop = await db.query('SELECT product_id, seller_id FROM Seller NATURAL JOIN Product NATURAL JOIN Picture_product NATURAL JOIN Cart_Product WHERE cart_id = ? ORDER BY cart_product_date DESC;', req.session.userId);

      const data = countShop.map(row => ({
        product_id: row.product_id,
        seller_id: row.seller_id
      }));
      console.log(data);
      res.json(data);
    } catch (err) {
      console.error('Error executing SQL query:', err);
      res.status(500).json({ error: 'An error occurred while fetching data.' });
    }
  }

  async postShop(req, res) {
    const { seller_id } = req.body;

    try {
      const shopName = await db.query('SELECT shop_name FROM Seller NATURAL JOIN Product NATURAL JOIN Picture_product NATURAL JOIN Cart_Product WHERE cart_id = ? AND seller_id = ?;', [req.session.userId, seller_id]);
      res.json(shopName);
    } catch (err) {
      console.error('Error executing SQL query:', err);
      res.render('error', { error: 'An error occurred while fetching data.' });
    }
  }

  async postCartProduct(req, res) {
    const { product_id } = req.body;

    try {
      const checkProductAmount = await db.query('SELECT product_amount, quantity FROM Product NATURAL JOIN Picture_product NATURAL JOIN Cart_Product WHERE cart_id = ? AND product_id = ?;', [req.session.userId, product_id]);
      const productAmount = checkProductAmount[0].product_amount;
      const quantity = checkProductAmount[0].quantity;

      if (parseInt(productAmount) > parseInt(quantity)) {
        await db.query('UPDATE Cart_Product SET product_amount = ? WHERE cart_id = ? AND product_id = ?;', [quantity, req.session.userId, product_id]);
      }

      const productInfoCart = await db.query('SELECT * FROM Product NATURAL JOIN Picture_product NATURAL JOIN Cart_Product WHERE cart_id = ? AND product_id = ?;', [req.session.userId, product_id]);
      const types_info = await Catelog.find({ id_product: product_id });
      const typesId = types_info.map(item => item.type_id);
      const types_product = await Type.find({ type_id: typesId });
      res.json({productInfoCart,types_product});
    } catch (err) {
      console.error('Error executing SQL query:', err);
      res.render('error', { error: 'An error occurred while fetching data.' });
    }
  }

  async postCartCountDecrement(req, res) {
    let { product_id } = req.body;

    try {
      if (!req.session.userId || !product_id) {
        throw new Error('Missing required parameters');
      }

      const checkProductAmount = await db.query('SELECT product_amount, quantity FROM Product NATURAL JOIN Picture_product NATURAL JOIN Cart_Product WHERE cart_id = ? AND product_id = ?;', [req.session.userId, product_id]);
      const productAmount = checkProductAmount[0].product_amount;

      if (productAmount > 1) {
        let beforeCountD = await db.query('SELECT product_amount FROM Cart_Product WHERE cart_id = ? AND product_id = ? ', [req.session.userId, product_id]);
        let bbeforeCountD = beforeCountD[0].product_amount;

        await db.query('UPDATE Cart_Product SET product_amount = ? WHERE cart_id = ? AND product_id = ? ', [--bbeforeCountD, req.session.userId, product_id]);

        let countd = await db.query('SELECT product_amount FROM Cart_Product WHERE cart_id = ? AND product_id = ? ', [req.session.userId, product_id]);
        res.json({ countd: countd[0].product_amount });
      } else {
        let countd = await db.query('SELECT product_amount FROM Cart_Product WHERE cart_id = ? AND product_id = ? ', [req.session.userId, product_id]);
        res.json({ countd: countd[0].product_amount });
      }
    } catch (err) {
      console.error('Error executing SQL query:', err);
      res.status(500).json({ error: 'An error occurred while fetching data.', details: err.message });
    }
  }

  async postCartCountIncrement(req, res) {
    let { product_id } = req.body;

    try {
      if (!req.session.userId || !product_id) {
        throw new Error('Missing required parameters');
      }

      let beforeCountI = await db.query('SELECT product_amount, quantity FROM Product NATURAL JOIN Cart_Product WHERE cart_id = ? AND product_id = ? ', [req.session.userId, product_id]);
      let bbeforeCountI = parseInt(beforeCountI[0].product_amount);
      const qQuantity = parseInt(beforeCountI[0].quantity);

      if (bbeforeCountI < qQuantity) {
        await db.query('UPDATE Cart_Product SET product_amount = ? WHERE cart_id = ? AND product_id = ? ', [++bbeforeCountI, req.session.userId, product_id]);
        let counti = await db.query('SELECT product_amount FROM Cart_Product WHERE cart_id = ? AND product_id = ? ', [req.session.userId, product_id]);
        res.json({ counti: counti[0].product_amount, bucount: true });
      } else {
        let counti = await db.query('SELECT product_amount FROM Cart_Product WHERE cart_id = ? AND product_id = ? ', [req.session.userId, product_id]);
        res.json({ counti: counti[0].product_amount, bucount: false });
      }
    } catch (err) {
      console.error('Error executing SQL query:', err);
      res.status(500).json({ error: 'An error occurred while fetching data.', details: err.message });
    }
  }

  async postCheckProduct(req, res) {
    try {
      let { checkedIds } = req.body;
      let check_cost = 0;
      

      await Promise.all(checkedIds.map(async (element) => {
        let oneCost = await db.query('SELECT (price * product_amount) as one_cost FROM Product NATURAL JOIN Cart_Product WHERE cart_id = ? AND product_id = ?;', [req.session.userId, element]);
        check_cost += parseInt(oneCost[0].one_cost);
      }));

      req.session.checkProduct = checkedIds;
      console.log('session.checkProduct', req.session.checkProduct);
      console.log({ check_cost })
      res.json({ check_cost });
    } catch (err) {
      console.error('Error executing SQL query:', err);
      res.status(500).json({ error: 'An error occurred while fetching data.', details: err.message });
    }
  }

  async getCheckOrder(req, res) {
    try {
      const selId = req.session.checkProduct;
      res.json({ selId });
    } catch (err) {
      console.error('Error handling check_order request:', err);
      res.status(500).json({ error: 'An error occurred while handling the request.', details: err.message });
    }
  }

  async deleteProductCart(req, res) {
    try {
      let { product_id } = req.body;
      db.query('DELETE FROM Cart_Product WHERE cart_id = ? AND product_id = ?;', [req.session.userId, product_id]);
      res.json({ DELETE: true });
    } catch (err) {
      res.json({ DELETE: false });
    }
  }

}

const shoppingCartRouter = new ShoppingCartRouter();
module.exports = shoppingCartRouter.router;
