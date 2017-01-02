var addBook = require('../public/javascript/services/addNewBookService');


module.exports = function(app, passport, isLoggedIn){
    app.post('/addBook', isLoggedIn, function(req, res){
        console.log(req.body);
        addBook.addNewBook(req.body, res);
    });
}