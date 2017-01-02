var getBookList = require('../public/javascript/services/getBookListService');

module.exports = function(app, passport, isLoggedIn){
    app.post('/getBookListForDeletion', isLoggedIn, function(req, res){
        getBookList.getListOfBooksForDeletion(res);
    })
}