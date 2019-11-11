module.exports = {
  login
};
const bcrypt = require('bcryptjs');
const User = require('../routes/api/users-model');
function login(req, res, next) {
  const { email, password } = req.body;
  User.findByEmail(email).then(user => {
    if (!user) {
      return res.status(404).json({ message: 'Invalid credentials' });
    } else if (bcrypt.compareSync(password, user.password)) {
      req.session.loggedIn = true;
      next();
    } else {
      res.status(400).json({ message: 'Invalid credentials' });
    }
  });
}
