const express = require("express");
const path = require("path");
const app = express();

class AppServer {
  constructor() {
    this.configureExpress();
    this.configureRoutes();
    this.startServer();
  }

  configureExpress() {
    this.app = express();
    this.app.use(express.static(path.join(__dirname, "/public")));
    this.app.use(express.static(path.join(__dirname, "/HTML")));
  }

  configureRoutes() {
    // const showProfileRoute = require("./routes/show_profile");

    // this.app.use("/", showProfileRoute);

    this.app.get("/", (req, res) => {
      res.sendFile(path.join(__dirname, "/HTML/main.html"));
    });

    this.app.get("/cart", (req, res) => {
      res.sendFile(path.join(__dirname, "/HTML/cart.html"));
    });

    this.app.get("/profile", (req, res) => {
      res.sendFile(path.join(__dirname, "/HTML/profile.html"));
    });

    this.app.get("/status_order", (req, res) => {
      res.sendFile(path.join(__dirname, "/HTML/status_order.html"));
    });

    this.app.get("/product", (req, res) => {
      res.sendFile(path.join(__dirname, "/HTML/product.html"));
    });
  }

  startServer() {
    const PORT = process.env.PORT || 3000;
    this.app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  }
}

new AppServer();
