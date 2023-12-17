const express = require("express");
const path = require("path");
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');



class AppServer {
  constructor() {
    this.configureExpress();
    this.configureRoutes();
    this.startServer();
  }

  configureExpress() {
    this.app = express();

    this.app.use(bodyParser.json());
    
    this.app.use(express.urlencoded({ extended: false }))

    this.app.use(cookieSession({
      name:'session',
      keys: ['key1','key2'],
      maxAge: 3600 * 1000 * 24 //24hr
    }))

    this.app.use(express.static(path.join(__dirname, "/public")));
    this.app.set('views', path.join(__dirname, '/views'))
    this.app.set('view engine', 'ejs')
  }

  configureRoutes() {

     const login = require("./routes/login");
     this.app.use("/", login);

     const show_product = require("./routes/show_product");
     this.app.use("/", show_product);

     const show = require("./routes/show");
     this.app.use("/", show);

     const upload = require("./routes/upload");
     this.app.use("/", upload);

     const registerseller = require("./routes/registerseller");
     this.app.use("/", registerseller);

     const show_cart = require("./routes/show_cart");
     this.app.use("/", show_cart);

     const show_profile = require("./routes/show_profile");
     this.app.use("/", show_profile);

     const { payRouter, uploadSlipRouter, FileUploaderRouter } = require("./routes/pay_order");
     this.app.use("/", payRouter);
     this.app.use("/", uploadSlipRouter);
     this.app.use("/", FileUploaderRouter);
     
     const new_product = require("./routes/newproduct");
     this.app.use("/", new_product);
     
     const show_status_order = require("./routes/show_status_order");
     this.app.use("/", show_status_order);

     const seller_pro = require("./routes/seller_pro");
     this.app.use("/", seller_pro);
     
     const seller_order = require("./routes/seller_order");
     this.app.use("/", seller_order);

     const seller_main = require("./routes/seller_main");
     this.app.use("/", seller_main);

     const db__nosql = require("./routes/db_nosql");
     this.app.use("/", db__nosql);

     const edit_product = require("./routes/edit_product");
     this.app.use("/", edit_product);

    }

  startServer() {
    const PORT = process.env.PORT || 3000;
    this.app.listen(PORT, () => {console.log(`Server is running on port ${PORT}`);});
  }
}

new AppServer();
