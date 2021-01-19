
const jwt = require('jsonwebtoken')

process.env.SECRET_KEY = 'secret'

const mongoose = require('mongoose');

const Admin = mongoose.model('logindata');

module.exports.logindata = (req, res,next) => {
    const today = new Date()
    const admin=new Admin()
   
    admin.logintime=req.body.logintime,
    admin.id= req.body.id,
    admin.email= req.body.email,
    admin.ip=req.body.ip,
    admin.browser=req.body.browser,
    admin.status=req.body.status,
    admin.created=today
    admin.save((err, doc) => {
        if (!err)
            res.json({status:"true",doc});
        else {
            if (err.code == 11000)
                res.status(422).send(['Duplicate email adrress found.']);
            else
                return next(err);
        }

    });

     


}
        
module.exports.getlogintime = (req, res) => {
    let id=JSON.parse(JSON.stringify(req.body.id).replace(/"\s+|\s+"/g,'"'))


console.log("jggg",id);

    Admin.find({"id":id},function (err, inwarts) {
        if (err)
         return console.error(err); 
         res.json(inwarts);
    
     })
  }

  module.exports.getlogdata = (req, res) => {
    Admin.find(function (err, stus) {
        if (err) return console.error(err);   
        res.send(stus);

    })
}