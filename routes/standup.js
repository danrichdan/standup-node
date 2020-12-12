const express = require("express");
const { body } = require("express-validator");

const standupController = require("../controllers/standup");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.get("/standup", isAuth, standupController.getStandup);

// Have Done Routes
router.get("/havedone", isAuth, standupController.getHaveDone);

router.get("/havedone/:haveDoneId", isAuth, standupController.getEditHaveDone);

router.post(
  "/havedone",
  [body("havedone").isString().isLength({ min: 1 }).trim()],
  isAuth,
  standupController.postHaveDone
);

router.post(
  "/edit-havedone",
  [body("havedone").isString().isLength({ min: 1 }).trim()],
  isAuth,
  standupController.postEditHaveDone
);

router.post("/delete-havedone", isAuth, standupController.postDeleteHaveDone);

router.post(
  "/delete-all-havedone",
  isAuth,
  standupController.postDeleteAllHaveDone
);

// Working On Routes
router.get("/workingon", isAuth, standupController.getWorkingOn);

router.get(
  "/workingon/:workingOnId",
  isAuth,
  standupController.getEditWorkingOn
);

router.post(
  "/workingon",
  [body("workingon").isString().isLength({ min: 1 }).trim()],
  isAuth,
  standupController.postWorkingOn
);

router.post(
  "/edit-workingon",
  [body("workingon").isString().isLength({ min: 1 }).trim()],
  isAuth,
  standupController.postEditWorkingOn
);

router.post("/delete-workingon", isAuth, standupController.postDeleteWorkingOn);

router.post(
  "/delete-all-workingon",
  isAuth,
  standupController.postDeleteAllWorkingOn
);

// Blockers Routes
router.get("/blockers", isAuth, standupController.getBlockers);

router.get("/blockers/:blockerId", isAuth, standupController.getEditBlocker);

router.post(
  "/blockers",
  [body("blockers").isString().isLength({ min: 1 }).trim()],
  isAuth,
  standupController.postBlockers
);

router.post(
  "/edit-blockers",
  [body("blockers").isString().isLength({ min: 1 }).trim()],
  isAuth,
  standupController.postEditBlockers
);

router.post("/delete-blocker", isAuth, standupController.postDeleteBlocker);

router.post(
  "/delete-all-blockers",
  isAuth,
  standupController.postDeleteAllBlocker
);

module.exports = router;
