exports.getIndex = (req, res, next) => {
  res.render("index", {
    pageTitle: "Home Page",
    path: "/",
  });
};

exports.getDashboard = (req, res, next) => {
  res.render("dashboard", {
    pageTitle: "Dashboard",
    path: "/dashboard",
  });
};
