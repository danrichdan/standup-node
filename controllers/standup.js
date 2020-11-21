exports.getStandup = (req, res, next) => {
  res.render("standup", {
    pageTitle: "Standup",
  });
};
