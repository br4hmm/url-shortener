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

app.get('/', async (req, res) => {
  const urls = await ShortURL.find();
  res.render('index', { urls });
});

app.post('/shortURL', async (req, res) => {
  await ShortURL.create({ full: req.body.fullURL });
  res.redirect('/');
});

app.get('/:id', async (req, res) => {
  const url = await ShortURL.findOne({ short: req.params.id });
  if (url === null) return res.status(404).send('404 Not Found');
  url.clicks++;
  url.save(); // to save the new clicks value
  res.redirect(url.full);
});
