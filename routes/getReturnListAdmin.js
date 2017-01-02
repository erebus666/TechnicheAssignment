var getReturnList = require('../public/javascript/services/issueRequestService');

module.exports = function(app, passport, isLoggedIn){
    app.post('/getReturnListAdmin', isLoggedIn, function(req, res){
        getReturnList.getReturnsAdmin(res);
    });
}