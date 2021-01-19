const jwt = require('jsonwebtoken')

process.env.SECRET_KEY = 'secret'

const mongoose = require('mongoose');

const Addbene = mongoose.model('Logout');

module.exports.logoutdata = (req, res,next) => {
    const today = new Date()
    const logout= Addbene()
    logout.logintime=req.body.logintime,
    logout.id= req.body.id,
    logout.email= req.body.email,
    logout.ip=req.body.ip,
    logout.created=today
    logout.save((err, doc) => {
        if (!err)
            res.json({status:"true",doc});
        else {
            res.json( { status: "false"} )
            if (err.code == 11000)
                res.status(422).send(['Duplicate email adrress found.']);
            else
                return next(err);
        } 
    });
}

module.exports.getlogoutdata = (req, res) => {
    Addbene.find(function (err, stus) {
        if (err) return console.error(err);   
        res.send(stus);

    })
}
 
module.exports.getlogoutdatabyid = (req, res) => {
    let userid=JSON.parse(JSON.stringify(req.body.id).replace(/"\s+|\s+"/g,'"'))
    Addbene.find({"id":userid },function (err, inwarts) {
        if (err)
         return console.error(err); 
         res.send(inwarts);
     })
  }

  module.exports.updatebenificery = (req, res) => {
    let _id=JSON.parse(JSON.stringify(req.body.id).replace(/"\s+|\s+"/g,'"'))
    let firstName=JSON.parse(JSON.stringify(req.body.oneuser.firstName).replace(/"\s+|\s+"/g,'"'))
    let lastName=JSON.parse(JSON.stringify(req.body.oneuser.lastName).replace(/"\s+|\s+"/g,'"'))
    let accountnumber=JSON.parse(JSON.stringify(req.body.oneuser.accountnumber).replace(/"\s+|\s+"/g,'"'))
    let country=JSON.parse(JSON.stringify(req.body.oneuser.country).replace(/"\s+|\s+"/g,'"'))
    let phonenumber=JSON.parse(JSON.stringify(req.body.oneuser.phonenumber).replace(/"\s+|\s+"/g,'"'))
    let reason=JSON.parse(JSON.stringify(req.body.oneuser.reason).replace(/"\s+|\s+"/g,'"'))
    let banktype=JSON.parse(JSON.stringify(req.body.oneuser.banktype).replace(/"\s+|\s+"/g,'"'))
    let bank=JSON.parse(JSON.stringify(req.body.oneuser.bank).replace(/"\s+|\s+"/g,'"'))
    Addbene.updateMany({"_id":req.body.id},{$set:{"firstName":firstName,"lastName":lastName,"accountnumber":accountnumber,"country":country,"phonenumber":phonenumber,"reason":reason,"banktype":banktype,"bank":bank,}},function (err, inwarts) {
        if (err)
         return console.error(err); 
         res.send(inwarts);
    
     })
  }

  module.exports.deletebene = (req, res) => {
    let userid=JSON.parse(JSON.stringify(req.body.email).replace(/"\s+|\s+"/g,'"'))
    // console.log(" jbhbdjhchj",userid);
    
    Addbene.remove({"_id":userid },function (err, inwarts) {
        if (err)
         return console.error(err); 
         res.send(inwarts);
     })
  }

  module.exports.rejectbank = (req, res) => {
    let userid=JSON.parse(JSON.stringify(req.body.id).replace(/"\s+|\s+"/g,'"'))
    
    Addbene.update({"_id":userid },{$set:{"status":"Rejected"}},function (err, inwarts) {
        if (err)
         return console.error(err); 
         res.send(inwarts);
     })
  }
  module.exports.approvebank = (req, res) => {
    let userid=JSON.parse(JSON.stringify(req.body.id).replace(/"\s+|\s+"/g,'"'))
    
    Addbene.update({"_id":userid },{$set:{"status":"Approved"}},function (err, inwarts) {
        if (err)
         return console.error(err); 
         res.send(inwarts);
     })
  }

  module.exports.getaddbenf = (req, res) => {
    let userid=JSON.parse(JSON.stringify(req.body.email).replace(/"\s+|\s+"/g,'"'))
    
    Addbene.find({"userid":userid },function (err, inwarts) {
        if (err)
         return console.error(err); 
         res.send(inwarts);
     })
  }

  