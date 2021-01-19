const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const AdminSchema = new Schema({
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
  logintime: {
    type: String,
    required: true
  },
   browser: {
    type: String
  },
  status: {
    type: String
  },
   date: {
    type: Date,
    default: Date.now
  }
})

module.exports = Admin = mongoose.model('logindata', AdminSchema)
