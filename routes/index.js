/*var express = require('express');
var router = express.Router();

/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.render('index');
});*/

/*router.route('/')
.all(function(req, res, next){
    res.render('index');
});


module.exports = router;*/
module.exports = function(app){
    app.get('/', function(req, res){
       res.render('index'); 
    });
}
