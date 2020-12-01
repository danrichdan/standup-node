const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const csrf = require("csurf");
const flash = require("connect-flash");

const dbString = require("./util/database");
const errorsController = require("./controllers/errors");
const User = require("./models/user");

const port = 3000;
const MONGODB_URI = dbString;

const app = express();
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions",
});

const csrfProtection = csrf();

app.set("view engine", "ejs");
app.set("views", "views");

const standupRoute = require("./routes/standup");
const authRoute = require("./routes/auth");
const legalRoute = require("./routes/legal");
const mainRoute = require("./routes/main");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);
app.use(csrfProtection);
app.use(flash());

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use(standupRoute);
app.use(authRoute);
app.use(legalRoute);
app.use(mainRoute);

app.use(errorsController.get404);

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true })
  .then((result) => {
    app.listen(port, () => {
      console.log(`Currently listening at http://localhost:${port}`);
    });
  })
  .catch((err) => console.log(err));