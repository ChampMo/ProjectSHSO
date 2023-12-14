const express = require('express');
const Database = require('../routes/db');
const db = new Database();
db.connect();

class SellerRouter {
  constructor() {
    this.router = express.Router();
    this.setupRoutes();
  }

  setupRoutes() {
    this.router.get('/seller', this.LoginSeller, this.getSeller.bind(this));
    this.router.get('/registerseller', this.getRegisterSeller.bind(this));
    this.router.get('/newproductinfo', this.getNewProductInfo.bind(this));
  }


  LoginSeller(req, res, next) {
    if (req.session.isLoggedIn) {
      res.render('seller', { success: false });
    } else {
      res.render('seller', { success: true });
      next();
    }
  }

  async getSeller(req, res) {
    if (req.session.isLoggedIn) {
      const isRegistered = await db.query("SELECT * FROM seller WHERE customer_id = ?;", [req.session.userId]);
      const isApproved = await db.query("SELECT * FROM seller WHERE customer_id = ?;", [req.session.userId]);

      if (isRegistered.length > 0) {
        const checkApproved = isApproved[0].status_seller;
        if (checkApproved === "verified") {
          res.render('seller', { success: false });
        } else {
          res.redirect('wait_verified');
        }
      } else {
        res.redirect('registerseller');
      }
    } else {
      res.json({ status: "Not Login" });
    }
  }

  async getRegisterSeller(req, res) {
    if (req.session.isLoggedIn) {
      const isRegistered = await db.query("SELECT * FROM seller WHERE customer_id = ?;", [req.session.userId]);
      const isApproved = await db.query("SELECT * FROM seller WHERE customer_id = ?;", [req.session.userId]);

      if (isRegistered.length > 0) {
        const checkApproved = isApproved[0].status_seller;
        if (checkApproved === "verified") {
          res.redirect('seller');
        } else {
          res.redirect('wait_verified');
        }
      } else {
        res.render('registerseller');
      }
    } else {
      res.json({ status: "Not Login" });
    }
  }

  async getNewProductInfo(req, res) {
    req.session.product = [];
    if (req.session.isLoggedIn) {
      const isRegistered = await db.query("SELECT * FROM seller WHERE customer_id = ?;", [req.session.userId]);
      const isApproved = await db.query("SELECT * FROM seller WHERE customer_id = ?;", [req.session.userId]);

      if (isRegistered.length > 0) {
        const checkApproved = isApproved[0].status_seller;
        if (checkApproved === "verified") {
          res.render('newproductinfo', { success: false });
        } else {
          res.redirect('wait_verified');
        }
      } else {
        res.redirect('registerseller');
      }
    } else {
      res.json({ status: "Not Login" });
    }
  }

  
}

const sellerRouter = new SellerRouter();
module.exports = sellerRouter.router;
