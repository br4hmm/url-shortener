const express = require('express');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');

app.listen(
  PORT,
  console.log(`Listening for requests on port http://localhost:${PORT}`)
);

app.get('/', (req, res) => {
  res.render('index');
});