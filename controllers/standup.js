const Standup = require("../models/standup");

exports.getStandup = (req, res, next) => {
  Standup.find()
    .then((standup) => {
      res.render("standup", {
        pageTitle: "Standup",
        standup: standup,
      });
    })
    .catch((err) => console.log(err));
};
