const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const DepartmentSchema = new Schema({

    department: {
        type: String,
        unique: true
    },
        
  date: {
    type: Date,
    default: Date.now
  },

  Allpublicauth:[{

          publicauthority : {
            type: String,
          }, 

}],

})
module.exports = User = mongoose.model('department', DepartmentSchema)
