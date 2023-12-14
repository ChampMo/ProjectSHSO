const express = require("express");
const multer = require("multer");
const fs = require("fs");
const util = require("util");
const path = require("path");
const Database = require("../routes/db");
const db = new Database();
db.connect();
const upload = multer({ dest: "uploads/" });

class ProfileRouter {
  constructor() {
    this.router = express.Router();
    this.setupRoutes();
  }

  setupRoutes() {
    this.router.use(express.static(path.join(__dirname, "../public")));
    this.router.post("/profile", upload.single("file"), this.postProfile.bind(this));
    this.router.get("/api/profile/", this.getProfile.bind(this));
    this.router.post("/api/profile/", this.postUpdateProfile.bind(this));
    this.router.post("/api/update/", this.postUpdateAddress.bind(this));
  }
  async postProfile(req, res) {
    try {
      if (req.session.isLoggedIn) {
        const filePath = req.file.path; // Assuming you have multer middleware configured
        await db.query("UPDATE Customer SET profile_picture = ? WHERE customer_id = ?", [filePath, req.session.userId]);
        const profile_pic = (await db.query("SELECT profile_picture FROM Customer WHERE customer_id = ?", [req.session.userId]))[0].profile_picture;
        res.json({ message: "File uploaded successfully", profile_picture: profile_pic });
      } else {
        res.status(401).json({ error: 'User is not logged in.' });
      }
    } catch (err) {
      console.error("Error executing SQL query:", err);
      res.status(500).json({ error: "An error occurred while fetching data." });
    }
  }

  async getProfile(req, res) {
    try {
      if (req.session.isLoggedIn) {
        const data = await db.query("SELECT * FROM Customer JOIN Address ON Customer.customer_id = Address.customer_id WHERE Customer.customer_id = ?", [req.session.userId]);
        res.json(data);
      } else {
        res.status(401).json({ error: 'User is not logged in.' });
      }
    } catch (err) {
      console.error('Error executing SQL query:', err);
      res.status(500).json({ error: 'An error occurred while fetching data.' });
    }
  }

  async postUpdateProfile(req, res) {
    try {
      if (req.session.isLoggedIn) {
        const updatedData = req.body;
        const updateusername = updatedData.username;
        const updatefname = updatedData.fname;
        const updatelname = updatedData.lname;
        const updatedate = updatedData.date;
        const updatetol = updatedData.tol;

        await db.query(
          "UPDATE Customer SET username = ?, first_name = ?, last_name = ?, date_birth = ?, phone_number = ? WHERE customer_id = ?",
          [updateusername, updatefname, updatelname, updatedate, updatetol, req.session.userId]
        );
        res.json({ success: true });
      } else {
        res.status(401).json({ error: 'User is not logged in.' });
      }
    } catch (err) {
      console.error('Error executing SQL query:', err);
      res.status(500).json({ error: 'An error occurred while updating data.' });
    }
  }

  async postUpdateAddress(req, res) {
    try {
      if (req.session.isLoggedIn) {
        const updatedData = req.body;
        const updatevillage = updatedData.village;
        const updateno = updatedData.no_village;
        const updateroad = updatedData.road;
        const updatesub = updatedData.sub_district;
        const updatedis = updatedData.district;
        const updatecity = updatedData.city;
        const updatepostal = updatedData.postal;

        await db.query(
          "UPDATE Address SET village = ?, no_village = ?, road = ?, sub_district = ?, district = ?, city = ?, Postal_id = ? WHERE customer_id = ?",
          [updatevillage, updateno, updateroad, updatesub, updatedis, updatecity, updatepostal, req.session.userId]
        );
        res.json({ success: true });
      } else {
        res.status(401).json({ error: 'User is not logged in.' });
      }
    } catch (err) {
      console.error('Error executing SQL query:', err);
      res.status(500).json({ error: 'An error occurred while updating data.' });
    }
  }

}

const profileRouter = new ProfileRouter();
module.exports = profileRouter.router;
