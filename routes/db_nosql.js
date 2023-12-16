const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const Type = require('./model/type.js');

mongoose.connect('mongodb+srv://Project1:1234@shsonosql.mo3fh7g.mongodb.net/');

const connection = mongoose.connection;

connection.on('error', console.error.bind(console, 'เกิดข้อผิดพลาดในการเชื่อมต่อ MongoDB:'));



// Define a route to fetch data from the MongoDB collection
router.get('/types', async (req, res) => {
    try {
        // Fetch all documents from the 'types' collection
        const types = await Type.find();
        res.send(types);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router;
