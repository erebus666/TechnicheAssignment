var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    NAME: String,
    USERNAME: String,
    EMAIL: String,
    CONTACT: String,
    PASSWORD: String,
});

module.exports = mongoose.model('Users', userSchema);