exports.getIndex = (req, res, next) => {
  res.render("index", {
    pageTitle: "Scrumzy Home Page",
    path: "/",
  });
};

exports.getDashboard = (req, res, next) => {
  res.render("dashboard", {
    pageTitle: "Scrumzy Dashboard",
    path: "/dashboard",
  });
};
