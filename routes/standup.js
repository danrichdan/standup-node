const express = require("express");

const standupController = require("../controllers/standup");

const router = express.Router();

router.get("/standup", standupController.getStandup);

module.exports = router;
