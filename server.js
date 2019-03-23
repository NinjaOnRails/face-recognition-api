const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const login = require('./controllers/login');
const user = require('./controllers/user');
const image = require('./controllers/image');

const PORT = process.env.PORT || 3000;

const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'macintosh',
    password: '',
    database: 'face-recognition'
  }
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  // res.send(database.users);
});

app.post('/login', (req, res) => {
  login.handleLogin(req, res, db, bcrypt);
});

app.post('/register', (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});

app.get('/user/:id', (req, res) => {
  user.handleUserGet(req, res, db);
});

app.put('/image', (req, res) => {
  image.handleImage(req, res, db);
});

app.post('/imageurl', (req, res) => {
  image.handleApiCall(req, res);
});

app.listen(PORT, () => {
  console.log(`Server is up on port ${PORT}`);
});
