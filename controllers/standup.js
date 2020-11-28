const HaveDone = require("../models/havedone");
const WorkingOn = require("../models/workingon");
const Blockers = require("../models/blockers");
const e = require("express");

// GET REQUESTS

exports.getStandup = (req, res, next) => {
  res.render("standup/standup", {
    pageTitle: "Standup",
    path: "/standup",
  });
};

exports.getHaveDone = (req, res, next) => {
  HaveDone.find()
    .then((haveDone) => {
      res.render("standup/havedone", {
        pageTitle: "Have Done",
        haveDone: haveDone,
        editing: false,
        path: "/havedone",
      });
    })
    .catch((err) => console.log(err));
};

exports.getWorkingOn = (req, res, next) => {
  WorkingOn.find()
    .then((workingOn) => {
      res.render("standup/workingon", {
        pageTitle: "Working On",
        workingOn: workingOn,
        editing: false,
        path: "/workingon",
      });
    })
    .catch((err) => console.log(err));
};

exports.getBlockers = (req, res, next) => {
  Blockers.find()
    .then((blockers) => {
      res.render("standup/blockers", {
        pageTitle: "Blockers",
        blockers: blockers,
        editing: false,
        path: "/blockers",
      });
    })
    .catch((err) => console.log(err));
};

//POST REQUESTS

// ADD ITEMS
exports.postHaveDone = (req, res, next) => {
  const haveDone = req.body.havedone;
  const haveDones = new HaveDone({
    title: haveDone,
    userId: req.user,
  });
  haveDones
    .save()
    .then((result) => {
      console.log("Have Done Added");
      res.redirect("/havedone");
    })
    .catch((err) => console.log(err));
};

exports.postWorkingOn = (req, res, next) => {
  const workingOn = req.body.workingon;
  const workingOns = new WorkingOn({
    title: workingOn,
    userId: req.user,
  });
  workingOns
    .save()
    .then((result) => {
      console.log("Working On Added");
      res.redirect("/workingon");
    })
    .catch((err) => console.log(err));
};

exports.postBlockers = (req, res, next) => {
  const blocker = req.body.blockers;
  const blockers = new Blockers({
    title: blocker,
    userId: req.user,
  });
  blockers
    .save()
    .then((result) => {
      console.log("Blocker added");
      res.redirect("/blockers");
    })
    .catch((err) => console.log(err));
};

// DELETE ITEMS
exports.postDeleteHaveDone = (req, res, next) => {
  const havDonId = req.body.haveDoneId;
  HaveDone.findByIdAndRemove(havDonId)
    .then((result) => {
      console.log("Have Done Deleted");
      res.redirect("/havedone");
    })
    .catch((err) => console.log(err));
};

exports.postDeleteWorkingOn = (req, res, next) => {
  const wrkOnId = req.body.workingOnId;
  WorkingOn.findByIdAndRemove(wrkOnId)
    .then((result) => {
      console.log("Working On Deleted");
      res.redirect("/workingon");
    })
    .catch((err) => console.log(err));
};

exports.postDeleteBlocker = (req, res, next) => {
  const blokId = req.body.blockerId;
  Blockers.findByIdAndRemove(blokId)
    .then((result) => {
      console.log("Blocker Deleted");
      res.redirect("/blockers");
    })
    .catch((err) => console.log(err));
};

// EDIT ITEMS
exports.getEditHaveDone = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/dashboard");
  }
  const hvDonId = req.params.haveDoneId;
  HaveDone.findById(hvDonId)
    .then((haveDone) => {
      res.render("standup/havedone", {
        pageTitle: "Edit Have Done",
        haveDone: haveDone,
        editing: editMode,
        path: "/havedone",
      });
    })
    .catch((err) => console.log(err));
};

exports.getEditWorkingOn = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/dashboard");
  }
  const wrkOnId = req.params.workingOnId;
  WorkingOn.findById(wrkOnId)
    .then((workingOn) => {
      res.render("standup/workingon", {
        pageTitle: "Edit Working On",
        workingOn: workingOn,
        editing: editMode,
        path: "/workingon",
      });
    })
    .catch((err) => console.log(err));
};

exports.getEditBlocker = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/dashboard");
  }
  const blkId = req.params.blockerId;
  Blockers.findById(blkId)
    .then((blocker) => {
      res.render("standup/blockers", {
        pageTitle: "Edit Blocker",
        blockers: blocker,
        editing: editMode,
        path: "/blockers",
      });
    })
    .catch((err) => console.log(err));
};

exports.postEditHaveDone = (req, res, next) => {
  const hvDonId = req.body.haveDoneId;
  const updatedHaveDoneTitle = req.body.havedone;

  HaveDone.findById(hvDonId)
    .then((haveDone) => {
      haveDone.title = updatedHaveDoneTitle;
      return haveDone.save();
    })
    .then((result) => {
      console.log("Have Done Updated");
      res.redirect("/havedone");
    })
    .catch((err) => console.log(err));
};

exports.postEditWorkingOn = (req, res, next) => {
  const wrkOnId = req.body.workingOnId;
  const updatedWorkingOnTitle = req.body.workingon;

  WorkingOn.findById(wrkOnId)
    .then((workingOn) => {
      workingOn.title = updatedWorkingOnTitle;
      return workingOn.save();
    })
    .then((result) => {
      console.log("Working On Updated");
      res.redirect("/workingon");
    })
    .catch((err) => console.log(err));
};

exports.postEditBlockers = (req, res, next) => {
  const blkId = req.body.blockerId;
  const updatedBlockerTitle = req.body.blockers;
  console.log("Here is the blocker ID", blkId);
  Blockers.findById(blkId)
    .then((blocker) => {
      console.log("Blocker is :", blocker);
      blocker.title = updatedBlockerTitle;
      return blocker.save();
    })
    .then((result) => {
      console.log("Blockers Updated");
      res.redirect("/blockers");
    })
    .catch((err) => console.log(err));
};
