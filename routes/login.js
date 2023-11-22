const Database = require('../routes/db');
const express = require("express");
const path = require("path");

const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const db = new Database();
db.connect();








const notLogIn = (req, res, next) => {
    if (!req.session || !req.session.isLoggedIn) {
        res.render(path.join(__dirname, "../views/main.ejs"), {
            clickLoginButton: true,
        });
        return;
    }
    next();
};



router.get('/product',notLogIn, (req, res, next) => {
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






router.post('/api/login/', async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        const [rows] = await db.query('SELECT * FROM Customer WHERE email = ?', [email]);
        console.log('Database Query Result:', rows);

        if (rows.length === 1 && bcrypt.compareSync(password, rows[0].password)) {
            req.session.userId = rows[0].id;
            req.session.username = rows[0].username;
            res.json({ success: true });
        } else {
            res.json({ success: false, error: 'Invalid username or password' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});









router.post('/save-register', async (req, res) => {
    const { Uuserinput_sign, Uusernameinput_sign, Ppassinput_sign } = req.body;

    try {
        // ทำการ query ฐานข้อมูลเพื่อตรวจสอบว่า Uuserinput_sign มีอยู่ในฐานข้อมูลหรือไม่
        const results = await db.query('SELECT * FROM Customer WHERE email = ?', [Uuserinput_sign]);

        if (results.length > 0) {
            // อีเมลถูกลงทะเบียนแล้ว
            res.json({ check_mail: false });
        } else {

            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(Ppassinput_sign, saltRounds);
            // ทำการ insert ข้อมูลลงในฐานข้อมูล

            let maxIdResults = await db.query('SELECT max(customer_id) as Max_id FROM Customer limit 1;');
            let max_id = maxIdResults[0].Max_id;

            // เรียกใช้ max_id ในการกำหนดค่าในการ INSERT
            await db.query('INSERT INTO Customer (customer_id, email, username, password) VALUES (?, ?, ?, ?)', [++max_id, Uuserinput_sign, Uusernameinput_sign, hashedPassword]);

            console.log('Data inserted successfully');
        res.json({ check_mail: true}) 
        }
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



router.get('/logout', (req, res) => {
    req.session = null;
    res.redirect('/main');
  });
    





module.exports = router;






