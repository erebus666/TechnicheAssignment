var getIssiueList = require('../public/javascript/services/issueRequestService');

module.exports = function(app, passport, isLoggedIn){
    app.post('/getIssueListAdmin', isLoggedIn, function(req, res){
        getIssiueList.getIssuesAdmin(res);
    })
}