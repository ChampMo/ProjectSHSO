const express = require('express');
const router = express.Router();
const Database = require('../routes/db');

class SellerController {
    constructor() {
        this.db = new Database();
        this.db.connect();
    }

    async checkSellerStatus(customerId) {
        const isRegistered = await this.db.query("SELECT * FROM seller WHERE customer_id = ?;", [customerId]);
        const isApproved = await this.db.query("SELECT * FROM seller WHERE customer_id = ?;", [customerId]);

        if (isRegistered.length > 0) {
            const checkApproved = isApproved[0].status_seller;

            if (checkApproved === "verified") {
                return 'registeredAndApproved';
            } else {
                return 'registeredButNotApproved';
            }
        } else {
            return 'notRegistered';
        }
    }

    async renderSellerPage(req, res, status) {
        switch (status) {
            case 'registeredAndApproved':
                res.render('seller', { success: false });
                break;
            case 'registeredButNotApproved':
                res.redirect('wait_verified');
                break;
            case 'notRegistered':
                res.redirect('registerseller');
                break;
            default:
                res.redirect('/');
        }
    }

    // Other methods related to seller functionality

    async getSellerPage(req, res) {
        if (req.session.isLoggedIn) {
            const status = await this.checkSellerStatus(req.session.userId);
            this.renderSellerPage(req, res, status);
        } else {
            res.redirect("/main");
        }
    }
}

const sellerController = new SellerController();

router.get("/seller", async (req, res) => {
    sellerController.getSellerPage(req, res);
});

router.get("/registerseller", async (req, res) => {
    sellerController.getSellerPage(req, res);
});

router.get("/newproductinfo", async (req, res) => {
    req.session.product = [];
    if (req.session.isLoggedIn) {
        const status = await sellerController.checkSellerStatus(req.session.userId);
        sellerController.renderSellerPage(req, res, status);
    } else {
        res.redirect("/main");
    }
});

module.exports = router;
