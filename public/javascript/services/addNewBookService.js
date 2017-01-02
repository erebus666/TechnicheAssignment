var db = require('./dbinit.js');
var mongoose = require('mongoose');
var exports = module.exports = {};

var Book = require('../models/book.js');

exports.addNewBook = function(bookData, res){
    var newBook = {
        NAME: bookData.name,
        AUTHOR: bookData.author,
        DATE_ADDED: (new Date()).toISOString(),
        STATUS: 'Available'
    };
    
    console.log(newBook);
    var newBookData = new Book(newBook);
    // save the book data to db
    newBookData.save(function (err, data) {
        if (!err) {
            console.log('book add success');
            res.send('book added');
        } else {
            console.log('error adding book');
            res.send(err);
        }
    });
}