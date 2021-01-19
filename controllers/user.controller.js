//const express = require('express')
// const users = express.Router()
//const cors = require('cors')
const jwt = require('jsonwebtoken')

// const User = require('../models/User')
// users.use(cors())
const nodemailer = require('nodemailer');

process.env.SECRET_KEY = 'secret'

const mongoose = require('mongoose');

const User = mongoose.model('users');
const expressJwt = require('express-jwt');



// console.log(makeid(16));
module.exports.register = (req, res) => {
  function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
    const today = new Date()
    const userData = {
      user_name: req.body.user_name,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      country: req.body.country,
      phonenumber:req.body.phonenumber,

      pincode: req.body.pincode,
      educationalstatus: req.body.educationalstatus,
      gender: req.body.gender,
      mobilenumber: req.body.mobilenumber,
      code: req.body.code,
      address: req.body.address,
      state:req.body.state,

      literatestatus: req.body.literatestatus,
      status:"NotActivated",
      Activationkey: `${makeid(16)}`,

      
      created: today,
      Role: "Citizen"
    }
  console.log(req.body);
  
    User.findOne({
      email: req.body.email
    })
      //TODO bcrypt
      .then(user => {
        if (!user) {
          User.create(userData)
            .then(user => {
              nodemailer.createTestAccount((err, account) => {
                let transporter = nodemailer.createTransport({
                    host: 'smtp.googlemail.com', // Gmail Host
                    port: 465, // Port
                    secure: true, // this is true as port is 465
                    auth: {
                        user: 'sumankrishna@upsteer.com', //Gmail username
                        pass: 'abc@12345' // Gmail password
                    }
                });
                let mailOptions = {
                    from: '"Admin"',
                    to:req.body.email, 
                    subject:' Your Activation Key',
                    html: `<h3>${user.Activationkey}</h3>
                    `
                };
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        return console.log(error);
                    }
                });
            });
              const payload = {
                _id: user._id,
                user_name: user.user_name,
                email: user.email,
                Role: user.Role,

              }
              let token = jwt.sign(payload, process.env.SECRET_KEY, {
                expiresIn: 1440
              })
              res.json({ token: token })
            })
            .catch(err => {
              res.send('error: ' + err)
            })
        } else {
          res.json({ error: 'User already exists' })
        }
      })
      .catch(err => {
        res.send('error: ' + err)
      })
}

//HOD/NODAL creation
module.exports.hodnodalcre =(req,res) =>{
  function makeid(length) {
    var result           = '';
    var characters       = '0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  const today = new Date()
  const userData = {
    user_name: req.body.user_name,
    email: req.body.email,
    password: `${req.body.Role}${makeid(3)}`,
    gender: req.body.gender,
    mobilenumber: req.body.mobilenumber,
    created: today,
    Role: req.body.Role,
    departmentname: req.body.departmentname
  }
// console.log(req.body);

  User.findOne({
    email: req.body.email
  })
    //TODO bcrypt
    .then(user => {
      if (!user) {
        User.create(userData)
          .then(user => {
            nodemailer.createTestAccount((err, account) => {
              let transporter = nodemailer.createTransport({
                  host: 'smtp.googlemail.com', // Gmail Host
                  port: 465, // Port
                  secure: true, // this is true as port is 465
                  auth: {
                      user: 'sumankrishna@upsteer.com', //Gmail username
                      pass: 'abc@12345' // Gmail password
                  }
              });
              let mailOptions = {
                  from: '"Admin"',
                  to:req.body.email, 
                  subject:' Your Password Key ',
                  html: `<h3>${user.password}</h3>
                  `
              };
              transporter.sendMail(mailOptions, (error, info) => {
                  if (error) {
                      return console.log(error);
                  }
              });
          });
            const payload = {
              _id: user._id,
              user_name: user.user_name,
              email: user.email,
              Role: user.Role,

            }
            let token = jwt.sign(payload, process.env.SECRET_KEY, {
              expiresIn: 1440
            })
            res.json({ token: token ,email:user.email})
          })
          .catch(err => {
            res.send('error: ' + err)
          })
      } else {
        res.json({ error: 'User already exists' })
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
}
//department get
module.exports.getdepartment =(req,res) =>{
  console.log("details",req.body);
  
      User.find({
          departmentname: req.body.departmentname,
        })
          .then(user => {
            if (user) {
              const payload = {

                _id: user._id,
                user_name: user.user_name,
                email: user.email,
                Role: user.Role,
                departmentname: user.departmentname,
                mobilenumber: user.mobilenumber
  
              }
              // let token = jwt.sign(payload, process.env.SECRET_KEY, {
              //   expiresIn: '5d'
              // })
              res.json({status:"true",Role:user.Role,data:user })
            } else {
              res.json({ error: 'User does not exist',status:"false" })
            }
          })
          .catch(err => {
            res.send('error: ' + err)
          }) 
  }
  //logout
  module.exports.signout = (req, res) => {
    console.log("logout");
    
    res.clearCookie('token');
    res.json({
        message: 'Signout success'
    });
};

exports.requireSignin = expressJwt({
    secret:process.env.SECRET_KEY,
    algorithms: ["HS256"]
    
});
//userlogin
module.exports.userlogin =(req,res) =>{
console.log("details",req.body);

    User.findOne({
        email: req.body.email,
        password: req.body.password
      })
        .then(user => {
          if (user) {
            const payload = {
              _id: user._id,
              first_name: user.first_name,
              email: user.email,
              Role: user.Role,
              Allpublicauth:user.Allpublicauth,
              status: user.status,
              departmentname:user.departmentname

            }
            let token = jwt.sign(payload, process.env.SECRET_KEY, {
              expiresIn: '1h'
            })
            res.cookie('token', token, { expiresIn: '1h' });
            const { _id, first_name, email } = user;
            return res.json({
                token: token,
                status:"true",userstatus:user.status,Role:user.Role,departmentname:user.departmentname,
                user: { _id}
            });
            // res.json({ token: token,status:"true",userstatus:user.status,Role:user.Role })
          //   return res.json({
          //     token,
          //     user: { _id, first_name,email, Role }
          // });
          } else {
            res.json({ error: 'User does not exist',status:"false" })
          }
        })
        .catch(err => {
          res.send('error: ' + err)
        }) 
}

module.exports.userprofile = (req, res) =>{
  
    var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)
    console.log("decode test",decoded);
    
    
    User.findOne({
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


module.exports.getusers = (req, res) => {
  User.find(function (err, unis) {
        if (err) return console.error(err);   
        res.send(unis);
        
    
    })
}


module.exports.deleteuser = (req, res) => {
  let userid=JSON.parse(JSON.stringify(req.body.email).replace(/"\s+|\s+"/g,'"'))
  User.remove({"_id":userid },function (err, inwarts) {
      if (err)
       return console.error(err); 
       res.send(inwarts);
   })
}

module.exports.edituser = (req, res) => {
  let userid=JSON.parse(JSON.stringify(req.body.email).replace(/"\s+|\s+"/g,'"'))
  User.find({"_id":userid },function (err, inwarts) {
      if (err)
       return console.error(err); 
       res.send(inwarts);
   })
}
module.exports.updateprofile = (req,res) => {

  let useremail=JSON.parse(JSON.stringify(req.body.email).replace(/"\s+|\s+"/g,'"'))
  let userpass=JSON.parse(JSON.stringify(req.body.newpassword).replace(/"\s+|\s+"/g,'"'))
  
  User.findOne({
    email: req.body.email,
    password: req.body.password
  })
    .then(user => {
      if (user) {
        User.updateMany({"email":useremail },{$set:{"email":useremail,"password":userpass}},function (err, inwarts) {
          if (err)
           return console.error(err); 
          //  res.send(inwarts);
          return res.json({
            status:"true"
        });
       })

      } else {
        res.json({ error: 'User does not exist',status:"false" })
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    }) 
}
module.exports.updateuser = (req, res) => {
  let useremailuserid=JSON.parse(JSON.stringify(req.body.id).replace(/"\s+|\s+"/g,'"'))
  let userfname=JSON.parse(JSON.stringify(req.body.oneuser.first_name).replace(/"\s+|\s+"/g,'"'))
  let userlnmae=JSON.parse(JSON.stringify(req.body.oneuser.last_name).replace(/"\s+|\s+"/g,'"'))
  let useremail=JSON.parse(JSON.stringify(req.body.oneuser.email).replace(/"\s+|\s+"/g,'"'))
  let usercoun=JSON.parse(JSON.stringify(req.body.oneuser.country).replace(/"\s+|\s+"/g,'"'))
  let userpass=JSON.parse(JSON.stringify(req.body.oneuser.password).replace(/"\s+|\s+"/g,'"'))


  console.log("haiiiiiiiiiii",userid)
  User.updateMany({"email":useremail },{$set:{"first_name":userfname,"last_name":userlnmae,"email":useremail,"country":usercoun,"password":userpass}},function (err, inwarts) {
      if (err)
       return console.error(err); 
       res.send(inwarts);
   })
 
}
module.exports.activateuser = (req, res) => {
  let userid=JSON.parse(JSON.stringify(req.body.id).replace(/"\s+|\s+"/g,'"'))
  let Activation=JSON.parse(JSON.stringify(req.body.key).replace(/"\s+|\s+"/g,'"'))

  User.findOne({
    _id: userid,
    Activationkey:Activation
  })
    .then(user => {
      if (user) {
        const payload = {
          _id: user._id,
          name: user.name,
          email: user.email
        }
        User.update({"_id":userid },{$set:{"status":"Activated"}},function (err, inwarts) {
          if (err)
           return console.error(err); 
           let token = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: 1440
          })
        res.json({ token: token,status:"true",userstatus:user.status })

          //  res.send(inwarts);
       })
       
      } else {
        res.json({ error: 'User does not exist',status:"false" })
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
  console.log("haiiiiiiiiiii",userid)
 
 
}
module.exports.message = (req, res) => {
  let userid=JSON.parse(JSON.stringify(req.body.email).replace(/"\s+|\s+"/g,'"'))
  let userfname=JSON.parse(JSON.stringify(req.body.message).replace(/"\s+|\s+"/g,'"'))



  nodemailer.createTestAccount((err, account) => {
    let transporter = nodemailer.createTransport({
        host: 'smtp.googlemail.com', // Gmail Host
        port: 465, // Port
        secure: true, // this is true as port is 465
        auth: {
            user: '', //Gmail username
            pass: '' // Gmail password
        }
    });
    let mailOptions = {
        from: '"Admin"',
        to:req.body.email, 
        subject:'Admin Message',
        html: `<h3>${req.body.message}</h3>
        `
        
    };
  
 
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
    });
});

  console.log("haiiiiiiiiiii",userid)
  User.update({"email":userid },{$set:{"message":userfname}},function (err, inwarts) {
      if (err)
       return console.error(err); 
       res.send(inwarts);
   })
 
}
//public bawers
module.exports.sicregister =(req,res) =>{
 
  const today = new Date()
  const userData = {
    user_name: req.body.user_name,
    email: req.body.email,
    password: "12345",
    gender: req.body.gender,
    mobilenumber: req.body.mobilenumber,
    created: today,
    Role: req.body.Role,
  }
// console.log(req.body);

  User.findOne({
    email: req.body.email
  })
    //TODO bcrypt
    .then(user => {
      if (!user) {
        User.create(userData)
          .then(user => {
            
            const payload = {
              _id: user._id,
              user_name: user.user_name,
              email: user.email,
              Role: user.Role,

            }
            let token = jwt.sign(payload, process.env.SECRET_KEY, {
              expiresIn: 1440
            })
            res.json({ token: token ,email:user.email})
          })
          .catch(err => {
            res.send('error: ' + err)
          })
      } else {
        res.json({ error: 'User already exists' })
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
}
//middlewares
module.exports.nodalregister = (req, res) => {
  console.log("sdfdffggfggh",req.body);
  
    const today = new Date()
    var dept=new User()

      dept.user_name= req.body.form.user_name,
      dept.email= req.body.form.email,
      dept.password= "12345",
      dept.country= req.body.form.country,
      dept.phonenumber= req.body.form.phonenumber,
      dept.departmentname= req.body.form.department

      dept.pincode= req.body.form.pincode,
      dept.gender= req.body.form.gender,
      dept.mobilenumber= req.body.form.mobilenumber,
      dept.address= req.body.form.address,
      dept.state= req.body.form.state,

      
      dept.created= today,
      dept.Role= "PIO"

      var test=req.body.Allpublicauth
      dept.Allpublicauth=test,

  
    User.findOne({
      email: req.body.form.email
      // Allpublicauth:test
    })
      //TODO bcrypt
      .then(user => {
        if (!user) {
          User.create(dept)
            .then(user => {
              nodemailer.createTestAccount((err, account) => {
                let transporter = nodemailer.createTransport({
                    host: 'smtp.googlemail.com', // Gmail Host
                    port: 465, // Port
                    secure: true, // this is true as port is 465
                    auth: {
                        user: 'sumankrishna@upsteer.com', //Gmail username
                        pass: 'abc@12345' // Gmail password
                    }
                });
                let mailOptions = {
                    from: '"Admin"',
                    to:req.body.form.email, 
                    subject:' Your Activation Key',
                    html: `<h3>${user.Activationkey}</h3>
                    `
                };
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        return console.log(error);
                    }
                });
            });
              const payload = {
                _id: user._id,
                user_name: user.user_name,
                email: user.email,
                Role: user.Role,

              }
              let token = jwt.sign(payload, process.env.SECRET_KEY, {
                expiresIn: 1440
              })
              res.json({ token: token })
            })
            .catch(err => {
              res.send('error: ' + err)
            })
        } else {
          res.json({ error: 'User already exists' })
        }
      })
      .catch(err => {
        res.send('error: ' + err)
      })
}
module.exports.publicpio =(req,res) =>{

  User.findOne({
    Allpublicauth:{ $elemMatch: {name:req.body.publicauthority}}
    })
      .then(user => {
        if (user) {
          const payload = {
            _id: user._id,
            password: user.password,
            email: user.email,
            Role: user.Role,

          }
          let token = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: 1500
          })
          res.json({ email:user.email,status:"true",data:user})
        } else {
          res.json({ error: 'User does not exist',status:"false" })
        }
      })
      .catch(err => {
        res.send('error: ' + err)
      })
}

//HOD/NODAL creation
module.exports.callCenterCreation =(req,res) =>{
 
  const today = new Date()
  const userData = {
    user_name: req.body.user_name,
    email: req.body.email,
    password: "12345",
    gender: req.body.gender,
    mobilenumber: req.body.mobilenumber,
    created: today,
    Role: "callcenter",
  }
// console.log(req.body);

  User.findOne({
    email: req.body.email
  })
    //TODO bcrypt
    .then(user => {
      if (!user) {
        User.create(userData)
          .then(user => {
            
            const payload = {
              _id: user._id,
              user_name: user.user_name,
              email: user.email,
              Role: user.Role,

            }
            let token = jwt.sign(payload, process.env.SECRET_KEY, {
              expiresIn: 1440
            })
            res.json({ token: token ,email:user.email})
          })
          .catch(err => {
            res.send('error: ' + err)
          })
      } else {
        res.json({ error: 'User already exists' })
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
}

//////////////////////////////Adminmiddlewares//////////////////////////////////////////
module.exports.authMiddleware = (req, res, next) => {
  const authUserId = req.user._id;
  User.findById({ _id: authUserId }).exec((err, user) => {
      if (err || !user) {
          return res.status(400).json({
              error: 'User not found'
          });
      }
      req.profile = user;
      next();
  });
};

exports.adminMiddleware = (req, res, next) => {  
  // console.log("!!!!!!!!!!!###########",req.user);
  var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)
  console.log("!!!!!!!!!!!###########",decoded);

  const adminUserId = decoded._id;
  
  
  User.findById({ _id: adminUserId }).exec((err, user) => {
    console.log("fghgghgg",user.Role);
    
      if (err || !user) {
          return res.status(400).json({
              error: 'User not found'
          });
      }

      if (user.Role !=='Admin') {
          return res.status(400).json({
              error: 'Admin resource. Access denied'
          });
      }

      req.profile = user;
      next();
  });
};
module.exports.testnodalreg = (req, res) => {
  console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$",req.body);
  
    const today = new Date()
    var dept=new User()

      dept.email= req.body.email,
      dept.password= "12345", 
      dept.created= today,
      dept.Role= "PIO"

    User.findOne({
      email: req.body.email
    })
      //TODO bcrypt
      .then(user => {
        if (!user) {
          User.create(dept)
            .then(user => {

              const payload = {
                _id: user._id,
                user_name: user.user_name,
                email: user.email,
                Role: user.Role,

              }
              let token = jwt.sign(payload, process.env.SECRET_KEY, {
                expiresIn: 1440
              })
              res.json({ token: token })
            })
            .catch(err => {
              res.send('error: ' + err)
            })
        } else {
          res.json({ error: 'User already exists' })
        }
      })
      .catch(err => {
        res.send('error: ' + err)
      })
}

module.exports.pioget =(req,res) =>{

  User.find({
    Allpublicauth:{ $elemMatch: {name:req.body.publicauthority}}
    })
      .then(user => {
        if (user) {
          const payload = {
            _id: user._id,
            password: user.password,
            email: user.email,
            Role: user.Role,

          }
          let token = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: 1500
          })
          res.json({ email:user.email,status:"true",})
        } else {
          res.json({ error: 'User does not exist',status:"false" })
        }
      })
      .catch(err => {
        res.send('error: ' + err)
      })
}

module.exports.getAllHOD= (req, res) =>{
  console.log(req.body);
  User.find({
    Role:"HOD"
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
module.exports.getAllPIO= (req, res) =>{
  console.log(req.body);
  User.find({
    Role:"PIO"
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