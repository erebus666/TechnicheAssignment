var db = require('./dbinit.js');
var mongoose = require('mongoose');
var exports = module.exports = {};

/*var userSchema = mongoose.Schema({
    NAME: String,
    USERNAME: String,
    EMAIL: String,
    CONTACT: String,
    PASSWORD: String,
});*/

var User = require('../models/users.js');

exports.addNewUser = function (userData, res) {
    // get the user data in one place
    var newUser = {
        NAME: userData.fName + ' ' + userData.lName,
        USERNAME: userData.username,
        EMAIL: userData.email,
        CONTACT: userData.contactNumber,
        PASSWORD: userData.pass
    }
    console.log(newUser);
    var newUserData = new User(newUser);
    // save the user data to db
    newUserData.save(function (err, data) {
        if (!err) {
            console.log('user add success');
            res.send('user added');
        } else {
            console.log('error adding user');
            res.send(err);
        }
    });
}