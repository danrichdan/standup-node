exports.getPrivacy = (req, res, next) => {
  res.render("legal/privacy", {
    path: "/privacy",
    pageTitle: "Privacy Policy",
  });
};
