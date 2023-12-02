const express = require("express");
const multer = require("multer");
const fs = require("fs");
const util = require("util");
const path = require("path");
const router = express.Router();
const Database = require("../routes/db");
const db = new Database();
db.connect();
router.use(express.static(path.join(__dirname, "../public")));

router.post("/profile", async (req, res) => {
  if (req.session.isLoggedIn) {
    // Assuming req.session.isLoggedIn contains a valid customer_id
    await db.query("UPDATE Customer SET profile_picture = ? WHERE customer_id = ?",[filePath, req.session.userId])
      .then((profile_pic) => {
        const profile_picture = profile_pic[0].profile_picture;
        console.log(profile_picture)
        res.json({ message: "File uploaded successfully", profile_picture });
      })
      .catch((err) => {
        console.error("Error executing SQL query:", err);
        res
          .status(500)
          .json({ error: "An error occurred while fetching data." });
      });
  }
});

router.get("/profile",async (req,res)=>{
  if(req.session.isLoggedIn){
    await db.query("SELECT * FROM Cutomer WHERE customer_id = ?",[req.session.userId])
    .then(data => {
      // Assuming data is an array of objects containing Customer and Address details
      console.log(data);
      res.json(data);
    })
    .catch(err => {
        console.error('Error executing SQL query:', err);
        res.status(500).json({ error: 'An error occurred while fetching data.' });
    });
  }else {
        res.status(401).json({ error: 'User is not logged in.' });
  }
})

router.get("/api/profile/", async (req, res) => {
  if (req.session.isLoggedIn) {
    await db.query("SELECT * FROM Customer JOIN Address ON Customer.customer_id = Address.customer_id WHERE Customer.customer_id = ?", [req.session.userId])
      .then(data => {
        // Assuming data is an array of objects containing Customer and Address details
        console.log(data);
        res.json(data);

      })
      .catch(err => {
        console.error('Error executing SQL query:', err);
        res.status(500).json({ error: 'An error occurred while fetching data.' });
      });
  } else {
    res.status(401).json({ error: 'User is not logged in.' });
  }
});


router.post("/api/profile/", async (req, res) => {
  if (req.session.isLoggedIn) {
    const updatedData = req.body; // รับข้อมูลที่ถูกส่งมาจาก frontend
    const updateusername = updatedData.username
    const updatefname = updatedData.fname
    const updatelname = updatedData.lname
    const updatedate = updatedData.date
    const updatetol = updatedData.tol
  
    // ตัวอย่างการอัพเดทข้อมูลในฐานข้อมูลโดยใช้ parameterized query
    await db.query(
      "UPDATE Customer SET username = ?, first_name = ?, last_name = ?, date_birth = ?, phone_number = ? WHERE customer_id = ?",
      [updateusername, updatefname, updatelname, updatedate, updatetol, req.session.userId]
    )
      .then(updateData => {
        res.json(updateData);
      })
      .catch(err => {
        console.error('Error executing SQL query:', err);
        res.status(500).json({ error: 'An error occurred while updating data.' });
      });
  } else {
    res.status(401).json({ error: 'User is not logged in.' });
  }
});

router.post("/api/update/", (req, res) => {
  if (req.session.isLoggedIn) {
    const updatedData = req.body; // รับข้อมูลที่ถูกส่งมาจาก frontend
    const updatevillage = updatedData.village
    const updateno = updatedData.no_village
    const updateroad = updatedData.road
    const updatesub = updatedData.sub_district
    const updatedis = updatedData.district
    const updatecity = updatedData.city
    const updatepostal = updatedData.postal

  
    // ตัวอย่างการอัพเดทข้อมูลในฐานข้อมูลโดยใช้ parameterized query
    db.query(
      "UPDATE Address SET village = ?, no_village = ?, road = ?, sub_district = ?, district = ?, city = ?, Postal_id = ? WHERE customer_id = ?",
      [updatevillage, updateno, updateroad, updatesub, updatedis, updatecity, updatepostal, req.session.userId]
    )
      .then(updateData => {
        res.json(updateData);
      })
      .catch(err => {
        console.error('Error executing SQL query:', err);
        res.status(500).json({ error: 'An error occurred while updating data.' });
      });
  } else {
    res.status(401).json({ error: 'User is not logged in.' });
  }
});





module.exports = router;
