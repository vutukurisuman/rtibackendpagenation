const mongoose = require('mongoose');
const Head = mongoose.model('Head');

const jwt = require('jsonwebtoken')
process.env.SECRET_KEY = 'secret'

module.exports.headregister = (req, res, next) => {
    var head = new Head();
    head.email = req.body.email;
    head.password = req.body.password;
    head.Role ="Admin"
    head.save((err, doc) => {
        if (!err){
          let token = jwt.sign(doc, process.env.SECRET_KEY, {
            expiresIn: 50
          })
          res.json({ token: token })
            // res.send(doc);
        }
        else {
            if (err.code == 11000)
                res.status(422).send(['Duplicate email adrress found.']);
            else
                return next(err);
        }
    });
}


module.exports.headtest = (req, res, next) => {
    var head = new Head();
    head.test = req.body.test;
    head.save((err, doc) => {
        if (!err){
          let token = jwt.sign(doc, process.env.SECRET_KEY, {
            expiresIn: 50
          })
          res.json({ token: token })
            // res.send(doc);
        }
        else {
            if (err.code == 11000)
                res.status(422).send(['Duplicate email adrress found.']);
            else
                return next(err);
        }
    });
}
module.exports.adminlogin =(req,res) =>{
    Head.findOne({
        email: req.body.email,
        password: req.body.password
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
            res.json({ token: token,status:"true" })
          } else {
            res.json({ error: 'User does not exist',status:"false" })
          }
        })
        .catch(err => {
          res.send('error: ' + err)
        })
}


module.exports.getheaddata = (req, res) => {
    Head.find(function (err, stus) {
        if (err) return console.error(err);   
        res.send(stus);

    })
}