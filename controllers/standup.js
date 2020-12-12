const { validationResult } = require("express-validator");

const HaveDone = require("../models/havedone");
const WorkingOn = require("../models/workingon");
const Blockers = require("../models/blockers");

// GET REQUESTS

exports.getStandup = (req, res, next) => {
  res.render("standup/standup", {
    pageTitle: "Standup",
    path: "/standup",
  });
};

exports.getHaveDone = (req, res, next) => {
  HaveDone.find({ userId: req.user._id })
    .then((haveDone) => {
      res.render("standup/havedone", {
        pageTitle: "Have Done",
        path: "/havedone",
        haveDone: haveDone,
        editing: false,
        hasError: false,
        errorMessage: null,
        validationErrors: [],
      });
    })
    .catch((err) => console.log(err));
};

exports.getWorkingOn = (req, res, next) => {
  WorkingOn.find({ userId: req.user._id })
    .then((workingOn) => {
      res.render("standup/workingon", {
        pageTitle: "Working On",
        workingOn: workingOn,
        editing: false,
        path: "/workingon",
        hasError: false,
        errorMessage: null,
        validationErrors: [],
      });
    })
    .catch((err) => console.log(err));
};

exports.getBlockers = (req, res, next) => {
  Blockers.find({ userId: req.user._id })
    .then((blockers) => {
      res.render("standup/blockers", {
        pageTitle: "Blockers",
        blockers: blockers,
        editing: false,
        path: "/blockers",
        hasError: false,
        errorMessage: null,
        validationErrors: [],
      });
    })
    .catch((err) => console.log(err));
};

//POST REQUESTS

// ADD ITEMS
exports.postHaveDone = (req, res, next) => {
  const haveDone = req.body.havedone;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return HaveDone.find({ userId: req.user._id })
      .then((haveDone) => {
        res.status(422).render("standup/havedone", {
          pageTitle: "Have Done",
          path: "/havedone",
          editing: false,
          hasError: true,
          haveDone: haveDone,
          errorMessage: "Please enter an item.",
          validationErrors: errors.array(),
        });
      })
      .catch((err) => console.log(err));
  }
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

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return WorkingOn.find({ userId: req.user._id })
      .then((workingOn) => {
        res.status(422).render("standup/workingon", {
          pageTitle: "Working On",
          path: "/workingon",
          editing: false,
          hasError: true,
          workingOn: workingOn,
          errorMessage: "Please enter an item.",
          validationErrors: errors.array(),
        });
      })
      .catch((err) => console.log(err));
  }

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

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return Blockers.find({ userId: req.user._id })
      .then((blockers) => {
        res.status(422).render("standup/blockers", {
          pageTitle: "Blockers",
          path: "/blockers",
          editing: false,
          hasError: true,
          blockers: blockers,
          errorMessage: "Please enter an item.",
          validationErrors: errors.array(),
        });
      })
      .catch((err) => console.log(err));
  }

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
  HaveDone.deleteOne({ _id: havDonId, userId: req.user._id })
    .then((result) => {
      console.log("Have Done Deleted");
      res.redirect("/havedone");
    })
    .catch((err) => console.log(err));
};

exports.postDeleteWorkingOn = (req, res, next) => {
  const wrkOnId = req.body.workingOnId;
  WorkingOn.deleteOne({ _id: wrkOnId, userId: req.user._id })
    .then((result) => {
      console.log("Working On Deleted");
      res.redirect("/workingon");
    })
    .catch((err) => console.log(err));
};

exports.postDeleteBlocker = (req, res, next) => {
  const blokId = req.body.blockerId;
  Blockers.deleteOne({ _id: blokId, userId: req.user._id })
    .then((result) => {
      console.log("Blocker Deleted");
      res.redirect("/blockers");
    })
    .catch((err) => console.log(err));
};

// DELETE ALL ITEMS
exports.postDeleteAllHaveDone = (req, res, next) => {
  HaveDone.deleteMany({ userId: req.user._id })
    .then((result) => {
      console.log("All Have Done Deleted");
      res.redirect("/havedone");
    })
    .catch((err) => console.log(err));
};

exports.postDeleteAllWorkingOn = (req, res, next) => {
  WorkingOn.deleteMany({ userId: req.user._id })
    .then((result) => {
      console.log("All Working On Deleted");
      res.redirect("/workingon");
    })
    .catch((err) => console.log(err));
};

exports.postDeleteAllBlocker = (req, res, next) => {
  Blockers.deleteMany({ userId: req.user._id })
    .then((result) => {
      console.log("All Blockers Deleted");
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
        hasError: false,
        errorMessage: null,
        validationErrors: [],
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
        hasError: false,
        errorMessage: null,
        validationErrors: [],
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
        hasError: false,
        errorMessage: null,
        validationErrors: [],
      });
    })
    .catch((err) => console.log(err));
};

exports.postEditHaveDone = (req, res, next) => {
  const hvDonId = req.body.haveDoneId;
  const updatedHaveDoneTitle = req.body.havedone;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return HaveDone.findById(hvDonId)
      .then((haveDone) => {
        res.status(422).render("standup/havedone", {
          pageTitle: "Have Done",
          path: "/havedone",
          editing: true,
          hasError: true,
          haveDone: haveDone,
          errorMessage:
            "Please enter your update. If you would rather delete, please use the delete button.",
          validationErrors: errors.array(),
        });
      })
      .catch((err) => console.log(err));
  }

  HaveDone.findById(hvDonId)
    .then((haveDone) => {
      if (haveDone.userId.toString() !== req.user._id.toString()) {
        return res.redirect("/");
      }
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

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return WorkingOn.findById(wrkOnId)
      .then((workingOn) => {
        res.status(422).render("standup/workingon", {
          pageTitle: "Working On",
          path: "/workingon",
          editing: true,
          hasError: true,
          workingOn: workingOn,
          errorMessage:
            "Please enter your update. If you would rather delete, please use the delete button.",
          validationErrors: errors.array(),
        });
      })
      .catch((err) => console.log(err));
  }

  WorkingOn.findById(wrkOnId)
    .then((workingOn) => {
      if (workingOn.userId.toString() !== req.user._id.toString()) {
        return res.redirect("/");
      }
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

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return Blockers.findById(blkId)
      .then((blocker) => {
        res.status(422).render("standup/blockers", {
          pageTitle: "Edit Blocker",
          editing: true,
          path: "/blockers",
          hasError: true,
          blockers: blocker,
          errorMessage:
            "Please enter your update. If you would rather delete, please use the delete button.",
          validationErrors: errors.array(),
        });
      })
      .catch((err) => console.log(err));
  }

  Blockers.findById(blkId)
    .then((blocker) => {
      if (blocker.userId.toString() !== req.user._id.toString()) {
        return res.redirect("/");
      }
      blocker.title = updatedBlockerTitle;
      return blocker.save();
    })
    .then((result) => {
      console.log("Blockers Updated");
      res.redirect("/blockers");
    })
    .catch((err) => console.log(err));
};
