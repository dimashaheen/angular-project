const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Define collection and schema
let Professor = new Schema({
    professor_username: {
    type: String
  },
  professor_firstname: {
    type: String
  },
  professor_lastname: {
    type: String
  },
  professor_email: {
    type: String
  },
  age: {
    type: Number
  }
}, {
  collection: 'professors'
})
module.exports = mongoose.model('Professor', Professor)