const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();

// load users db model
const Users = require('./users-model');

// load middlewares
const middleware = require('../../middleware/middleware');

// test route
router.get('/test', (req, res) => {
  console.log(req.session);
  res.status(200).json({ message: 'Users route works' });
});

// register user
router.post('/register', (req, res) => {
  const session = req.session;
  session.email = req.body.email;
  const userData = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  };
  userData.password = bcrypt.hashSync(userData.password, 10);
  Users.save(userData)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err =>
      res.status(500).json({ message: `Unable to save user. ${err.message}` })
    );
});

// login user
router.post('/login', middleware.login, (req, res) => {
  console.log(req.session.loggedIn);
  const userInfo = { email: req.body.email, password: req.body.password };
  Users.findByEmail(userInfo.email)
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: 'Invalid user credentials' });
      } else if (bcrypt.compareSync(userInfo.password, user.password)) {
        res.json({ message: `Welcome ${user.username}` });
      } else {
        res.status(400).json({ message: 'Invalid user credentials' });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// get all users
router.get('/', (req, res) => {
  Users.find('apetsi')
    .then(users => {
      if (!users) {
        return res.status(404).json({ message: 'Users not found' });
      }
      res.status(200).json(users);
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: `Unable to retrieve users. ${err.message}` });
    });
});

module.exports = router;
