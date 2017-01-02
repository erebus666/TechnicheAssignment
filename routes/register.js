var addUser = require('../public/javascript/services/addUser')
/*var express = require('express');
var router = express.Router();

// register new user
router.post('/', function (req, res) {
    console.log(req.body);
    addUser.addNewUser(req.body, res);
    //res.send('success');
});

module.exports = router;*/

module.exports = function(app, passport){
    app.post('/register', function(req, res){
        console.log(req.body);
        addUser.addNewUser(req.body, res);
    });
}