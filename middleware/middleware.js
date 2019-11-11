function sessionChecker(req, res, next) {
  if (req.session.user && req.cookies.user_id) {
    res.redirect('/');
  } else {
    next();
  }
}
