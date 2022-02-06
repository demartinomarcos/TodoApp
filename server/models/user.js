const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 6,
    maxlength: 10
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 1024
  }
})

module.exports = mongoose.model('user', userSchema)