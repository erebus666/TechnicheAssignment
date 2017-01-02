var mongoose = require('mongoose');

var issueSchema = mongoose.Schema({
    BOOK_LIST: [{type: String}],
    ISSUE_DATE: String,
    DUE_DATE: String,
    USER_NAME: String,
    USER_EMAIL: String,
    USER_CONTACT: String,
    STATUS: String
});

module.exports = mongoose.model('Issues', issueSchema);