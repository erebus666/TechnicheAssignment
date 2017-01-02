var submitIssueRequest = require('../public/javascript/services/issueRequestService');

module.exports = function(app, passport, isLoggedIn){
    app.post('/submitIssueRequest', isLoggedIn, function(req, res){
        //console.log(req.body);
        submitIssueRequest.submitIssue(req.body, res);
    })
}