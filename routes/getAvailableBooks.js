var getBookList = require('../public/javascript/services/getBookListService');

module.exports = function(app, passport, isLoggedIn){
    app.post('/getAvailableBookList', isLoggedIn, function(req, res){
        getBookList.getListOfAvailableBooks(res);
    })
}