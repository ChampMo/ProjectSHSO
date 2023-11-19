const express = require("express");

const path = require("path");
const app = express();

const cookieSession = require('cookie-session');

app.use(express.urlencoded({ extended: false }))

app.use(cookieSession({
  name:'session',
  keys: ['key1','key2'],
  maxAge: 3600 * 1000 * 24 //24hr
}))




class AppServer {
  constructor() {
    this.configureExpress();
    this.configureRoutes();
    this.startServer();
  }

  configureExpress() {
    this.app = express();
    this.app.use(express.static(path.join(__dirname, "/public")));
    app.set('views', path.join(__dirname, '/views'))
    app.set('view engine', 'ejs')
  }

  configureRoutes() {
     const login = require("./routes/login");

     this.app.use("/", login);

     const show = require("./routes/show");

     this.app.use("/", show);

    }



  startServer() {
    const PORT = process.env.PORT || 3000;
    this.app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  }
}

new AppServer();
