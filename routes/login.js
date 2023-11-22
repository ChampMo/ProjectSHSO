const Database = require('../routes/db');
const express = require("express");
const path = require("path");

const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const db = new Database();
db.connect();



const Login = (req, res, next) => {
    if(req.session.isLoggedIn){
        res.render('main',{ success: false });
    }else{
        res.render('main',{ success: true });
        next();
    }
}


router.get('/',Login, (req, res, next) => {

})
router.get('/main',Login, (req, res, next) => {

})


//login

router.post('/api/login/', async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        const { email, password } = req.body;
        const [rows] = await db.query('SELECT * FROM Customer WHERE email = ?', [email]);

        if (rows.length === 0) {
            return res.json({ success: false, error: 'Invalid username or password' });
        }

        const compare_result = await bcrypt.compare(password, rows.password);

        if (compare_result) {
            req.session.isLoggedIn = true;
            req.session.userId = rows.customer_id;
            return res.json({ success: true });
            // res.redirect('/')
        } else {
            return res.json({ success: false, error: 'Invalid username or password' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


//register

router.post('/save-register', async (req, res) => {
    const { Uuserinput_sign, Uusernameinput_sign, Ppassinput_sign } = req.body;

    try {
        // ทำการ query ฐานข้อมูลเพื่อตรวจสอบว่า Uuserinput_sign มีอยู่ในฐานข้อมูลหรือไม่
        const results = await db.query('SELECT * FROM Customer WHERE email = ?', [Uuserinput_sign]);

        if (results.length > 0) {
            // อีเมลถูกลงทะเบียนแล้ว
            res.json({ check_mail: false });
        } else {

            const saltRounds = 12;
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
    res.redirect("/");
});




module.exports = router;





