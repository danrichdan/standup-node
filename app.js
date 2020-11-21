const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

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

app.use(errorsController.get404);

const port = 3000;
app.listen(port, () => {
  console.log(`Currently listening at http://localhost:${port}`);
});
