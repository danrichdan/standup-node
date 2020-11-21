exports.getLogin = (req, res, next) => {
  res.render("auth/login", { pageTitle: "Login" });
};

exports.getSignup = (req, res, next) => {
  res.render("auth/signup", { pageTitle: "Signup" });
};
