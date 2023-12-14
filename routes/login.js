const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const Database = require("../routes/db");

class AuthRouter {
  constructor() {
    this.router = express.Router();
    this.db = new Database();
    this.db.connect();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post("/api/login/", this.login.bind(this));
    this.router.post("/save-register", this.saveRegister.bind(this));
    this.router.get("/logout", this.logout.bind(this));
    this.router.post("/repassword", this.repassword.bind(this));
  }

  async login(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = req.body;
      const [rows] = await this.db.query("SELECT * FROM Customer WHERE email = ?", [
        email,
      ]);

      if (rows.length === 0) {
        return res.json({ success: false, error: "Invalid username or password" });
      }

      const compare_result = await bcrypt.compare(password, rows.password);

      if (compare_result) {
        req.session.isLoggedIn = true;
        req.session.userId = rows.customer_id;
        return res.json({ success: true });
      } else {
        return res.json({ success: false, error: "Invalid username or password" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async saveRegister(req, res) {
    const { Uuserinput_sign, Uusernameinput_sign, Ppassinput_sign } = req.body;

    try {
        const results = await this.db.query('SELECT * FROM Customer WHERE email = ?', [Uuserinput_sign]);

        if (results.length > 0) {
            // อีเมลถูกลงทะเบียนแล้ว
            res.json({ check_mail: false });
        } else {

            const saltRounds = 12;
            const hashedPassword = await bcrypt.hash(Ppassinput_sign, saltRounds);

            let maxIdResults = await this.db.query('SELECT max(customer_id) as Max_id FROM Customer limit 1;');
            let max_id = maxIdResults[0].Max_id;

            await this.db.query('INSERT INTO Customer (customer_id, email, username, password, first_name, last_name, phone_number, profile_picture) VALUES (?, ?, ?, ?, ?, ?, ?, ?);', [++max_id, Uuserinput_sign, Uusernameinput_sign, hashedPassword, '', '', '', '']);
            await this.db.query('INSERT INTO Cart (cart_id, customer_id) VALUES (?,?)',[max_id,max_id])
            await this.db.query('INSERT INTO Address (address_id, customer_id, village, no_village, road, sub_district, district, city, Postal_id) VALUES (?,?,?,?,?,?,?,?,?)',[max_id,max_id,'','','','','','',''])

            console.log('Data inserted successfully');
            res.json({ check_mail: true}) 
        }
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  logout(req, res) {
    req.session = null;
    res.redirect("/");
  }

  async repassword(req, res) {
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;
    const [oldPassword_compare] = await(this.db.query('SELECT * FROM Customer WHERE customer_id = ?',[req.session.userId]));
    // เทียบและอัปเดตรหัสผ่าน
    const isUpdated = await bcrypt.compare(oldPassword, oldPassword_compare.password);
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
  
    if (isUpdated) {
        if(newPassword.length>=8){
            this.db.query('UPDATE Customer SET password = ? WHERE customer_id = ?',[hashedPassword,req.session.userId]);
            res.json({ success: true, message: 'รหัสผ่านอัปเดตสำเร็จ' });
        }else{
            res.json({success:false, message: 'ไม่สามารถอัปเดตรหัสผ่านได้ (ใส่รหัสผ่านอย่างน้อย 8 ตัว)'});
        }

    } else {
      res.status(400).json({ success: false, message: 'ไม่สามารถอัปเดตรหัสผ่านได้ (รหัสผ่านไม่ถูกต้อง)' });
    }
  }
}

const login = new AuthRouter();
module.exports = login.router;

