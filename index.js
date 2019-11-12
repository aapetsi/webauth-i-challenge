require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);
const cors = require('cors');

const users = require('./routes/api/users');

const app = express();

// sessions middleware
const sessionConfig = {
  name: 'session_id',
  secret: 'secret',
  cookie: {
    maxAge: 1000 * 60 * 60,
    secure: false,
    httpOnly: false
  },
  resave: false,
  saveUninitialized: false,
  store: new KnexSessionStore({
    knex: require('./data/db-config'),
    tablename: 'sessions',
    sidfieldname: 'sid',
    createtable: true,
    clearInterval: 1000 * 60 * 60
  })
};
app.use(session(sessionConfig));

// cors middleware
app.use(cors());

// body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// express middleware
app.use(express.json());

// middleware routes
app.use('/api/users', users);

const port = process.env.PORT;

app.listen(port, () => console.log(`Server is running on port ${port}`));
