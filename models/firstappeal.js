const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const FirstSchema = new Schema({

  email: {
    type: String,
    required: true
  },
  country:{
    type: String,
    required: true
  },
  registerid:{
    type:String
  },
  citizenid: {
    type: String,
  },
  phonenumber: {
    type: String,
  },
  name: {
        type: String,
      },
  pincode:{
    type: String,
  },
  educationalstatus: {
    type: String,
  },
  gender: {
    type: String,
  },
  mobilenumber: {
    type: String,
  },
  code: {
    type: String,
  },
  address:{
    type: String,
  },
  state: {
    type: String,
  },
  literatestatus: {
    type: String,
  },
  status: {
    type: String,
  },
  formstatus: {
    type:String,
  },
  usertype: {
    type:String,
  },  
  publicauthority:{
    type: String,
   
  },
  ministry: {
    type: String,
  },
  publicauthority2: {
    type: String,
  },
  citizenship: {
    type: String,
  },
  provertyline: {
    type: String,
  },
  bplcard: {
    type: String,
  },
  yearofissue: {
    type: String,
  },
  issueingauthority: {
    type: String,
  },
  rtirequest: {
    type: String,
  },
  document: {
    type: String,
  },
  groundforappeal: {
    type: String,
  },

  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = Requestform = mongoose.model('firstappeal', FirstSchema)
