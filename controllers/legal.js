exports.getPrivacy = (req, res, next) => {
  res.render("legal/privacy", {
    path: "/privacy",
    pageTitle: "Scrumzy Privacy Policy",
  });
};

exports.getTerms = (req, res, next) => {
  res.render("legal/terms", {
    path: "/terms",
    pageTitle: "Scrumzy Terms and Conditions",
  });
};
