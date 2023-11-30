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
    await db.query("UPDATE Customer SET profile_picture = ? WHERE customer_id = ?",[filePath, req.session.userId]);
    await db.query("SELECT profile_picture FROM Customer WHERE customer_id = ?", [req.session.userId,])
      .then((profile_pic) => {
        const profile_picture = profile_pic[0].profile_picture;
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

router.get("/api/profile/", (req, res) => {
  if (req.session.isLoggedIn) {
    db.query("SELECT * FROM Customer JOIN Address ON Customer.customer_id = Address.customer_id WHERE Customer.customer_id = ?", [req.session.userId])
      .then(data => {
        // Assuming data is an array of objects containing Customer and Address details
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


module.exports = router;
