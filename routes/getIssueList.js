var getIssiueList = require('../public/javascript/services/issueRequestService');

module.exports = function(app, passport, isLoggedIn){
    app.post('/getIssueList', isLoggedIn, function(req, res){
        console.log(req.body);
        getIssiueList.getIssues(req.body, res);
    })
}