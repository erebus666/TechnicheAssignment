var db = require('./dbinit.js');
var mongoose = require('mongoose');
var exports = module.exports = {};

var Book = require('../models/book.js');

// admin
exports.getListOfBooks = function(res){
    Book.find({}, function(err, data){
        res.send(data);
    })
}

exports.getListOfBooksForDeletion = function(res){
    Book.find({'STATUS': 'Available'}, function(err, data){
        console.log(data);
        res.send(data);
    })
}
//admin


// user
exports.getListOfAvailableBooks = function(res){
    Book.find({'STATUS': 'Available'}, function(err, data){
        console.log(data);
        res.send(data);
    })
}
//user