const mongoose = require('mongoose');
const _ = require('lodash');
const nodemailer = require('nodemailer');



const jwt = require('jsonwebtoken')

//importing & configmulter
const multer=require('multer');


const DIR = '../public/';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, fileName)
  }
});

// Multer Mime Type Validation
// Multer Mime Type Validation
var upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter (req, files, callback) {
    const ext = path.extname(files.originalname);
    const allowed = ['.png', '.jpg', '.jpeg', '.pdf','.zip','.rar'];
    if (allowed.includes(ext)) {
      callback(null, true);
    } else {
      callback(null, false); // handle error in middleware, not here
    }
  },
});


const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

const Requestform = mongoose.model('Requestform');

module.exports.registerRequestform = (req, res) => {
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
   
  const url = req.protocol + '://' + req.get('host')
    
  var reqform =new Requestform();
  reqform.name= req.body.name,
  reqform.email=req.body.email,
  reqform.country= req.body.country,
  reqform.citizenid= req.body.citizenid,
  reqform.phonenumber=req.body.phonenumber,
  reqform.pincode= req.body.pincode,
  reqform.educationalstatus= req.body.educationalstatus,
  reqform.gender= req.body.gender,
  reqform.mobilenumber=req.body.mobilenumber,
  reqform.code= req.body.code,
  reqform.address= req.body.address,
  reqform.state=req.body.state,
  reqform.publicauthority= req.body.publicauthority,
  reqform.ministry= req.body.ministry,
  reqform.publicauthority2=req.body.publicauthority2,
  reqform.citizenship= req.body.citizenship,
  reqform.provertyline= req.body.provertyline,
  reqform.bplcard= req.body.bplcard,
  reqform.yearofissue= req.body.yearofissue,
  reqform.issueingauthority= req.body.issueingauthority,
      reqform.rtirequest= req.body.rtirequest,
  // console.log(req.body);

  //     document= url + '/public/' + req.file.document,

  //     reqform.document=req.body.document,

      reqform.literatestatus= req.body.literatestatus,
      reqform.usertype=req.body.usertype,
      reqform.status=req.body.status,
      reqform.formstatus="Registered",
      reqform.registerid= `CABST/R/${n}/${makeid(5)}`,
      reqform.expdate=req.body.expdate,
      reqform.Role=req.body.Role,
      reqform.piomail=req.body.piomail,
      reqform.applicationstatus="Active",
      reqform.applicationtype=req.body.applicationtype,
      reqform.ccmail= req.body.ccmail,
      reqform.defultstatus="Pending",
      reqform.acceptedbypio=req.body.acceptedbypio,


      reqform.created=today
      
      reqform.save((err, doc) => {
    if (err)
    return console.error(err); 
    res.send(doc);

});

}
//transfer fn
module.exports.transferapplication = (req, res) => {  
  
  let publicauthority2=JSON.parse(JSON.stringify(req.body.publicauthority2).replace(/"\s+|\s+"/g,'"'))
  let registerid=JSON.parse(JSON.stringify(req.body.registerid).replace(/"\s+|\s+"/g,'"'))
  let sts=JSON.parse(JSON.stringify(req.body.ministry).replace(/"\s+|\s+"/g,'"'))
  let trnsby=JSON.parse(JSON.stringify(req.body.piomail).replace(/"\s+|\s+"/g,'"'))
  let ministryold=JSON.parse(JSON.stringify(req.body.ministryold).replace(/"\s+|\s+"/g,'"'))
  let publicauthority2old=JSON.parse(JSON.stringify(req.body.publicauthority2old).replace(/"\s+|\s+"/g,'"'))
  let pioemail=JSON.parse(JSON.stringify(req.body.pioemail).replace(/"\s+|\s+"/g,'"'))


  console.log("jggg",req.body);
  Requestform.updateMany({"registerid":registerid},{$set:{"publicauthority2":publicauthority2,"ministry":sts,"transfer":"transfered","transferedby":trnsby, "defultstatus":"Pending", "ministryOld":ministryold,"publicauthority2Old":publicauthority2old,"piomail":pioemail}},function (err, inwarts) {
      if (err)
       return console.error(err); 
       res.send(inwarts);
  
   })
  }
  module.exports.transdata = (req,res) => {
    
    Requestform.find({
      transferedby: req.body.piomail
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

module.exports.getbytwodates = (req,res) =>{
  
  const startDate =new Date(new Date(req.body.startdate).setUTCHours(0, 0, 0, 0)).toISOString();
  const endDate =new Date(new Date(req.body.enddate).setUTCHours(23, 59, 59, 999)).toISOString();
  let piomail=JSON.parse(JSON.stringify(req.body.piomail).replace(/"\s+|\s+"/g,'"'))


 Requestform.find({
   "piomail":piomail,
  date: { 
    $gte:`${startDate}`, 
    $lt: `${endDate}` 
  }
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

//updte
module.exports.updatereqsts = (req, res) => {  
  
let piomail=JSON.parse(JSON.stringify(req.body.piomail).replace(/"\s+|\s+"/g,'"'))
let registerid=JSON.parse(JSON.stringify(req.body.registerid).replace(/"\s+|\s+"/g,'"'))
let sts=JSON.parse(JSON.stringify(req.body.defultstatus).replace(/"\s+|\s+"/g,'"'))
let appsts=JSON.parse(JSON.stringify(req.body.applicationAt).replace(/"\s+|\s+"/g,'"'))
let payment=JSON.parse(JSON.stringify(req.body.payment).replace(/"\s+|\s+"/g,'"'))




console.log("jggg",req.body);

Requestform.updateMany({"registerid":registerid},{$set:{"acceptedbypio":piomail,"defultstatus":sts,"applicationAt":appsts,"payment":payment,"piomail":piomail,}},function (err, inwarts) {
    if (err)
     return console.error(err); 
     res.send(inwarts);

 })
}


module.exports.updatePioDecision = (req, res) => {  
  
  let piodecision=JSON.parse(JSON.stringify(req.body.piodecision).replace(/"\s+|\s+"/g,'"'))
  let registerid=JSON.parse(JSON.stringify(req.body.registerid).replace(/"\s+|\s+"/g,'"'))
  let payment=JSON.parse(JSON.stringify(req.body.payment).replace(/"\s+|\s+"/g,'"'))

  // let name=JSON.parse(JSON.stringify(req.body.name).replace(/"\s+|\s+"/g,'"'))
  
  
  console.log("jggg",req.body);
  
  Requestform.updateMany({"registerid":registerid},{$set:{"piodecision":piodecision,"defultstatus":"Under review","applicationAt":"At Citizen","payment":payment}},function (err, inwarts) {
      if (err)
       return console.error(err); 
       res.send(inwarts);
  
   })
  }
  
module.exports.updateRequestform = (req, res) => {
    let _id=JSON.parse(JSON.stringify(req.body.id).replace(/"\s+|\s+"/g,'"'))
    let rtirequest=JSON.parse(JSON.stringify(req.body.oneuser.rtirequest).replace(/"\s+|\s+"/g,'"'))
    let email=JSON.parse(JSON.stringify(req.body.oneuser.email).replace(/"\s+|\s+"/g,'"'))
    let name=JSON.parse(JSON.stringify(req.body.oneuser.name).replace(/"\s+|\s+"/g,'"'))


console.log("jggg",req.body);

Requestform.updateMany({"_id":_id},{$set:{"rtirequest":rtirequest,"email":email,"name":name}},function (err, inwarts) {
        if (err)
         return console.error(err); 
         res.send(inwarts);
    
     })
  }

module.exports.getRequestform = (req, res) => {
    Requestform.find(function (err, stus) {
        if (err) return console.error(err);   
        res.send(stus);

    })
}

module.exports.deleteRequestform = (req, res) => {
    let userid=JSON.parse(JSON.stringify(req.body.id).replace(/"\s+|\s+"/g,'"'))
    // console.log(" jbhbdjhchj",userid);
    
    Requestform.remove({"_id":userid },function (err, inwarts) {
        if (err)
         return console.error(err); 
         res.send(inwarts);
     })
  }
  
  module.exports.editRequestform = (req, res) => {
    let userid=JSON.parse(JSON.stringify(req.body.id).replace(/"\s+|\s+"/g,'"'))
    Requestform.find({"_id":userid },function (err, inwarts) {
        if (err)
         return console.error(err); 
         res.send(inwarts);
     })
  }
  module.exports.verifyregistereddata = (req, res)=> {
    let email=JSON.parse(JSON.stringify(req.body.email).replace(/"\s+|\s+"/g,'"'))
    let regid=JSON.parse(JSON.stringify(req.body.registerid).replace(/"\s+|\s+"/g,'"'))

    console.log(req.body);
    
    Requestform.findOne({
      email: email,
      registerid: regid
    })
      //TODO bcrypt
      .then(user => {
        if (!user) {
          res.json({ error: 'File does not exists',status:"false" })
       
        } else {
          const payload = {
            _id: user._id,

            registerid:user.registerid,
            name: user.name,
      email:user.email,
      country: user.country,
      citizenid: user.citizenid,
      phonenumber:user.phonenumber,
      pincode: user.pincode,
      educationalstatus:user.educationalstatus,
      gender:user.gender,
      mobilenumber:user.mobilenumber,
      code: user.code,
      usertype: user.usertype,
      status:user.status,
      address: user.address,
      state:user.state,
      publicauthority: user.publicauthority,
      ministry: user.ministry,
      publicauthority2:user.publicauthority2,
      citizenship: user.citizenship,
      provertyline: user.provertyline,
      bplcard: user.bplcard,
      yearofissue: user.yearofissue,
      issueingauthority: user.issueingauthority,
      rtirequest:user.rtirequest,
      expdate:user.expdate,

      // document: url + '/public/' + req.file.document,

    

      literatestatus: user.literatestatus,

          }
          let token = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: 1440
          })
          res.json({ token: token, data:user,status:"true" })
        }
      })
      .catch(err => {
        res.send('error: ' + err)
      })
  }

  //Role Based Data
  module.exports.Requestformdetails = (req, res) =>{
  
    var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)
  console.log(decoded);

    if (decoded.Role=="Citizen") {
      Requestform.findOne({
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
    else if (decoded.Role=="PIO") {
    //   Requestform.find(function (err, unis) {
    //     if (err) return console.error(err);   
    //     res.send(unis);
    
    // })
    Requestform.find({
      piomail: decoded.email
      
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

       Requestform.find({
        ministry: decoded.departmentname
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
    else if (decoded.Role=="SIC") {
      Requestform.find(function (err, stus) {
        if (err) return console.error(err);   
        res.send(stus);

    })
     
   }
    
  

}


module.exports.updateAppStatus = (req, res) => {
  let date=JSON.parse(JSON.stringify(req.body.date).replace(/"\s+|\s+"/g,'"'))
  Requestform.update({"expdate":date},{$set:{"applicationstatus":"Expired"}},function (err, inwarts) {
      if (err)
       return console.error(err); 
       res.send(inwarts);
  
   })
}
//data based on registerid
module.exports.reqdatabyregisterid = (req, res)=> {
  let regid=JSON.parse(JSON.stringify(req.body.registerid).replace(/"\s+|\s+"/g,'"'))

  console.log(req.body);
  
  Requestform.findOne({
    registerid: regid
  })
    //TODO bcrypt
    .then(user => {
      if (!user) {
        res.json({ error: 'File does not exists',status:"false" })
     
      } else {
        const payload = {
          _id: user._id,

          registerid:user.registerid,
          name: user.name,
    email:user.email,
    country: user.country,
    citizenid: user.citizenid,
    phonenumber:user.phonenumber,
    pincode: user.pincode,
    educationalstatus:user.educationalstatus,
    gender:user.gender,
    mobilenumber:user.mobilenumber,
    code: user.code,
    usertype: user.usertype,
    status:user.status,
    address: user.address,
    state:user.state,
    publicauthority: user.publicauthority,
    ministry: user.ministry,
    publicauthority2:user.publicauthority2,
    citizenship: user.citizenship,
    provertyline: user.provertyline,
    bplcard: user.bplcard,
    yearofissue: user.yearofissue,
    issueingauthority: user.issueingauthority,
    rtirequest:user.rtirequest,
    expdate:user.expdate,

    // document: url + '/public/' + req.file.document,

  

    literatestatus: user.literatestatus,

        }
        let token = jwt.sign(payload, process.env.SECRET_KEY, {
          expiresIn: 1440
        })
        res.json({ token: token, data:user,status:"true" })
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
}
module.exports.getbydeptname = (req, res) =>{
  console.log(req.body);
   
   Requestform.find({
    ministry:req.body.departmentname
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
 // }


}

module.exports.Requestformbypub = (req, res) =>{
  console.log(req.body);
   
   Requestform.find({
     publicauthority2:req.body.name,
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
 // }


}
//testing api
module.exports.Requestformdetail = (req, res) =>{
   console.log(req.body);
    
    Requestform.find({
      publicauthority2:req.body.public.name,
      acceptedbypio:req.body.piomail
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
  // }


}
// for pending request

module.exports.allPendingRequest = (req, res) =>{
  console.log(req.body);
   
   Requestform.find({
     publicauthority2:req.body.public.name,
     defultstatus:req.body.status
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
 // }


}



//testing api
module.exports.testrequest = (req, res) =>{
  
  var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)
console.log(decoded);

  if (decoded.Role=="Citizen") {
    Requestform.findOne({
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
  else if (decoded.Role=="PIO") {
    Requestform.find({
      publicauthority2: decoded.Allpublicauth
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
}
//data by mail
module.exports.reqdatabymail = (req, res)=> {
  let regid=JSON.parse(JSON.stringify(req.body.citizenmail).replace(/"\s+|\s+"/g,'"'))

  console.log(req.body);
  
  Requestform.find({
    email: regid
  })
    //TODO bcrypt
    .then(user => {
      if (!user) {
        res.json({ error: 'File does not exists',status:"false" })
     
      } else {
        const payload = {
          _id: user._id,

          registerid:user.registerid,
          name: user.name,
          email:user.email,
          country: user.country,
          citizenid: user.citizenid,
          phonenumber:user.phonenumber,
          pincode: user.pincode,
          educationalstatus:user.educationalstatus,
          gender:user.gender,
          mobilenumber:user.mobilenumber,
          code: user.code,
          usertype: user.usertype,
          status:user.status,
          address: user.address,
          state:user.state,
          publicauthority: user.publicauthority,
          ministry: user.ministry,
          publicauthority2:user.publicauthority2,
          citizenship: user.citizenship,
          provertyline: user.provertyline,
          bplcard: user.bplcard,
          yearofissue: user.yearofissue,
          issueingauthority: user.issueingauthority,
          rtirequest:user.rtirequest,
          expdate:user.expdate,

    // document: url + '/public/' + req.file.document,

  

    literatestatus: user.literatestatus,

        }
        let token = jwt.sign(payload, process.env.SECRET_KEY, {
          expiresIn: 1440
        })
        res.json({ token: token, data:user,status:"true" })
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
}
//data by mail
module.exports.getccdata = (req, res)=> {
  let regid=JSON.parse(JSON.stringify(req.body.ccmail).replace(/"\s+|\s+"/g,'"'))
  console.log(req.body);
  Requestform.find({
    email: regid
  })
    //TODO bcrypt
    .then(user => {
      if (!user) {
        res.json({ error: 'File does not exists',status:"false" })
     
      } else {
        const payload = {
          _id: user._id,

          registerid:user.registerid,
          name: user.name,
          email:user.email,
          country: user.country,
          citizenid: user.citizenid,
          phonenumber:user.phonenumber,
          pincode: user.pincode,
          educationalstatus:user.educationalstatus,
          gender:user.gender,
          mobilenumber:user.mobilenumber,
          code: user.code,
          usertype: user.usertype,
          status:user.status,
          address: user.address,
          state:user.state,
          publicauthority: user.publicauthority,
          ministry: user.ministry,
          publicauthority2:user.publicauthority2,
          citizenship: user.citizenship,
          provertyline: user.provertyline,
          bplcard: user.bplcard,
          yearofissue: user.yearofissue,
          issueingauthority: user.issueingauthority,
          rtirequest:user.rtirequest,
          expdate:user.expdate,

    // document: url + '/public/' + req.file.document,

  

    literatestatus: user.literatestatus,

        }
        let token = jwt.sign(payload, process.env.SECRET_KEY, {
          expiresIn: 1440
        })
        res.json({ token: token, data:user,status:"true" })
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
}



module.exports.documentuser = (req, res) => {
  console.log("ddddd", req.body.avatar)
  // const userdoc = new Userdoc({
  //     _id: new mongoose.Types.ObjectId(),
  //     email:req.body.email,
  //     name: req.body.name,
  //     avatar: req.file.url
  //   });
    let registerid=JSON.parse(JSON.stringify(req.body.registerid).replace(/"\s+|\s+"/g,'"'))
    // let rtirequest=JSON.parse(JSON.stringify(req.body.oneuser.rtirequest).replace(/"\s+|\s+"/g,'"'))
    let avatar= req.file.url
    Requestform.updateMany({"registerid":registerid},{$set:{"avatar":avatar,"defultstatus":"Closed",}},function (err, inwarts) {
      if (err)
       return console.error(err); 
       res.send(inwarts);
  
   })
}

module.exports.pendingList = (req, res) =>{
  console.log(req.body);
   
   Requestform.find({
     piomail:req.body.piomail,
     defultstatus:req.body.status
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
 // }


}


module.exports.ReviewList = (req, res) =>{
  console.log(req.body);
   
   Requestform.find({
     piomail:req.body.piomail,
     defultstatus:req.body.status
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
 // }


}

module.exports.ClosedList = (req, res) =>{
  console.log(req.body);
   
   Requestform.find({
     piomail:req.body.piomail,
     defultstatus:req.body.status
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
 // }


}


module.exports.departmentnameList = (req, res) =>{
  console.log(req.body);
   
   Requestform.find({
    ministry:req.body.departmentname,
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

module.exports.HodPendingList = (req, res) =>{
  console.log(req.body);
   Requestform.find({
    ministry:req.body.departmentname,
    defultstatus:req.body.status
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
module.exports.HodClosedList = (req, res) =>{
  console.log(req.body);
   Requestform.find({
    ministry:req.body.departmentname,
    defultstatus:req.body.status
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
module.exports.HodReviewList= (req, res) =>{
  console.log(req.body);
   Requestform.find({
    ministry:req.body.departmentname,
    defultstatus:req.body.status
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

module.exports.getAllRequests= (req, res) => {
  Requestform.find(function (err, stus) {
      if (err) return console.error(err);   
      res.send(stus);
  })
}
module.exports.testget= (req,res) => {
  const { page, size, email } = req.query;
  var condition = email
    ? { email: { $regex: new RegExp(email), $options: "i" } }
    : {};

  const { limit, offset } = getPagination(page, size);

  Requestform.paginate(condition, { offset, limit })
  .then((data) => {
    res.send({
      totalItems: data.totalDocs,
      tutorials: data.docs,
      totalPages: data.totalPages,
      currentPage: data.page - 1,
    });
  })
  .catch((err) => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving tutorials.",
    });
  });
}
module.exports.getAllPending= (req, res) =>{
  console.log(req.body);
   Requestform.find({
    defultstatus:"Pending"
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
module.exports.getAllReview= (req, res) =>{
  console.log(req.body);
   Requestform.find({
    defultstatus:"Under review"
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
module.exports.getAllClosed= (req, res) =>{
  console.log(req.body);
   Requestform.find({
    defultstatus:"Closed"
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
module.exports.PioTotalDealed= (req, res) =>{
  console.log(req.body);
   Requestform.find({
    piomail:req.body.piomail,

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