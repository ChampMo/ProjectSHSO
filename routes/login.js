const Database = require('../routes/db');
const express = require("express");
const path = require("path");

const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const db = new Database();
db.connect();
const app = express();








const notLogIn = (req, res, next) => {
    if (!req.session || !req.session.isLoggedIn) {
        return res.render(path.join(__dirname, "../views/login.ejs"));
    }
    next()
}

router.get('/',notLogIn, (req, res, next) => {
    db.query('SELECT first_name FROM Customer WHERE id = ?', [req.session.userID])
        .then(([rows]) => {
            res.render((path.join(__dirname, "../views/main.ejs")),{
                first_name: rows[0].first_name
            })
        })
        .catch(err => {
            console.error('Error executing SQL query:', err);
            // Handle the error, e.g., by rendering an error page
            res.render('error', { error: 'An error occurred while fetching data.' });
        });
})







module.exports = router;







// Perform your database operations here

// db.query('SELECT * FROM customer', [], (err, results) => {
//     if (err) {
//         console.error('Error:', err);
//     } else {
//         console.log('Results:', results);
//     }

//     db.close();
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
