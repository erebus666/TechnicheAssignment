module.exports = function(app, passport, isLoggedIn){
     app.get('/userProfile', isLoggedIn, function(req, res){
        res.render('userProfile');
    });
}