var approveIssiueList = require('../public/javascript/services/issueRequestService');

module.exports = function(app, passport, isLoggedIn){
    app.post('/approveIssues', isLoggedIn, function(req, res){
        console.log(req.body);
        approveIssiueList.approveIssues(req.body, res);
    })
}