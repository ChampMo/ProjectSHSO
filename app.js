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

     const Show_product = require("./routes/show_product");

     this.app.use("/", Show_product);

     const show = require("./routes/show");

     this.app.use("/", show);

     const upload = require("./routes/upload");

     this.app.use("/", upload);

    }


  startServer() {
    const PORT = process.env.PORT || 3000;
    this.app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  }
}

new AppServer();
