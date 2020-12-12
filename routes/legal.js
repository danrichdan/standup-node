const express = require("express");

const router = express.Router();

const legalController = require("../controllers/legal");

router.get("/privacy", legalController.getPrivacy);

router.get("/terms", legalController.getTerms);

module.exports = router;
