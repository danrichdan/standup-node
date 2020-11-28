const express = require("express");

const standupController = require("../controllers/standup");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.get("/standup", isAuth, standupController.getStandup);

// Have Done Routes
router.get("/havedone", isAuth, standupController.getHaveDone);

router.get("/havedone/:haveDoneId", isAuth, standupController.getEditHaveDone);

router.post("/havedone", isAuth, standupController.postHaveDone);

router.post("/edit-havedone", isAuth, standupController.postEditHaveDone);

router.post("/delete-havedone", isAuth, standupController.postDeleteHaveDone);

// Working On Routes
router.get("/workingon", isAuth, standupController.getWorkingOn);

router.get(
  "/workingon/:workingOnId",
  isAuth,
  standupController.getEditWorkingOn
);

router.post("/workingon", isAuth, standupController.postWorkingOn);

router.post("/edit-workingon", isAuth, standupController.postEditWorkingOn);

router.post("/delete-workingon", isAuth, standupController.postDeleteWorkingOn);

// Blockers Routes
router.get("/blockers", isAuth, standupController.getBlockers);

router.get("/blockers/:blockerId", isAuth, standupController.getEditBlocker);

router.post("/blockers", isAuth, standupController.postBlockers);

router.post("/edit-blockers", isAuth, standupController.postEditBlockers);

router.post("/delete-blocker", isAuth, standupController.postDeleteBlocker);

module.exports = router;
