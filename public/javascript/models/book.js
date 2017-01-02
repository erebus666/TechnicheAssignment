var mongoose = require('mongoose');

var bookSchema = mongoose.Schema({
    NAME: String,
    AUTHOR: String,
    DATE_ADDED: String,
    STATUS: String
});

module.exports = mongoose.model('Books', bookSchema);