const jwt = require('jsonwebtoken')

process.env.SECRET_KEY = 'secret'

const mongoose = require('mongoose');

const Department = mongoose.model('department');

module.exports.newdept = (req, res) => {
    // console.log("ddddd",req.body)
    const today = new Date()
    var dept =new Department();
    dept.department=req.body.department
    dept.created= today
        // var  Allpublicauth=[{
        //     // deptname : req.body.deptname,
        //     publicauthority : req.body.publicauthority,
      
        // }]
        // dept.Allpublicauth=Allpublicauth,

        dept.save((err, doc) => {
        if (!err)
            res.send(doc);
        else {
            if (err.code == 11000)
                res.status(422).send(['Duplicate department found.']);
            else
                return next(err);
        }

    });
}

// module.exports.particulardept = (req, res) => {
//     let department=JSON.parse(JSON.stringify(req.body.department).replace(/"\s+|\s+"/g,'"'))
//     Department.find({"department":department },function (err, inwarts) {
//         if (err)
//          return console.error(err); 
//          res.send(inwarts);
//      })
//   }

  module.exports.deptpush = (req, res) => {
    // let deptname=JSON.parse(JSON.stringify(req.body.deptname).replace(/"\s+|\s+"/g,'"'))
    let publicauthority=JSON.parse(JSON.stringify(req.body.publicauthority).replace(/"\s+|\s+"/g,'"'))
    let department=JSON.parse(JSON.stringify(req.body.department).replace(/"\s+|\s+"/g,'"'))
    Department.updateMany({"department":department },  {$push: {Allpublicauth:{ $each: [ { 'publicauthority': publicauthority }],}}},function (err, inwarts) {
        if (err)
         return console.error(err); 
         res.json({status:"true",inwarts});
     })
  }

  module.exports.getAllDepts = (req, res) => {
    Department.find(function (err, stus) {
        if (err) return console.error(err);   
        res.send(stus);
    })
}
module.exports.particulardept = (req, res) =>{
  
    // var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)
    var dept=req.body.department
  console.log(dept);
    User.findOne({
      department: req.body.department
    })
      .then(user => {
        if (user) {
          res.json(user)
        } else {
          res.send('No Data Found')
        }
      })
      .catch(err => {
        res.send('error: ' + err)
        res.status(400).json({
          status: 'error',
          error: 'req body cannot be empty',
        });
      })
}