var getBooksToReturn = require('../public/javascript/services/issueRequestService');

module.exports = function(app, passport, isLoggedIn){
    app.post('/getBooksToReturn', isLoggedIn, function(req, res){
        console.log(req.body);
        getBooksToReturn.getReturnBookList(req.body, res);
    })
}