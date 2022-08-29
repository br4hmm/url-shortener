const express = require('express');
const mongoose = require('mongoose');
const ShortURL = require('./models/shortURL');
const morgan = require('morgan');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const dbURI = process.env.MONGODB_CONNECTION_STRING;

mongoose
  .connect(dbURI)
  .then(result =>
    app.listen(PORT, console.log('MongoBD Connected Successfully!'))
  )
  .catch(err => console.log(err));

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/shortURL', async (req, res) => {
  await ShortURL.create({ full: req.body.fullURL });
  res.redirect('/');
});
