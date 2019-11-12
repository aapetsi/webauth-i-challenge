module.exports = {
  auth
};

function auth(req, res, next) {
  if (req.session && req.session.user) {
    next();
  } else {
    res.status(400).json({ message: 'No credentials provided' });
  }
}
