const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const errorsController = require("./controllers/errors");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const standupRoute = require("./routes/standup");
const authRoute = require("./routes/auth");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(standupRoute);
app.use(authRoute);

const port = 3000;
app.use(errorsController.get404);
const MONGODB_URI =
  "mongodb+srv://daniel_1:sB4nQWUdCP2JIkqM@cluster0.wvxfx.mongodb.net/standuptwo?retryWrites=true&w=majority";

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true })
  .then((result) => {
    app.listen(port, () => {
      console.log(`Currently listening at http://localhost:${port}`);
    });
  })
  .catch((err) => console.log(err));
