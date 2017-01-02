var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');
var router = express.Router();

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// configure passport
app.use(session({
    secret: 'sessionsecretstring'
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


require('./public/javascript/utils/passport.js')(passport);
// routes
var index = require('./routes/index')(app);
var register = require('./routes/register')(app, passport);
var login = require('./routes/login')(app, passport);
var logout = require('./routes/logout')(app, passport);

// admin routes
var profile = require('./routes/profile')(app, passport, isLoggedIn);
var addNewBook = require('./routes/addNewBook')(app, passport, isLoggedIn);
var getBookList = require('./routes/getBookList')(app, passport, isLoggedIn);
var getBookListForDeletion = require('./routes/getBookListForDeletion')(app, passport, isLoggedIn);
var deleteBook = require('./routes/deleteBook')(app, passport, isLoggedIn);
var getIssueList = require('./routes/getIssueList')(app, passport, isLoggedIn);
var approveIssues = require('./routes/approveIssues')(app, passport, isLoggedIn);
var getReturnListAdmin = require('./routes/getReturnListAdmin')(app, passport, isLoggedIn);
var approveReturns = require('./routes/approveReturns')(app, passport, isLoggedIn);

//user routes
var userProfile = require('./routes/userProfile')(app, passport, isLoggedIn);
var getAvailableBooks = require('./routes/getAvailableBooks')(app, passport, isLoggedIn);
var submitIssueRequest = require('./routes/submitIssueRequest')(app, passport, isLoggedIn);
var getIssueList = require('./routes/getIssueListAdmin')(app, passport, isLoggedIn);
var getBooksToReturn = require('./routes/getBooksToReturn')(app, passport, isLoggedIn);
var submitForReturn = require('./routes/submitForReturn')(app, passport, isLoggedIn);

//app.use('/', index);
//app.use('/register', register);
//app.use('/login', login);
//app.use('/users', users);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

// launch the app
var port = process.env.PORT || 5000
app.listen(port);
console.log("Express server listening on: ", port);

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

module.exports = app;
module.exports = passport;