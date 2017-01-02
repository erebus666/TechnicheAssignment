module.exports = function(app, passport, isLoggedIn){
     app.get('/profile', isLoggedIn, function(req, res){
        res.render('profile');
    });
}