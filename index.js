require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const cors = require('cors');

const users = require('./routes/api/users');

const app = express();

// sessions middleware
app.use(
  session({
    key: 'user_id',
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true, expires: 6000000 }
  })
);

// cors middleware
app.use(cors());

// body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// express middleware
app.use(cookieParser());
app.use(express.json());

// middleware routes
app.use('/api/users', users);

const port = process.env.PORT;

app.listen(port, () => console.log(`Server is running on port ${port}`));
