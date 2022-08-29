const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const dbURI = process.env.MONGODB_CONNECTION_STRING;

app.set('view engine', 'ejs');

mongoose
  .connect(dbURI)
  .then(result => app.listen(PORT))
  .catch(err => console.log(err));

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/shortURL', (req, res) => {
  res.send(req.body);
});
