const mongoose = require('mongoose')
const Schema = mongoose.Schema
module.exports = (mongoose, mongoosePaginate) => {
// Create Schema
const RequestSchema = new Schema({

  email: {
    type: String,
    // required: true
  },
  country:{
    type: String,
    // required: true
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
  usertype: {
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
  formstatus: {
    type: String,
  },
  status: {
    type: String,
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
  expdate: {
    type: String,
  },
  Role:{
    type:String,
  },
  piomail:{
    type:String,
  },
  applicationstatus:{
    type:String,
  },
  applicationtype:{
    type:String,
  },
  ccmail:{
    type:String,
  }, 
  defultstatus:{
    type:String,
  },
  acceptedbypio:{
type:String,
  },
  piodecision:{
    type:String,
      },
  applicationAt:{
     type:String,
     },
     payment:{
      type:String,
      },
  date: {
    type: Date,
    default: Date.now
  },
  avatar: {
    type: String
  },  
  transfer: {
    type: String
  },
  transferedby: {
    type: String
  },
  ministryOld: {
    type: String
  },
  publicauthority2Old: {
    type: String
  }
})
RequestSchema.plugin(mongoosePaginate);

module.exports = Requestform = mongoose.model('Requestform', RequestSchema);
};
