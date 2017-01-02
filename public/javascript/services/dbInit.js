var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/test', function (err) {
    if (!err) {
        console.log('Connenction Establish with Mongodb');
    } else {
        console.log('Mongodb Connection Error', err);
    }
});