const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const util = require('util');
const Database = require('../routes/db');
const db = new Database();
db.connect();

const Login_seller = (req, res, next) => {
    if(req.session.isLoggedIn){
        res.render('seller',{ success: false });
    }else{
        res.render('seller',{ success: true });
        next();
    }

}
router.get("/seller", async (req, res) => {
    if(req.session.isLoggedIn){
            // ตรวจสอบสถานะการลงสมัครแม่ค้าจากฐานข้อมูลหรือระบบที่เก็บข้อมูล
            // ในตัวอย่างนี้จะให้สมมติว่ามีตัวแปร isRegistered และ isApproved เก็บสถานะการลงสมัครแม่ค้า
            const isRegistered = await  db.query("SELECT * FROM seller WHERE customer_id = ?;",[req.session.userId]);// ตัวอย่าง: เมื่อลงสมัครแล้ว
            const isApproved = await db.query("SELECT * FROM seller WHERE customer_id = ?;",[req.session.userId]); // ตัวอย่าง: เมื่อได้รับการอนุมัติแล้ว
            
            if (isRegistered.length>0) {
                const check_approved = isApproved[0].status_seller
                if (check_approved=="verified") {
                    // สถานะ: ลงสมัครและผ่านการอนุมัติ
                    res.render('seller',{ success: false });
                }else {
                    // สถานะ: ลงสมัครแล้ว แต่ยังไม่ผ่านการอนุมัติ
                    res.redirect('wait_verified');
                }
            }else {
            // สถานะ: ยังไม่ลงสมัคร
                res.redirect('registerseller');
            }
    }else{
        res.json({status: "Not Login"})
    }
});




router.get("/registerseller", async (req, res) => {
    if(req.session.isLoggedIn){
        // ตรวจสอบสถานะการลงสมัครแม่ค้าจากฐานข้อมูลหรือระบบที่เก็บข้อมูล
        // ในตัวอย่างนี้จะให้สมมติว่ามีตัวแปร isRegistered และ isApproved เก็บสถานะการลงสมัครแม่ค้า
        const isRegistered = await  db.query("SELECT * FROM seller WHERE customer_id = ?;",[req.session.userId]);// ตัวอย่าง: เมื่อลงสมัครแล้ว
        const isApproved = await db.query("SELECT * FROM seller WHERE customer_id = ?;",[req.session.userId]); // ตัวอย่าง: เมื่อได้รับการอนุมัติแล้ว
        
        if (isRegistered.length>0) {
            const check_approved = isApproved[0].status_seller
            if (check_approved=="verified") {
                // สถานะ: ลงสมัครและผ่านการอนุมัติ
                res.redirect('seller');
            }else {
                // สถานะ: ลงสมัครแล้ว แต่ยังไม่ผ่านการอนุมัติ
                res.redirect('wait_verified');
            }
        }else {
        // สถานะ: ยังไม่ลงสมัคร
            res.render('registerseller');
        }
    }else{
        res.json({status: "Not Login"})
    }
});




router.get("/newproductinfo", async (req, res) => {
    req.session.product = []
    if(req.session.isLoggedIn){
        const isRegistered = await  db.query("SELECT * FROM seller WHERE customer_id = ?;",[req.session.userId]);// ตัวอย่าง: เมื่อลงสมัครแล้ว
        const isApproved = await db.query("SELECT * FROM seller WHERE customer_id = ?;",[req.session.userId]); // ตัวอย่าง: เมื่อได้รับการอนุมัติแล้ว
        
        if (isRegistered.length>0) {
            const check_approved = isApproved[0].status_seller
            if (check_approved=="verified") {
                // สถานะ: ลงสมัครและผ่านการอนุมัติ
                res.render('newproductinfo',{ success: false });
            }else {
                // สถานะ: ลงสมัครแล้ว แต่ยังไม่ผ่านการอนุมัติ
                res.redirect('wait_verified');
            }
        }else {
        // สถานะ: ยังไม่ลงสมัคร
            res.redirect('registerseller');
        }
}else{
    res.json({status: "Not Login"})
}
});


 























module.exports = router;
