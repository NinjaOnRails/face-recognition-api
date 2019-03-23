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
const DATABASE_URL = process.env.DATABASE_URL || '127.0.0.1';

// const db = knex({
//   client: 'pg',
//   connection: {
//     host: DATABASE_URL,
//     user: 'macintosh',
//     password: '',
//     database: 'face-recognition'
//   }
// });

const db = knex({
  client: 'pg',
  connection: {
    connectionString: DATABASE_URL,
    ssl: true
  }
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('works!');
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
