const Database = require('../routes/db');
const express = require("express");
const path = require("path");

const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const db = new Database();
db.connect();






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
            await db.query('INSERT INTO Cart (cart_id, customer_id) VALUES (?,?)',[max_id,max_id])
            await db.query('INSERT INTO Address (address_id, customer_id, village, no_village, road, sub_district, district, city, Postal_id) VALUES (?,?,?,?,?,?,?,?,?)',[max_id,max_id,'','','','','','',''])

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

router.post('/repassword', async (req, res) => {
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;
    const [oldPassword_compare] = await(db.query('SELECT * FROM Customer WHERE customer_id = ?',[req.session.userId]));
    // เรียกใช้ฟังก์ชันเปรียบเทียบและอัปเดตรหัสผ่าน
    const isUpdated = await bcrypt.compare(oldPassword, oldPassword_compare.password);
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
  
    if (isUpdated) {
        if(newPassword.length>=8){
            db.query('UPDATE Customer SET password = ? WHERE customer_id = ?',[hashedPassword,req.session.userId]);
            res.json({ success: true, message: 'รหัสผ่านอัปเดตสำเร็จ' });
        }else{
            res.json({success:false, message: 'ไม่สามารถอัปเดตรหัสผ่านได้ (ใส่รหัสผ่านอย่างน้อย 8 ตัว)'});
        }

    } else {
      // ถ้าเกิดข้อผิดพลาดหรือไม่สามารถอัปเดตรหัสผ่านได้
      res.status(400).json({ success: false, message: 'ไม่สามารถอัปเดตรหัสผ่านได้ (รหัสผ่านไม่ถูกต้อง)' });
    }
  });



module.exports = router;





