module.exports = function isAuthenticated(req, res, next) {
  if (req.session.authenticated && req.session.authorization === "user") {
    next();
  } else {
    res.send("Not authenticated!");
  }
};
