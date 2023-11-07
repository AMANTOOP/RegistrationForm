const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const app = express();
const port = 80;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'LoginForm')));

app.use(session({
  secret: '123qw',
  resave: false,
  saveUninitialized: false,
}));


const users = [];


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'LoginForm', 'home.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'LoginForm', 'login.html'));
});

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'LoginForm', 'register.html'));
});

app.post('/register', (req, res) => {
  const { email, password } = req.body;
  users.push({ email, password });
  res.send('Registration successful! You can now <a href="/login">login</a>.');
});


app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email && u.password === password);
  if (user) {
    req.session.user = user;
    res.redirect('/age-calculator');
  } else {
    res.send('Login failed. Please try again or <a href="/register">register</a>.');
  }
});

app.get('/age-calculator', (req, res) => {
  const user = req.session.user;
  if (!user) {
    res.redirect('/login');
  } else {
    res.sendFile(path.join(__dirname, 'LoginForm', 'age-calculator.html'));
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
