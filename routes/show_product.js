const express = require('express');
const path = require('path');
const Database = require('../routes/db');
const db = new Database();
db.connect();

class ProductRouter {
  constructor() {
    this.router = express.Router();
    this.setupRoutes();
  }

  setupRoutes() {
    this.router.use(express.static(path.join(__dirname, "../public")));
    this.router.get('/api/count_products/', this.getCountProducts.bind(this));
    this.router.post('/search-product/', this.postSearchProduct.bind(this));
    this.router.post('/api/products-search/', this.postProductsSearch.bind(this));
    this.router.get('/product/:id', this.getProductById.bind(this));
    this.router.get('/api/count_in_cart/', this.getCountInCart.bind(this));
    this.router.post('/api/product_add_cart/', this.postProductAddCart.bind(this));
  }
  
  async getCountProducts(req, res) {
    try {
      const productIds = await db.query('SELECT product_id FROM Product;');
      res.json(productIds);
    } catch (err) {
      console.error('Error executing SQL query:', err);
      res.status(500).json({ error: 'An error occurred while fetching data.' });
    }
  }

  async postSearchProduct(req, res) {
    let input1 = req.body;

    try {
      const productIds = await db.query('SELECT product_id FROM Product WHERE name LIKE ?;', [`%${input1.input1}%`]);
      res.json(productIds);
    } catch (err) {
      console.error('Error executing SQL query:', err);
      res.status(500).json({ error: 'An error occurred while fetching data.' });
    }
  }

  async postProductsSearch(req, res) {
    let productId = req.body;

    try {
      const products = await db.query('SELECT * FROM Product natural join Picture_product  WHERE product_id = ?;', [productId.productId]);
      res.json(products);
    } catch (err) {
      console.error('Error executing SQL query:', err);
      res.render('error', { error: 'An error occurred while fetching data.' });
    }
  }

  async getProductById(req, res) {
    const id_pro = req.params.id;
    if (req.session.isLoggedIn) {
      try {
        const products = await db.query('SELECT * FROM Seller NATURAL JOIN Product NATURAL JOIN Picture_product WHERE product_id = ? LIMIT 1;', [id_pro]);

        const address = await db.query('SELECT * FROM Address JOIN Customer ON Address.customer_id = Customer.customer_id LIMIT 1; ');

        req.session.checkProduct = id_pro;
        res.render('product', { products, address, success: false });
      } catch (err) {
        console.error('Error executing SQL query:', err);
        res.render('error', { error: 'An error occurred while fetching data.' });
      }
    } else {
      try {
        const products = await db.query('SELECT * FROM Seller NATURAL JOIN Product NATURAL JOIN Picture_product WHERE product_id = ? LIMIT 1;', [id_pro]);

        const address = await db.query('SELECT * FROM Address JOIN Customer ON Address.customer_id = Customer.customer_id LIMIT 1; ');

        res.render('product', { products, address, success: true });
      } catch (err) {
        console.error('Error executing SQL query:', err);
        res.render('error', { error: 'An error occurred while fetching data.' });
      }
    }
  }

  async getCountInCart(req, res) {
    const user_id = req.session.userId;
    if (req.session.isLoggedIn) {
      try {
        const result = await db.query('SELECT count(Cart_Product.product_id) as amount_pro_cart FROM Cart_Product JOIN Cart ON Cart_Product.cart_id = Cart.cart_id WHERE customer_id = ? GROUP BY Cart_Product.cart_id LIMIT 1;', [user_id]);

        let amount_pro_cart = result[0].amount_pro_cart;
        res.json(amount_pro_cart);
      } catch (err) {
        res.json(0);
      }
    } else {
      res.json(0);
    }
  }

  async postProductAddCart(req, res) {
    let amount_pro = req.body;
    const amount_Pro = amount_pro.amount_pro;
    const proId = req.session.checkProduct;

    try {
      if (req.session.isLoggedIn) {
        const [rows] = await db.query('SELECT * FROM Cart_Product WHERE cart_id = ? AND product_id = ? ;', [req.session.userId, proId]);

        if (rows === undefined) {
          await db.query('INSERT INTO Cart_Product VALUES (?, ?, ?, ?) ;', [req.session.userId, proId, amount_Pro, new Date()]);
        } else {
          await db.query('UPDATE Cart_product SET product_amount = ? , cart_product_date = ? WHERE cart_id = ? AND product_id = ? ;', [amount_Pro, new Date(), req.session.userId, proId]);
        }
        res.json({ add_cart: true, proId });
      } else {
        res.json({ add_cart: false });
      }
    } catch (err) {
      console.error('Error executing SQL query:', err);
      res.render('error', { error: 'An error occurred while fetching data.' });
    }
  }
}

const productRouter = new ProductRouter();
module.exports = productRouter.router;
