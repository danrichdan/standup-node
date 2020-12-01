const express = require("express");

const mainController = require("../controllers/main");

const router = express.Router();

router.get("/dashboard", mainController.getDashboard);

router.get("/", mainController.getIndex);

module.exports = router;
