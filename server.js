require('./config/config');
require('./models/db');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const rtsIndex = require('./routes/index.router');
const cookieParser = require("cookie-parser");


var app = express();

// middleware
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());
app.use('/api', rtsIndex);



// const uri = "mongodb://localhost:27017/RTI"
// const db = mongoose.createConnection(uri)
// const Schema = mongoose.Schema


// const User = mongoose.model('users');
// const user = new User({ email: 'admin@gmail.com', password: "12345" ,Role:"Admin"})

// db.once('connected', function (err) {
//   if (err) { return console.error(err) }
//   User.create(user, function (err, doc) {
//     if (err) { return console.error(err) }
//     console.log(doc)
//     return db.close()
//   }) 
// })





// error handler
app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors)
    }
});

// start server
app.listen(process.env.PORT, () => console.log(`Server started at port : ${process.env.PORT}`));




// var express = require('express')
// var cors = require('cors')
// var bodyParser = require('body-parser')
// var app = express()
// const mongoose = require('mongoose')
// var port = process.env.PORT || 3000

// app.use(bodyParser.json())
// app.use(cors())
// app.use(
//   bodyParser.urlencoded({
//     extended: false
//   })
// )

// const mongoURI = 'mongodb://localhost:27017/meanloginreg'

// mongoose
//   .connect(
//     mongoURI,
//     { useNewUrlParser: true }
//   )
//   .then(() => console.log('MongoDB Connected'))
//   .catch(err => console.log(err))

// var Users = require('./routes/Users')

// app.use('/users', Users)

// app.listen(port, function() {
//   console.log('Server is running on port: ' + port)
// })
