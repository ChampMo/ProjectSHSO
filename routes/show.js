

const Database = require('../routes/db');
const express = require("express");
const path = require("path");

const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const app = express();


// router.get("/", (req, res) => {
//     res.render(path.join(__dirname, "../views/main.ejs"));
// });

router.get("/main", (req, res) => {
    res.render(path.join(__dirname, "../views/main.ejs"));
});

router.get("/cart", (req, res) => {
    res.render(path.join(__dirname, "../views/cart.ejs"));
});

router.get("/profile", (req, res) => {
    res.render(path.join(__dirname, "../views/profile.ejs"));
});

router.get("/status_order", (req, res) => {
    res.render(path.join(__dirname, "../views/status_order.ejs"));
});

router.get("/product", (req, res) => {
    res.render(path.join(__dirname, "../views/product.ejs"));
});

router.get("/seller", (req, res) => {
    res.render(path.join(__dirname, "../views/seller.ejs"));
});

router.get("/registerseller", (req, res) => {
    res.render(path.join(__dirname, "../views/registerseller.ejs"));
});

router.get("/pay", (req, res) => {
    res.render(path.join(__dirname, "../views/pay.ejs"));
});

router.get("/info_newproduct", (req, res) => {
    res.render(path.join(__dirname, "../views/info_newproduct.ejs"));
});

router.get("/buy.ejs", (req, res) => {
    res.render(path.join(__dirname, "../views/buy.ejs"));
});
















module.exports = router;