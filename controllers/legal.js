exports.getPrivacy = (req, res, next) => {
  res.render("legal/privacy", {
    path: "/privacy",
    pageTitle: "Privacy Policy",
  });
};

exports.getTerms = (req, res, next) => {
  res.render("legal/terms", {
    path: "/terms",
    pageTitle: "Terms and Conditions",
  });
};
