var approveReturnList = require('../public/javascript/services/issueRequestService');

module.exports = function(app, passport, isLoggedIn){
    app.post('/approveReturns', isLoggedIn, function(req, res){
        //console.log(req.body);
        approveReturnList.approveReturns(req.body, res);
    })
}