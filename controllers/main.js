exports.getIndex = (req, res, next) => {
  res.render("index", {
    pageTitle: "Home Page",
    path: "/",
  });
};

exports.getAbout = (req, res, next) => {
  res.render("about", {
    pageTitle: "About Page",
    path: "/about",
  });
};

exports.getDashboard = (req, res, next) => {
  res.render("dashboard", {
    pageTitle: "Dashboard",
    path: "/dashboard",
  });
};
