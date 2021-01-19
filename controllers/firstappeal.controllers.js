
const jwt = require('jsonwebtoken')

process.env.SECRET_KEY = 'secret'

const mongoose = require('mongoose');

const Benificery = mongoose.model('firstappeal');

module.exports.registerAppealform = (req, res) => {
 
  
  function makeid(length) {
    var result           = '';
    var characters       = '0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
    }
    var d = new Date();
    var n = d.getFullYear();
    const today = new Date()
    const appeal = {
      name: req.body.name,
      email: req.body.email,
      country: req.body.country,
      citizenid: req.body.citizenid,
      phonenumber:req.body.phonenumber,
      pincode: req.body.pincode,
      educationalstatus: req.body.educationalstatus,
      gender: req.body.gender,
      mobilenumber: req.body.mobilenumber,
      code: req.body.code,
      address: req.body.address,
      state:req.body.state,
      publicauthority: req.body.publicauthority,
      ministry: req.body.ministry,
      publicauthority2:req.body.publicauthority2,
      citizenship: req.body.citizenship,
      provertyline: req.body.provertyline,
      bplcard: req.body.bplcard,
      yearofissue: req.body.yearofissue,
      issueingauthority: req.body.issueingauthority,
      rtirequest: req.body.rtirequest,
      // document: url + '/public/' + req.file.document,

      document:req.body.document,
      groundforappeal:req.body.groundforappeal,

      literatestatus: req.body.literatestatus,
      usertype:req.body.usertype,
      status:req.body.status,
      formstatus:"Registered",
      registerid: `DOP&T/A/${n}/${makeid(5)}`,
      
      created:today
    }
  console.log(req.body.ministry);
   
    Benificery.findOne({
      email: req.body.email
      })
        //TODO bcrypt
        .then(user => {
          if (!user) {
            Benificery.create(appeal)
              .then(user => {
                const payload = {
                id: user._id,
                name:user.name,
                status:user.status,
                registerid:user.registerid,
                phonenumber:user.phonenumber,
                ministry:user.ministry,
                email:user.email,
                created:today
                }
                let token = jwt.sign(payload, process.env.SECRET_KEY, {
                  expiresIn: 1440
                })
                res.json({ data:payload,status:"true"})
              })
              .catch(err => {
                res.send('error: ' + err)
              })
          } else {
            res.json({ error: 'Email already exists',status:"false"})
          }
        })
        .catch(err => {
          res.send('error: ' + err)
        })


}

module.exports.updateAppealform = (req, res) => {
  let _id=JSON.parse(JSON.stringify(req.body.id).replace(/"\s+|\s+"/g,'"'))
  let rtirequest=JSON.parse(JSON.stringify(req.body.oneuser.rtirequest).replace(/"\s+|\s+"/g,'"'))
  let email=JSON.parse(JSON.stringify(req.body.oneuser.email).replace(/"\s+|\s+"/g,'"'))
  let name=JSON.parse(JSON.stringify(req.body.oneuser.name).replace(/"\s+|\s+"/g,'"'))


console.log("jggg",req.body);

Benificery.updateMany({"_id":_id},{$set:{"rtirequest":rtirequest,"email":email,"name":name}},function (err, inwarts) {
      if (err)
       return console.error(err); 
       res.send(inwarts);
  
   })
}

module.exports.getAppealform = (req, res) => {
  Benificery.find(function (err, stus) {
      if (err) return console.error(err);   
      res.send(stus);

  })
}

module.exports.deleteAppealform = (req, res) => {
  let userid=JSON.parse(JSON.stringify(req.body.id).replace(/"\s+|\s+"/g,'"'))
  // console.log(" jbhbdjhchj",userid);
  
  Benificery.remove({"_id":userid },function (err, inwarts) {
      if (err)
       return console.error(err); 
       res.send(inwarts);
   })
}

module.exports.editAppealform = (req, res) => {
  let userid=JSON.parse(JSON.stringify(req.body.registerid).replace(/"\s+|\s+"/g,'"'))
  Benificery.find({"registerid":userid },function (err, inwarts) {
      if (err)
       return console.error(err); 
       res.send(inwarts);
   })
}
module.exports.verifyAppealform = (req, res) => {
  let userid=JSON.parse(JSON.stringify(req.body.registerid).replace(/"\s+|\s+"/g,'"'))
  let email=JSON.parse(JSON.stringify(req.body.email).replace(/"\s+|\s+"/g,'"'))
 
   
   Benificery.findOne({
    email: req.body.email,
    registerid: req.body.registerid
    })
      //TODO bcrypt
      .then(user => {
        if (!user) {
          res.json({ error: 'File not exists',status:"false"})
        
        } else {
          const payload = {
            id: user._id,
            name:user.name,
            status:user.status,
            registerid:user.registerid,
            phonenumber:user.phonenumber,
            ministry:user.ministry,
            email:user.email,
            }
          let token = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: 1440
          })
          res.json({ data:token,status:"true"})
        }
      })
      .catch(err => {
        res.send('error: ' + err)
      })
}

//Role Based
module.exports.firstformdetails = (req, res) =>{
  
  var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)
console.log(decoded);

  if (decoded.Role=="Citizen") {
    Benificery.findOne({
      _id: decoded._id
    })
      .then(user => {
        if (user) {
          res.json(user)
        } else {
          res.send('User does not exist')
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
  else if (decoded.Role=="HOD") {
    Benificery.find(function (err, unis) {
      if (err) return console.error(err);   
      res.send(unis);
      
  
  })
  }

}