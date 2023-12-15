const express = require('express');
const Database = require('../routes/db');

class SellerRouter {
  constructor() {
    this.router = express.Router();
    this.db = new Database();
    this.db.connect();
    this.setupRoutes();
  }

  async getSeller(req, res) {
    if (req.session.isLoggedIn) {
      const isRegistered = await this.db.query("SELECT * FROM seller WHERE customer_id = ?;", [req.session.userId]);
      const isApproved = await this.db.query("SELECT * FROM seller WHERE customer_id = ?;", [req.session.userId]);

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
      res.redirect('/main');
    }
  }

  async getRegisterSeller(req, res) {
    if (req.session.isLoggedIn) {
      const isRegistered = await this.db.query("SELECT * FROM seller WHERE customer_id = ?;", [req.session.userId]);
      const isApproved = await this.db.query("SELECT * FROM seller WHERE customer_id = ?;", [req.session.userId]);

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
      res.redirect('/main');
    }
  }

  async getNewProductInfo(req, res) {
    req.session.product = [];
    if (req.session.isLoggedIn) {
      const isRegistered = await this.db.query("SELECT * FROM seller WHERE customer_id = ?;", [req.session.userId]);
      const isApproved = await this.db.query("SELECT * FROM seller WHERE customer_id = ?;", [req.session.userId]);

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
      res.redirect('/main');
    }
  }

  setupRoutes() {
    this.router.get('/seller', this.getSeller.bind(this));
    this.router.get('/registerseller', this.getRegisterSeller.bind(this));
    this.router.get('/newproductinfo', this.getNewProductInfo.bind(this));
  }
}

const sellerRouter = new SellerRouter();
module.exports = sellerRouter.router;
