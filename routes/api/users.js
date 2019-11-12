const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();

// load users db model
const Users = require('../../models/users-model');

// load middlewares
const middleware = require('../../middleware/middleware');

// test route
router.get('/test', (req, res) => {
  res.status(200).json({ message: 'Users route works' });
});

// register user
router.post('/register', (req, res) => {
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

// logout user
router.get('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        res.send('error logging out');
      } else {
        res.send('logged out successfully');
      }
    });
  }
});

// login user
router.post('/login', (req, res) => {
  const userInfo = { email: req.body.email, password: req.body.password };

  Users.findByEmail(userInfo.email)
    .then(user => {
      if (user && bcrypt.compareSync(userInfo.password, user.password)) {
        req.session.user = user;
        res.status(200).json({ message: `Welcome ${user.username}` });
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// get all users
router.get('/', middleware.auth, (req, res) => {
  Users.find()
    .then(users => {
      if (!users) {
        return res.status(404).json({ message: 'Users not found' });
      }
      console.log(req.session);
      res.status(200).json(users);
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: `Unable to retrieve users. ${err.message}` });
    });
});

module.exports = router;
