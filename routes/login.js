const Database = require('../routes/db');
const express = require("express");
const path = require("path");
const app = express();
const db = new Database();

db.connect();

// Perform your database operations here

db.query('SELECT * FROM customer', [], (err, results) => {
    if (err) {
        console.error('Error:', err);
    } else {
        console.log('Results:', results);
    }

    db.close();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
