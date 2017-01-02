var submitForReturn = require('../public/javascript/services/issueRequestService');

module.exports = function(app, passport, isLoggedIn){
    app.post('/submitForReturn', isLoggedIn, function(req, res){
        //console.log(req.body);
        submitForReturn.submitReturnRequest(req.body, res);
    })
}