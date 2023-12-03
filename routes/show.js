

const Database = require('../routes/db');
const express = require("express");
const path = require("path");

const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const app = express();



const Login = (req, res, next) => {
    if(req.session.isLoggedIn){
        res.render('main',{ success: false });
    }else{
        res.render('main',{ success: true });
        next();
    }
}

router.get('/', Login, (req, res, next) => {

})
router.get('/main', Login, (req, res, next) => {

})

const Login_cart = (req, res, next) => {
    if(req.session.isLoggedIn){
        req.session.checkProduct = [];
        res.render('cart',{ success: false });
    }else{
        res.render('cart',{ success: true });
        next();
    }
}
router.get("/cart", Login_cart, (req, res) => {
});

const Login_profile = (req, res, next) => {
    if(req.session.isLoggedIn){
        res.render('profile',{ success: false });
    }else{
        res.render('profile',{ success: true });
        next();
    }
}
router.get("/profile", Login_profile, (req, res) => {
});

const Login_status_order = (req, res, next) => {
    if(req.session.isLoggedIn){
        res.render('status_order',{ success: false });
    }else{
        res.render('status_order',{ success: true });
        next();
    }
}
router.get("/status_order", Login_status_order , (req, res) => {
});

router.get("/product", (req, res) => {
    res.render(path.join(__dirname, "../views/product.ejs"));
});

const Login_seller = (req, res, next) => {
    if(req.session.isLoggedIn){
        res.render('seller',{ success: false });
    }else{
        res.render('seller',{ success: true });
        next();
    }
}
router.get("/seller",Login_seller, (req, res) => {
});

router.get("/registerseller", (req, res) => {
    res.render(path.join(__dirname, "../views/registerseller.ejs"));
});


router.get("/pay", (req, res) => {
    res.render(path.join(__dirname, "../views/pay.ejs"));
});
router.get("/newproductinfo", (req, res) => {
    req.session.product = []
    res.render(path.join(__dirname, "../views/newproductinfo.ejs"));
});

router.get("/buy", (req, res) => {
    
    res.render(path.join(__dirname, "../views/buy.ejs"));
});

router.get("/wait_verified", (req, res) => {
    
    res.render(path.join(__dirname, "../views/wait_verified.ejs"));
});

router.get("/seller_order", (req, res) => {
    
    res.render(path.join(__dirname, "../views/seller_order.ejs"));
});













module.exports = router;