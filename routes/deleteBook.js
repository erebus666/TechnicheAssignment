var deleteBook = require('../public/javascript/services/deleteBookService');


module.exports = function(app, passport, isLoggedIn){
    app.post('/deleteSelectedBooks', isLoggedIn, function(req, res){
        //console.log(req.body);
        deleteBook.deleteSelectedBooks(req.body, res);
    });
}