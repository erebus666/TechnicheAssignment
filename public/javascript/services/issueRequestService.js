var db = require('./dbinit.js');
var mongoose = require('mongoose');
var exports = module.exports = {};

var Book = require('../models/book.js');
var Issue = require('../models/issues.js');

exports.submitIssue = function (issueData, res) {
    console.log(issueData.booklist);
    var issueDate = new Date();
    var dueDate = new Date((issueDate.getTime() + parseInt(15 * 24 * 60 * 60 * 1000)));

    // set the status of books to 'Not availabe'
    Book.find({
        NAME: {
            $in: issueData.booklist
        }
    }).exec(function (err, books) {
        for (var i = 0; i < books.length; i++) {
            console.log(books[i].STATUS);
            books[i].STATUS = 'Not Available';
            books[i].save();
        }
        /*book.STATUS = 'Not Available';
        book.save();*/
        //console.log(books);
    });

    var newIssue = {
        BOOK_LIST: issueData.booklist,
        ISSUE_DATE: issueDate.toISOString(),
        DUE_DATE: dueDate.toISOString(),
        USER_NAME: issueData.userDetails.USERNAME,
        USER_EMAIL: issueData.userDetails.EMAIL,
        USER_CONTACT: issueData.userDetails.CONTACT,
        STATUS: 'Pending'
    };

    console.log(newIssue);
    var newIssueData = new Issue(newIssue);
    // save the book data to db
    newIssueData.save(function (err, data) {
        if (!err) {
            console.log('issue add success');
            res.send('issue added');
        } else {
            console.log(err);
            res.send(err);
        }
    });
};

exports.getIssues = function (userData, res) {
    /* Book.find({}, function(err, books){
         for (var i = 0; i < books.length; i++) {
             books[i].STATUS = 'Available';
             books[i].save();
         }
     });*/
    Issue.find({
        USER_NAME: userData.userDetails.USERNAME
    }, function (err, data) {
        if (!err) {
            console.log(data);
            res.send(data);
        }
    });
};

exports.getIssuesAdmin = function (res) {
    Issue.find({
        STATUS: 'Pending'
    }, function (err, data) {
        if (!err) {
            console.log(data);
            res.send(data);
        }
    });
};

exports.approveIssues = function (approveIssueList, res) {
    Issue.find({
        $and: [{
            USER_NAME: {
                $in: approveIssueList.nameList
            }
        }, {
            ISSUE_DATE: {
                $in: approveIssueList.dateList
            }
        }]
    }, function (err, issueList) {
        if (!err) {
            console.log(issueList);
            for (var i = 0; i < issueList.length; i++) {
                issueList[i].STATUS = 'Approved';
                issueList[i].save();
            }
            res.send('Issue Request approve successfull');
        }
    });
};

exports.getReturnBookList = function (userData, res) {
    Issue.find({
        $and: [{
            USER_NAME: userData.userDetails.USERNAME
        }, {
            STATUS: 'Approved'
        }]
    }, function (err, data) {
        if (!err) {
            console.log(data);
            res.send(data);
        }
    });
};

exports.submitReturnRequest = function (issueList, res) {
    console.log(issueList);
    Issue.find({
        $and: [{
            USER_NAME: issueList.userDetails.USERNAME
        }, {
            ISSUE_DATE: {
                $in: issueList.returnlist
            }
        }]
    }, function (err, issueList) {
        if (!err) {
            //console.log(issues);
            /*var bookList = [];
            for(var i = 0; i < issues.length; i++){
                console.log((issues[i].BOOK_LIST).length);
                for(var j=0; j < (issues[i].BOOK_LIST).length; j++){
                    bookList.push((issues[i].BOOK_LIST)[j]);
                }
            }
            console.log(bookList);*/
            for (var i = 0; i < issueList.length; i++) {
                issueList[i].STATUS = 'To Return';
                issueList[i].save();
            }
            res.send('Request for return successful');
        }
    });
};

exports.getReturnsAdmin = function (res) {
    Issue.find({
        STATUS: 'To Return'
    }, function (err, data) {
        if (!err) {
            console.log(data);
            res.send(data);
        }
    });
};

exports.approveReturns = function (returnList, res) {
    console.log(returnList);
    Issue.find({
        ISSUE_DATE: {
            $in: returnList
        }
    }, function (err, issues) {
        if (!err) {
            var bookList = [];
            for (var i = 0; i < issues.length; i++) {
                issues[i].STATUS = 'Returned';
                issues[i].save();
                for (var j = 0; j < (issues[i].BOOK_LIST).length; j++) {
                    bookList.push((issues[i].BOOK_LIST)[j]);
                }
            }
            console.log(bookList);
            Book.find({
                NAME: {
                    $in: bookList
                }
            }).exec(function (err, books) {
                for (var i = 0; i < books.length; i++) {
                    console.log(books[i].STATUS);
                    books[i].STATUS = 'Available';
                    books[i].save();
                }
            });
        }
    });
    res.send('return approved');
};