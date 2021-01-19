const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const AddbeneSchema = new Schema({
  email: {
    type: String,
    required: true

  },
  id: {
    type: String
  },
  ip: {
    type: String
  },
  logouttime: {
    type: String,
    required: true
  },
   date: {
    type: Date,
    default: Date.now
  }
})

module.exports = Addbene = mongoose.model('Logout', AddbeneSchema)
