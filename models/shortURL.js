const mongoose = require('mongoose');
const shortid = require('shortid');

const shortURLSchema = new mongoose.Schema({
  full: {
    type: String,
    require: ture,
  },
  short: {
    type: String,
    require: ture,
    default: shortid.generate,
  },
  clicks: {
    type: Number,
    require: true,
    default: 0,
  },
});

module.exports = mongoose.model('ShortURL', shortURLSchema);
