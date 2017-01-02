var db = require('./dbinit.js');
var mongoose = require('mongoose');
var exports = module.exports = {};

var Book = require('../models/book.js');

exports.deleteSelectedBooks = function(selectedBooks, res){
    var selectedBookList = selectedBooks;
    
    console.log(selectedBookList);
    
    // delete the books from db    
    Book.remove({NAME: {$in: selectedBookList}} ,function (err, data) {
        if (!err) {
            console.log('book delete success');
            res.send('book deleted');
        } else {
            console.log('error deleting book');
            res.send(err);
        }
    });
}