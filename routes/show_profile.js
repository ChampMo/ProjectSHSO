const express = require('express');
const multer = require('multer');
const fs = require('fs');
const util = require('util');
const path = require('path');
const router = express.Router();
const Database = require('../routes/db');
const db = new Database();
db.connect();




router.post('/profile', async (req, res) => {

    if (req.session.isLoggedIn) {
      // Assuming req.session.isLoggedIn contains a valid customer_id
      await db.query('UPDATE Customer SET profile_picture = ? WHERE customer_id = ?', [filePath, req.session.userId]);
      await db.query('SELECT profile_picture FROM Customer WHERE customer_id = ?', [ req.session.userId])
              .then(profile_pic => {
                const profile_picture = profile_pic[0].profile_picture;
                res.json({ message: 'File uploaded successfully', profile_picture });
              })
              .catch(err => {
                console.error('Error executing SQL query:', err);
                res.status(500).json({ error: 'An error occurred while fetching data.' });
              });
    }

});


module.exports = router;
