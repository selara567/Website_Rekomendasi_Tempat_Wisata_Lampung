function authMiddleware(req, res, next) {
  console.log("SESSION:", req.session);

  if (req.session && req.session.admin) {
    return next();
  }

  return res.redirect("/admin/login");
}

module.exports = authMiddleware;