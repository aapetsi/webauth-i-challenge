require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// cors middleware
app.use(cors());

// body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// express middleware
app.use(express.json());

const port = process.env.PORT;

app.listen(port, () => console.log(`Server is running on port ${port}`));
