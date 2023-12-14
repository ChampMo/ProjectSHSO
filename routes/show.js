const express = require('express');
const path = require('path');
const router = express.Router();

class AuthRouter {
  constructor() {
    this.router = express.Router();
    this.setupRoutes();
  }

  
  setupRoutes() {
    this.router.get('/', this.loginCheck, (req, res, next) => {});
    this.router.get('/main', this.loginCheck, (req, res, next) => {});

    this.router.get('/cart', this.loginCartCheck, (req, res) => {});

    this.router.get('/profile', this.loginProfileCheck, (req, res) => {});

    this.router.get('/status_order', this.loginStatusOrderCheck, (req, res) => {});

    this.router.get('/product', (req, res) => {
      res.render(path.join(__dirname, '../views/product.ejs'));
    });

    this.router.get('/pay', (req, res) => {
      res.render(path.join(__dirname, '../views/pay.ejs'));
    });

    this.router.get('/buy', (req, res) => {
      res.render(path.join(__dirname, '../views/buy.ejs'));
    });

    this.router.get('/wait_verified', (req, res) => {
      res.render(path.join(__dirname, '../views/wait_verified.ejs'));
    });

    this.router.get('/seller_order', (req, res) => {
      res.render(path.join(__dirname, '../views/seller_order.ejs'));
    });
  }

  loginCheck(req, res, next) {
    if (req.session.isLoggedIn) {
      res.render('main', { success: false });
    } else {
      res.render('main', { success: true });
      next();
    }
  }

  loginCartCheck(req, res, next) {
    if (req.session.isLoggedIn) {
      req.session.checkProduct = [];
      res.render('cart', { success: false });
    } else {
      res.render('cart', { success: true });
      next();
    }
  }

  loginProfileCheck(req, res, next) {
    if (req.session.isLoggedIn) {
      res.render('profile', { success: false });
    } else {
      res.render('profile', { success: true });
      next();
    }
  }

  loginStatusOrderCheck(req, res, next) {
    if (req.session.isLoggedIn) {
      res.render('status_order', { success: false });
    } else {
      res.render('status_order', { success: true });
      next();
    }
  }

}

const authRouter = new AuthRouter();
module.exports = authRouter.router;
