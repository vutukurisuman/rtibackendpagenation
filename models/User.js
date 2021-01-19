const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const UserSchema = new Schema({
  user_name: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    // required: true
  },
  country:{
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
  Activationkey: {
        type: String,
      },  
  Role: {
    type: String,
  },
  departmentname: {
    type: String,
  },

  date: {
    type: Date,
    default: Date.now
  },
Allpublicauth:[{

      name : {
        type: String,
      }, 

}],
})

module.exports = User = mongoose.model('users', UserSchema)
