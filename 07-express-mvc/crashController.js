const crashController = (req, res) => {
  res.status(404).render("404mess", {
    title: "Page not found",
    message: "404 Your page is not found.",
  });
};

exports.crashController = crashController;
