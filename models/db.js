const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const dbConfig = require("../config/config.json");


mongoose.connect(process.env.MONGODB_URI, (err) => {
    if (!err) { console.log('MongoDB connection succeeded.'); }
    else { console.log('Error in MongoDB connection : ' + JSON.stringify(err, undefined, 2)); }
});



require('./User');
require('./admin');
require('./firstappeal');
require('./requestform')(mongoose, mongoosePaginate);
require('./logout');
require('./head');
require('./departments');









