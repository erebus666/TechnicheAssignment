/*module.exports = function(app, passport){
    app.post('/login', passport.authenticate('local-login'), function(req, res){
        res.redirect('/profile');
    });
}*/

module.exports = function (app, passport) {
    app.post('/login', passport.authenticate('local-login'), function (req, res) {
        console.log(req.user);
        if (req.user['USERNAME'] === 'admin') {
            res.send({
                url: '/profile',
            });
        } else {
            res.send({
                url: '/userProfile',
                user: req.user
            });
        }

    });
}