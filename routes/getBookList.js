var getBookList = require('../public/javascript/services/getBookListService');

module.exports = function(app, passport, isLoggedIn){
    app.post('/getBookList', isLoggedIn, function(req, res){
        getBookList.getListOfBooks(res);
    })
}